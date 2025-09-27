import React from 'react'
//Exercise: Todo List with Filtering

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
}

const Chapter8 = () => {
    const [todos, setTodos] = React.useState<Todo[]>([
        { id: 1, text: 'Learn React', completed: false, createdAt: new Date(),
        },
        { id: 2, text: 'Build a Todo App', completed: false, createdAt: new Date() },
        { id: 3, text: 'Deploy the App', completed: false, createdAt: new Date() },
    ]);
    const [filter, setFilter] = React.useState<'all' | 'completed' | 'incomplete'>('all');

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date()
        };
        setTodos([...todos, newTodo]);
    };

  return (
    <div>
        {
            todos.map((todo) => (
                <div key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.text} - {todo.createdAt.toLocaleString()}
                    <button onClick={() => {
                        const updatedTodos = todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t);
                        setTodos(updatedTodos);
                    }}>
                        {todo.completed ? 'Undo' : 'Complete'}
                    </button>
                </div>
            ))
        }
        
    </div>
  )
}

export default Chapter8