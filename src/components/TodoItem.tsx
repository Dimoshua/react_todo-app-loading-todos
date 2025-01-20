/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { ErrorMessage } from '../types/types';
import classNames from 'classnames';

// interface TodoItemProps {
//   id: number;
//   title: string;
//   completed: boolean;
//   isLoading: boolean;
//   onToggle: (id: number) => void;
//   onDelete: (id: number) => void;
//   onError: (error: string) => void;
// }

// export const TodoItem: React.FC<TodoItemProps> = ({
//   id,
//   title,
//   completed,
//   isLoading,
//   onToggle,
//   onDelete,
//   onError,
// }) => {

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
  isLoading: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onError: (error: string) => void;
}

interface Props {
  todo: TodoItemProps;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const handleCheckboxChange = () => {
    todo.onToggle(todo.id);
  };

  const handleDeleteTodo = () => {
    if (todo.id) {
      todo.onDelete(todo.id);
    } else {
      todo.onError(ErrorMessage.Delete);
    }
  };

  return (
    <div>
      <div
        data-cy="Todo"
        // className={`todo ${todo.completed ? 'todo completed' : ''} ${todo.isLoading ? 'is-active' : ''}`}

        className={classNames(
          'todo',
          { 'todo completed': todo.completed === true },
          { 'is-active': todo.isLoading === true },
        )}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={handleCheckboxChange}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
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
