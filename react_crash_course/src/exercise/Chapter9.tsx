import React, { useState, useEffect } from 'react';

const Chapter9: React.FC = () => {
    const [content, setContent] = useState<string>('');
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [saving, setSaving] = useState<boolean>(false);

    // Auto-save logic
    useEffect(() => {
        // Don't auto-save empty content
        if (!content.trim()) return;

        setSaving(true);

        // Set timeout to save after 2 seconds of no typing
        const saveTimeout = setTimeout(async () => {
            try {
                // Simulate API call
                console.log('Auto-saving content:', content);
                
                // Simulate save delay
                await new Promise(resolve => setTimeout(resolve, 500));
                
                setLastSaved(new Date());
                setSaving(false);
                console.log('Content saved successfully!');
            } catch (error) {
                console.error('Save failed:', error);
                setSaving(false);
            }
        }, 2000);

        // Cleanup function - clear timeout when content changes
        return () => {
            clearTimeout(saveTimeout);
            setSaving(false);
        };
    }, [content]); // Run effect when content changes

    return (
        <div >
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start typing to see auto-save in action..."
                rows={10}
                cols={50}
            />
            <div>
                {saving && <span>Saving...</span>}
                {lastSaved && !saving && (
                    <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
                )}
            </div>
        </div>
    );
};

export default Chapter9;