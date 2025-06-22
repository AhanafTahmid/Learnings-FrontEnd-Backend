import { useCallback } from 'react'
function CallBack({ items }: { items: string[] }) {
    // Memoized function - only recreated if dependencies change
    const createClickHandler = useCallback((item: string) => {
        return () => console.log(item)
    }, [])
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    <button onClick={createClickHandler(item)}>
                        {item}
                    </button>
                </li>
            ))}
        </ul>
    )
}
export default CallBack