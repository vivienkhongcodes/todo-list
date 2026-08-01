import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const inputRef = useRef();

  function handleAddTodo(event) {
    event.preventDefault();

    const todoTitle = event.target.todoTitle.value.trim();

    if (!todoTitle) {
      return;
    }

    onAddTodo(todoTitle);

    event.target.reset();

    inputRef.current.focus();
  }

    return (
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Todo</label>

        <input type="text" 
        id="todoTitle" 
        name="todoTitle"
        ref={inputRef}
        />
        <button type="submit">
          Add Todo
        </button>
      </form>      
    );
}

export default TodoForm;