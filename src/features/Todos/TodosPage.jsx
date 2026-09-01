import { useCallback, useEffect, useState } from 'react';

import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList/TodoList';
import SortBy from '../../shared/SortBy.jsx';
import FilterInput from '../../shared/FilterInput.jsx';
import useDebounce from '../../utils/useDebounce.js';

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterTerm, setFilterTerm] = useState('');
  const debouncedFilterTerm = useDebounce(filterTerm, 300);
  const [dataVersion, setDataVersion] = useState(0);
  const [filterError, setFilterError] = useState('');

  const handleFilterChange = (newTerm) => {
    setFilterTerm(newTerm);
  };
  
  const invalidateCache = useCallback(() => {
    setDataVersion((prev) => prev +1);
  }, []);

  useEffect(() => {
    async function fetchTodos() {
      setIsTodoListLoading(true); 
      
      try {
        const paramsObject = {
          sortBy,
          sortDirection,
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }
      
        const params = new URLSearchParams(paramsObject);

        const response = await fetch(`/api/tasks?${params}`, {
  headers: {
    'X-CSRF-TOKEN': token,
    },
    credentials: 'include',
        });

        if (response.status === 401) {
          throw new Error('unauthorized');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        const data = await response.json();

        setTodoList(data.tasks || []);
        setFilterError('');
  
      } catch (error) {
        if (debouncedFilterTerm || sortBy !== 'createdAt' || sortDirection !== 'desc') {
        setFilterError(`Error filtering/sorting todos: ${error.message}`);
        } else {
        setError(`Error fetching todos: ${error.message}`);
        }
      } finally {
        setIsTodoListLoading(false);
      }
    }
   
    if (token) {
      fetchTodos();    
    }

  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

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
        invalidateCache();
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

      invalidateCache();

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

      invalidateCache();

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

        {filterError && (
          <div>
            <p>{filterError}</p>

            <button type="button" onClick={() => setFilterError('')}>
              Clear Filter Error
            </button>

            <button
              type="button"
              onClick={() => {
                setFilterTerm('');
                setSortBy('createdAt');
                setSortDirection('desc');
                setFilterError('');
              }}
             >
              Reset Filters
             </button>
            </div>  
        )}
       {isTodoListLoading && <p>Loading todos...</p>}

      <SortBy 
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
      /> 

      <FilterInput
        filterTerm={filterTerm} 
        onFilterChange={handleFilterChange}
      />  
      
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
      /> 
    </div>
  );
}

export default TodosPage;