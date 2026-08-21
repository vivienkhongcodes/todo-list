import {useEffect, useState } from 'react';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList/TodoList';

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      setIsTodoListLoading(true); 
      
      try {
        const params = new URLSearchParams({
          limit: 100,
        });
        const response = await fetch(`/api/tasks?${params}`, {
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setTodoList(data.tasks || []);
        } else if (response.status === 401) {
          throw new Error('unauthorized');
        } else {
          throw new Error('Failed to fetch todos');
        }
      
      } catch (error) {
        setError(error.message);
      } finally {
        setIsTodoListLoading(false);
      }
    }
   
    if (token) {
      fetchTodos();    
    }

}, [token]);

  async function addTodo(todoTitle) {
    const tempId = Date.now();

    const newTodo = {
      id: tempId,
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((previousTodoList) => {
      return [newTodo, ...previousTodoList];
    });

    try {

      const response = await fetch(`/api/tasks`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'X-CSRF-TOKEN': token, 
        },
        credentials: 'include',
        body: JSON.stringify({
          title: todoTitle,
          isCompleted: false,    
        }),
      });   
      
      const data = await response.json();

      if (response.ok) {
        setTodoList((previousTodoList) =>
          previousTodoList.map((todo) =>
            todo.id === tempId ? data : todo
         )
        );
      } else {
        throw new Error('Failed to add todo');
      };

    } catch (error) {
      setTodoList((previousTodoList) =>
        previousTodoList.filter((todo) => todo.id !== tempId)
      );
      
      setError(error.message);

    }    
    
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: true,
        };
      }

      return todo;
    });

    setTodoList(updatedTodoList);

    try {

      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          isCompleted: true,
        }),
      }); 
      
      if (!response.ok) {
        throw new Error('Failed to complete todo');
      }

    } catch (error) {
      setTodoList((previousTodoList) =>
        previousTodoList.map((todo) =>
          todo.id === id ? originalTodo : todo
        )
      );
      
      setError(error.message);
    }

  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find(
      (todo) => todo.id === editedTodo.id    
    );

    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }

      return todo;
    });

    setTodoList(updatedTodos);

    try {

      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,    
        }),
      }); 
      
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

    } catch (error) {
      setTodoList((previousTodoList) =>
        previousTodoList.map((todo) =>
          todo.id === editedTodo.id ? originalTodo : todo
      )
    );
    
    setError(error.message);

    }

  }

  return (
    <div>
       {error && (
         <div>
            <p>{error}</p>
            <button type="button" onClick={() => setError('')}>
              Clear Error
            </button>
         </div>
       )}      

       {isTodoListLoading && <p>Loading todos...</p>}

      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      /> 
    </div>
  );
}

export default TodosPage;