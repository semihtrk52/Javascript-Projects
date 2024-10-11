import React, { useState } from 'react';
import '../App.css';

function TodoCreate({ onCreateTodo }) {
  const [newTodo, setNewTodo] = useState('');

  const createTodo = () => {
    if (!newTodo) return;
    const request = {
      id: Math.floor(Math.random() * 99999),
      content: newTodo,
    };
    onCreateTodo(request);
    setNewTodo('');
  };

  return (
    <div className="todo-create">
      <input
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
        type="text"
        placeholder="Todo giriniz"
      />
      <button onClick={createTodo}>Todo Oluştur</button>
    </div>
  );
}

export default TodoCreate;
