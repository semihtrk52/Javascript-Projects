import React, { useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { MdEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import '../App.css';

function Todo({ todo, onRemoveTodo, onUpdateTodo }) {
  const [editable, setEditable] = useState(false);
  const [newTodo, setNewTodo] = useState(todo.content);

  const removeTodo = () => {
    onRemoveTodo(todo.id);
  };

  const updateTodo = () => {
    const request = {
      id: todo.id,
      content: newTodo,
    };
    onUpdateTodo(request);
    setEditable(false);
  };

  return (
    <div className="todo-items">
      {editable ? (
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          type="text"
          className="task-box"
        />
      ) : (
        <div className="task-box">{todo.content}</div>
      )}
      <div className="todo-icondiv">
        {editable ? (
          <FaCheck onClick={updateTodo} />
        ) : (
          <MdEdit className="todo-icons" onClick={() => setEditable(true)} />
        )}

        <TiDelete onClick={removeTodo} className="todo-icons" />
      </div>
    </div>
  );
}

export default Todo;
