import { useRef, useState } from 'react';

function TodoForm({ onAddTodo }) {
  const inputRef = useRef();

  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();

    if (!workingTodoTitle.trim()) {
      return;
    }

    onAddTodo(workingTodoTitle);

    setWorkingTodoTitle('');

    inputRef.current.focus();
  }

    return (
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Todo</label>

        <input type="text" 
        id="todoTitle" 
        name="todoTitle"
        ref={inputRef}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        />
        <button 
          type="submit"
          disabled={!workingTodoTitle.trim()}
        >
          Add Todo
        </button>
      </form>      
    );
}

export default TodoForm;