import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import {v4 as uuidv4} from 'uuid';
import './index.css'

const APP_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(APP_STORAGE_KEY))
    if( storedTodos ) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if( name === '' ) return
    //console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <h1>Welcome to Simple Check List </h1>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />&nbsp;&nbsp;
      <button class="button button1" onClick={handleAddTodo}>Add Todo</button>&nbsp;&nbsp;
      <button class="button button1" onClick={handleClearTodos}>Clear Complete Todo</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
