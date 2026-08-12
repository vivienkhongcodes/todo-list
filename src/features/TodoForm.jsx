import { isValidTodoTitle } from '../utils/todoValidation';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();

    if (!workingTodoTitle.trim()) {
      return;
    }

    onAddTodo(workingTodoTitle);

    setWorkingTodoTitle('');

  }

    return (
      <form onSubmit={handleAddTodo}>
        <TextInputWithLabel 
          elementId="todoTitle"
          labelText="Todo"
          value={workingTodoTitle}
          onChange={(event) => setWorkingTodoTitle(event.target.value)}/>
        
        <button 
          type="submit"
          disabled={!isValidTodoTitle(workingTodoTitle)}
        >
          Add Todo
        </button>
      </form>      
    );
}

export default TodoForm;