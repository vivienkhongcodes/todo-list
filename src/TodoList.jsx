import TodoListItem from './TodoListItem.jsx';
function TodoList({ todoList }) {
   
    return (
        <ul>
      {/* Keep the key prop here as it is still needed. */}     
      {todoList.map(todo => (
        <TodoListItem key={todo.id} todo={todo} />  
      ))}
        </ul>
    );
}

export default TodoList;