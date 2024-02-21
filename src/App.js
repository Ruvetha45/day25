import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: '', description: '', status: 'Not Completed' });
  const [filterStatus, setFilterStatus] = useState('All');
  const [editingIndex, setEditingIndex] = useState(null);

  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo({ name: '', description: '', status: 'Not Completed' });
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
  };

  const updateStatus = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].status = updatedTodos[index].status === 'Not Completed' ? 'Completed' : 'Not Completed';
    setTodos(updatedTodos);
  };

  const editTodo = (index) => {
    setEditingIndex(index);
    const todoToEdit = todos[index];
    setNewTodo({ ...todoToEdit });
  };

  const saveTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos[editingIndex] = newTodo;
    setTodos(updatedTodos);
    setEditingIndex(null);
    setNewTodo({ name: '', description: '', status: 'Not Completed' });
  };

  const filterTodos = () => {
    if (filterStatus === 'All') return todos;
    return todos.filter((todo) => todo.status === filterStatus);
  };

  return (
    <div className="App">
      <h1>My Todo</h1>
      <div className="todo-form">
        <input
          type="text"
          placeholder="Todo Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        {editingIndex === null ? (
          <button className='Add_Todo' onClick={addTodo}>Add Todo</button>
        ) : (
          <button className='Save_Todo' onClick={saveTodo}>Save Todo</button>
        )}
      </div>
      
      <div className='sub_heading'>
      <h3>My Todos</h3>
      <div className="filter">        
        <label>Status filter:</label>
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Not Completed">Not Completed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      </div>

      <div className="todo-list">
        {filterTodos().map((todo, index) => (
          
          <div key={index} className="product">             
                <h3>Name :{todo.name}</h3>
                <p>Description :{todo.description}</p>            
                <p>Status: {todo.status}</p>

                <div className='button-group'>
                <button className='Change_Status' onClick={() => updateStatus(index)}>Change Status</button>
                {editingIndex === index ? (
                  <button className='Save' onClick={saveTodo}>Save</button>
                ) : (
                  <button className='Edit' onClick={() => editTodo(index)}>Edit</button>
                )}            
                <button className='Delete' onClick={() => deleteTodo(index)}>Delete</button>
                </div>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default App;
