import { useState } from 'react';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';

/* Data must become React state in order to not trigger a re-render. */
import './App.css'
   
 /* 
Implement useState inside the top of the App component.
Use array destructuring to access the state value (todoList) and its accompanying state update function (setTodoList).
Set useState's default value to todos.   
*/  
function App() {
  const [todoList, setTodoList] = useState([])

    /* Create object before adding */
    function addTodo(todoTitle) {
      const newTodo = {
        id: Date.now(),
        title: todoTitle,
      };  

      /* Update React state by returning a new array, never change the old array. */
      setTodoList((previousTodoList) => {
        return [...previousTodoList, newTodo];
      });
    }

  return (
  <div>
    <h1>Todo List</h1>
    <TodoForm onAddTodo={addTodo} />
    {/* 
    left of = is the name of the prop to send
    right of the = is the variable in App.jsx that contains the array
    render the TodoList component and give it the todoList array.
    */}
    <TodoList todoList={todoList} />
  </div>
  );
}

export default App
