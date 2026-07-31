import { useState } from 'react';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';

import './App.css'
 const todos = [
    { id: 1, title: "review resources"},
    { id: 2, title: "take notes"},
    { id: 3, title: "code out app"},
  ]
/* 
Implement useState inside the top of the App component.
Use array destructuring to access the state value (todoList) and its accompanying state update function (setTodoList).
Set useState's default value to todos.   
*/  
function App() {
  const [todoList, setTodoList] = useState(todos)
return (
  <div>
    <h1>Todo List</h1>
    <TodoForm />
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
