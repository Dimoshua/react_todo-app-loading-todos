import classNames from 'classnames';
import React, { useEffect } from 'react';

type Props = {
  error: string;
  setError: (newError: string) => void;
};

export enum ErrorMessage {
  Update = 'Unable to update a todo',
  Add = 'Unable to add a todo',
  Delete = 'Unable to delete a todo',
  Get = 'Unable to load todos',
  Title = 'Title should not be empty',
}

export const Error: React.FC<Props> = ({ error, setError }) => {
  useEffect(() => {
    const timer = setTimeout(() => setError(''), 3000);

    return () => clearTimeout(timer);
  }, [error, setError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError('')}
      />
      {error}
    </div>
  );
};
