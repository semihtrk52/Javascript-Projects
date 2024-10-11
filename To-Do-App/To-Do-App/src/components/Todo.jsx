import React from 'react';
import { TiDelete } from 'react-icons/ti';
import { MdEdit } from 'react-icons/md';
import '../App.css';

function Todo() {
  return (
    <div className="todo-items">
      <div className="task-box">Bir görev</div>
      <div className="todo-icondiv">
        <MdEdit className="todo-icons" />
        <TiDelete className="todo-icons" />
      </div>
    </div>
  );
}

export default Todo;
