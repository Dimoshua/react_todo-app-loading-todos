import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { FILTER_TYPES } from '../types/FilterType';

interface TodoFooterProps {
  todos: Todo[];
  onFilter: (option: string) => void;
  onDeleteCompletedTodo: () => void;
}

export const TodoFooter: React.FC<TodoFooterProps> = ({
  todos,
  onFilter,
  onDeleteCompletedTodo,
}) => {
  const [option, setOption] = useState(FILTER_TYPES.ALL);
  const countActiveTodo = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodo = todos.some(todo => todo.completed);

  const handleFilterSelect =
    (filter: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setOption(filter);
    };

  const deleteCompleted = () => {
    onDeleteCompletedTodo();
  };

  useEffect(() => {
    onFilter(option);
  }, [option, onFilter]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${countActiveTodo} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${option === FILTER_TYPES.ALL ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={handleFilterSelect(FILTER_TYPES.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${option === FILTER_TYPES.ACTIVE ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={handleFilterSelect(FILTER_TYPES.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${option === FILTER_TYPES.COMPLETED ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={handleFilterSelect(FILTER_TYPES.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodo}
        onClick={deleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
