import { useState } from "react"

interface CounterAction {
    type: 'increment' | 'decrement' | 'reset'
    timestamp: Date
    previousValue: number
    newValue: number
}

function EnhancedCounter() {
    const [count, setCount] = useState(0)
    const [history, setHistory] = useState<CounterAction[]>([])

    const addToHistory = (type: CounterAction['type'], previousValue: number, newValue: number) => {
        const action: CounterAction = {
            type,
            timestamp: new Date(),
            previousValue,
            newValue
        }
        setHistory(prev => [...prev, action])
    }

    const handleIncrement = () => {
        const newValue = count + 1
        addToHistory('increment', count, newValue)
        setCount(newValue)
    }

    const handleDecrement = () => {
        const newValue = count - 1
        addToHistory('decrement', count, newValue)
        setCount(newValue)
    }

    const handleReset = () => {
        addToHistory('reset', count, 0)
        setCount(0)
    }

    const handleUndo = () => {
        if (history.length > 0) {
            const lastAction = history[history.length - 1]
            setCount(lastAction.previousValue)
            setHistory(prev => prev.slice(0, -1))
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowUp':
            case '+':
                event.preventDefault()
                handleIncrement()
                break
            case 'ArrowDown':
            case '-':
                event.preventDefault()
                handleDecrement()
                break
            case 'r':
            case 'R':
                event.preventDefault()
                handleReset()
                break
            case 'z':
                if (event.metaKey || event.ctrlKey) { // Cmd+Z or Ctrl+Z
                    event.preventDefault()
                    handleUndo()
                }
                break
        }
    }

    return (
        <div onKeyDown={handleKeyDown} tabIndex={0} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            padding: '20px',
            outline: 'none'
        }}>
            <button onClick={handleIncrement} style={{ padding: '10px 15px' }}>+</button>
            <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                minWidth: '50px', 
                textAlign: 'center' 
            }}>
                {count}
            </div>
            <button onClick={handleDecrement} style={{ padding: '10px 15px' }}>-</button>
            <button onClick={handleReset} style={{ padding: '10px 15px', marginLeft: '10px' }}>Reset</button>
            <button 
                onClick={handleUndo} 
                disabled={history.length === 0}
                style={{ 
                    padding: '10px 15px', 
                    opacity: history.length === 0 ? 0.5 : 1 
                }}
            >
                Undo
            </button>
            <div style={{ marginLeft: '20px', fontSize: '12px', color: '#666' }}>
                Actions: {history.length} | Use ↑/+, ↓/-, R, Cmd+Z
            </div>
        </div>
    )
}

export default EnhancedCounter;