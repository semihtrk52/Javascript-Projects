import { useState } from 'react';
import './App.css';
import TodoCreate from './components/TodoCreate';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const createTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (todoId) => {
    setTodos([...todos.filter((todo) => todo.id !== todoId)]);
  };

  const updateTodo = (newTodo) => {
    setTodos(todos.map((todo) => (
      todo.id === newTodo.id ? newTodo : todo)));
  };

  return (
    <div className="App">
      <div className="app-border">
        <TodoCreate onCreateTodo={createTodo} />
        <TodoList
          todos={todos}
          onRemoveTodo={deleteTodo}
          onUpdateTodo={updateTodo}
        />
      </div>
    </div>
  );
}

export default App;
