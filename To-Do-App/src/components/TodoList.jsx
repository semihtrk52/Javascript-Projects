import React from 'react';
import Todo from '../components/Todo';
import '../App.css';

function TodoList({ todos, onRemoveTodo, onUpdateTodo }) {
  return (
    <>
      {todos
        .slice(0)
        .reverse()
        .map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onUpdateTodo={onUpdateTodo}
          />
        ))}
    </>
  );
}

export default TodoList;
