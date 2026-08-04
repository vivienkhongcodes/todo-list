/* Declare a TodoListItem component */
export default function TodoListItem({ todo, onCompleteTodo }) {
 /* Refactor the return statement so it is a list item containing todo.title and remove the key props. */   
 return ( 
  <li> 
    <input type="checkbox" 
    checked={todo.isCompleted}
    onChange={() => onCompleteTodo(todo.id)}
    />
    {todo.title}
  </li>
);  
}

