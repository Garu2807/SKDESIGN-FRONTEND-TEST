import React, { useState } from 'react';
import { User } from './types/User';
import './style.css';
import UserPage from './UserPage';

export type UserProps = {
  user: User;
};

function UserItem({ user }: UserProps): JSX.Element {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = () => {
    setSelectedUser(user); // Установка выбранного пользователя
  };

  const handleCloseClick = () => {
    setSelectedUser(null); // Сброс выбранного пользователя
  };

  return (
    <>
      <tr className="user_item" onClick={handleUserClick}>
        <td>{user.id}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.address.state}</td>
        <td>{user.address.city}</td>
        <td>{user.address.streetAddress}</td>
        <td>{user.address.zip}</td>
      </tr>
      {selectedUser && (
        <UserPage user={selectedUser} onClose={handleCloseClick} />
      )}
    </>
  );
}

export default UserItem;
