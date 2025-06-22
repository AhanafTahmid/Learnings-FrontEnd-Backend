import React, { useState } from 'react';

const ArrayTodo: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  // Function to add a todo
  const addTodo = (todo: string) => {
    if (todo.trim() !== '') {
      setTodos(prevTodos => [...prevTodos, todo]);
      setNewTodo(''); // Clear input after adding
    }
  };

  const removeTodo = (index: number) => {
    setTodos(prevTodos => prevTodos.filter((_, i) => i !== index));//returns a new array
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a todo"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={() => addTodo(newTodo)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>{todo}</span>
            <button
              onClick={() => removeTodo(index)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArrayTodo;
