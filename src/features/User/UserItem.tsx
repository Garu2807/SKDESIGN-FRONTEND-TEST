import React from 'react';
import { User } from './types/User';
import './style.css';
import { useNavigate } from 'react-router-dom';
export type UserProps = {
  user: User;
};
function UserItem({ user }: UserProps): JSX.Element {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate(`/${user.id}`);
  };
  return (
    <tr className="user_item" onClick={handleClick}>
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
  );
}

export default UserItem;
