import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { FILTER_TYPES } from '../types/FilterType';
import classNames from 'classnames';

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
      {Object.values(FILTER_TYPES).map(filter => (
          <a
            key={filter}
            href={`#/${filter.toLowerCase()}`}
            data-cy={`FilterLink${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
            className={classNames('filter__link', {
              selected: option === filter,
            })}
            onClick={() => {
              handleFilterSelect(filter);
            }}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </a>
      ))}

        {/* <a
          href="#/"
          className={classNames('filter__link',
                    { 'selected': option === FILTER_TYPES.ALL },
                  )}
          data-cy="FilterLinkAll"
          onClick={handleFilterSelect(FILTER_TYPES.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link',
            { 'selected': option === FILTER_TYPES.ACTIVE },
          )}
          data-cy="FilterLinkActive"
          onClick={handleFilterSelect(FILTER_TYPES.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link',
            { 'selected': option === FILTER_TYPES.COMPLETED },
          )}
          data-cy="FilterLinkCompleted"
          onClick={handleFilterSelect(FILTER_TYPES.COMPLETED)}
        >
          Completed
        </a> */}
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
