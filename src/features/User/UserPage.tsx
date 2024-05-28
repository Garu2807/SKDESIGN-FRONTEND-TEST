import React from 'react';
import { User } from './types/User';

type UserPageProps = {
  user: User;
  onClose: () => void;
};

function UserPage({ user, onClose }: UserPageProps) {
  return (
    <div
      style={{
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        position: 'relative',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          cursor: 'pointer',
        }}
      >
        Закрыть
      </button>
      <p>
        Выбран пользователь <b>{`${user.firstName} ${user.lastName}`}</b>
      </p>
      <p>
        Описание:
        <textarea name="descr" readOnly>{`${user.description}`}</textarea>
      </p>
      <p>
        Адрес проживания: <b>{`${user.address.streetAddress}`}</b>
      </p>
      <p>
        Город: <b>{`${user.address.city}`}</b>
      </p>
      <p>
        Провинция/штат: <b>{`${user.address.state}`}</b>
      </p>
      <p>
        Индекс: <b>{`${user.address.zip}`}</b>
      </p>
    </div>
  );
}

export default UserPage;
