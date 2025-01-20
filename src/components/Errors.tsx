import React, { useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  error: string;
  setError: (newError: string) => void;
};

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
