import TodoListItem from './TodoListItem.jsx';

function TodoList({ todoList, onCompleteTodo }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  return filteredTodoList.length === 0 ? (
    <p>Add todo above to get started</p>
    ) : (

      <ul>
        {/* Keep the key prop here as it is still needed. */}
        {filteredTodoList.map(todo => (
          <TodoListItem 
            key={todo.id} 
            todo={todo}
            onCompleteTodo={onCompleteTodo}
          />
        ))}
      </ul>
  
  );

}

export default TodoList;