import React from 'react';
import Todo from '../components/Todo';
import '../App.css';

function TodoList() {
  return (
    <div className="todo-list">
      <Todo />
      <Todo />
      <Todo />
      <Todo />
    </div>
  );
}

export default TodoList;
