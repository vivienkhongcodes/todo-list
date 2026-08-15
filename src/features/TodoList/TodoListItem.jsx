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

    const finalTitle = finishEdit();

    onUpdateTodo({
      ...todo,
      title: finalTitle,
    });
    
  }

  return ( 
  <li> 
    {isEditing ? (
    <form onSubmit={handleUpdate}>
      <TextInputWithLabel 
        elementId={`editTodoTitle-${todo.id}`}
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
      <label>
        <input 
          type="checkbox" 
          checked={todo.isCompleted}
          onChange={() => onCompleteTodo(todo.id)}
      />
      </label>
      <span onClick={startEditing}>{todo.title}</span>
    </>
  )}
</li>
);
}