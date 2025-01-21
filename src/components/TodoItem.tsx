/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { ErrorMessage } from '../types/types';
import classNames from 'classnames';

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
  isLoading: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onError: (error: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  completed,
  isLoading,
  onToggle,
  onDelete,
  onError,
}) => {
  const handleCheckboxChange = () => {
    onToggle(id);
  };

  // interface TodoItemProps {
  //   id: number;
  //   title: string;
  //   completed: boolean;
  //   isLoading: boolean;
  //   onToggle: (id: number) => void;
  //   onDelete: (id: number) => void;
  //   onError: (error: string) => void;
  // }

  // interface Props {
  //   todo: TodoItemProps;
  // }

  // export const TodoItem: React.FC<Props> = ({ todo }) => {
  //   const handleCheckboxChange = () => {
  //     todo.onToggle(todo.id);
  //   };

  const handleDeleteTodo = () => {
    if (id) {
      onDelete(id);
    } else {
      onError(ErrorMessage.Delete);
    }
  };

  return (
    <div>
      <div
        data-cy="Todo"
        // className={`todo ${todo.completed ? 'todo completed' : ''} ${todo.isLoading ? 'is-active' : ''}`}

        className={classNames(
          'todo',
          { 'todo completed': completed === true },
          { 'is-active': isLoading === true },
        )}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
            onChange={handleCheckboxChange}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {title}
        </span>

        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleDeleteTodo}
        >
          ×
        </button>

        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </div>
  );
};
