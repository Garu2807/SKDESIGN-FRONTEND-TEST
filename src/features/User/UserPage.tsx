import React from 'react';
import { User } from './types/User';
import './style.css';

type UserPageProps = {
  user: User;
  onClose: () => void;
};

function UserPage({ user, onClose }: UserPageProps): JSX.Element {
  return (
    <div className="user_info">
      <p>
        Выбран пользователь{' '}
        <b>
          {user.firstName} {user.lastName}
        </b>
      </p>
      <p>
        Описание:
        <textarea readOnly value={user.description} />
      </p>
      <p>
        Адрес проживания: <b>{user.address.streetAddress}</b>
      </p>
      <p>
        Город: <b>{user.address.city}</b>
      </p>
      <p>
        Провинция/штат: <b>{user.address.state}</b>
      </p>
      <p>
        Индекс: <b>{user.address.zip}</b>
      </p>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default UserPage;
