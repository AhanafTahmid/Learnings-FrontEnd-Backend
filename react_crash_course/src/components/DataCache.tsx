import { useEffect } from "react";

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}
class DataCache {
    private cache = new Map<string, CacheEntry<any>>();
    private readonly TTL = 5 * 60 * 1000; // 5 minutes
    get<T>(key: string): T | null {
        const entry = this.cache.get(key);
        if (!entry) return null;
        if (Date.now() - entry.timestamp > this.TTL) {
            this.cache.delete(key);
            return null;
        }
        return entry.data;
    }
    set<T>(key: string, data: T): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }
}
const cache = new DataCache();
function useApiWithCache<T>(url: string): UseApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const fetchData = async () => {
        try {

            setLoading(true);
            setError(null);
            // Check cache first
            const cachedData = cache.get<T>(url);
            if (cachedData) {
                setData(cachedData);
                setLoading(false);
                return;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result: T = await response.json();
            // Cache the result
            cache.set(url, result);
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [url]);
    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
}