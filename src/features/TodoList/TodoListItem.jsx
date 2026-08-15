import { useEditableTitle } from '../../hooks/useEditableTitle.js';

import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';

import { isValidTodoTitle } from "../../utils/todoValidation.js";

export default function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  
  const {
  isEditing,
  workingTitle,
  startEditing,
  cancelEdit,
  updateTitle,
  finishEdit
} = useEditableTitle(todo.title);
  
  const handleEdit = (event) => updateTitle(event.target.value); 

  function handleUpdate(event) {
    if (!isEditing) return;
    event.preventDefault();

    onUpdateTodo({
      ...todo,
      title: finishEdit(),
    });
    
  }

  return ( 
  <li> 
    {isEditing ? (
    <form onSubmit={handleUpdate}>
      <TextInputWithLabel 
        elementID={'editTodoTitle-${todo.id}'}
        labelText="Todo"
        value={workingTitle} 
        onChange={handleEdit}
      />

      <button 
        type="button"
        onClick={handleUpdate}
        disabled={!isValidTodoTitle(workingTitle)} 
      >   
        Update
      </button>

      <button type="button" onClick={cancelEdit}>
        Cancel
      </button> 
    </form>    
    ) : (
      <>
        <input 
          type="checkbox" 
          checked={todo.isCompleted}
          onChange={() => onCompleteTodo(todo.id)}
      />
      <span onClick={startEditing}>{todo.title}</span>
    </>
  )}
</li>
);
}