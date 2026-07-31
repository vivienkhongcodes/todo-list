/* Declare a TodoListItem component */
export default function TodoListItem({ todo }) {
 /* Refactor the return statement so it is a list item containing todo.title and remove the key props. */   
 return ( 
  <li> 
    {todo.title}
  </li>
);  
}

