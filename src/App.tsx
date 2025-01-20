import React, { useCallback, useEffect, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';

import { Error } from './components/Errors';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { UserWarning } from './components/UserWarning';

import { FILTER_TYPES } from './types/FilterType';

import { Todo } from './types/Todo';
import { ErrorMessage } from './types/types';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsloading(true);
    getTodos()
      .then(setTodoList)
      .catch(() => setErrorMessage(ErrorMessage.Get))
      .finally(() => setIsloading(false));
  }, []);

  const handleHideError = () => {
    setErrorMessage('');
  };

  const handleError = (error: string) => {
    setErrorMessage(error);
  };

  const handleAddNewTodo = (newTodo: Todo) => {
    setTodoList(prevTodos => [...prevTodos, newTodo]);
  };

  const markAllTodoCompleted = () => {
    const isCompleted = todoList.every(todo => todo.completed);

    const updatedTodo = todoList.map(todo => ({
      ...todo,
      completed: !isCompleted,
    }));

    setTodoList(updatedTodo);
  };

  const handleChangeToggle = (id: number) => {
    setTodoList(prevTodo =>
      prevTodo.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodoList(prevTodo => prevTodo.filter(todo => todo.id !== id));
  };

  const handleDeleteCompletedTodos = () => {
    setTodoList(todoList.filter(todo => !todo.completed));
  };

  const handleFilterTodo = useCallback(
    (option: string) => {
      switch (option) {
        case FILTER_TYPES.ALL:
          return setFilteredTodos(todoList);
        case FILTER_TYPES.ACTIVE:
          return setFilteredTodos(todoList.filter(todo => !todo.completed));
        case FILTER_TYPES.COMPLETED:
          return setFilteredTodos(todoList.filter(todo => todo.completed));
        default:
          return setFilteredTodos(todoList);
      }
    },
    [todoList],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todo-app">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoHeader
          onError={handleError}
          onAddTodo={handleAddNewTodo}
          onCompleted={markAllTodoCompleted}
        />
        {!isLoading && (
          <TodoList
            todos={filteredTodos}
            isLoading={isLoading}
            onToggle={handleChangeToggle}
            onDelete={handleDeleteTodo}
            onError={handleError}
          />
        )}
        {todoList.length !== 0 && (
          <TodoFooter
            todos={todoList}
            onFilter={handleFilterTodo}
            onDeleteCompletedTodo={handleDeleteCompletedTodos}
          />
        )}
      </div>
      <Error error={errorMessage} setError={handleHideError} />
    </div>
  );
};
