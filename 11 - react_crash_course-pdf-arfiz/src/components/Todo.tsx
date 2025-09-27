import { useState } from "react"

function Todo() {
    const [todos, setTodos] = useState([

        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build an app', completed: false },
        { id: 3, text: 'Build an appj', completed: false }
    ])
    const toggleTodo = (id: number) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        )
    }
    const deleteTodo = (id: number) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
    }
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    <span
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }}
                    >
                        {todo.text}
                    </span>
                    {/* Method 1: Arrow function in JSX */}
                    <button onClick={() => toggleTodo(todo.id)}>
                        {todo.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default Todo;