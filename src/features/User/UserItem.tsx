import React from 'react';
import { User } from './types/User';
import './style.css';
export type UserProps = {
  user: User;
};
function UserItem({ user }: UserProps): JSX.Element {
  return (
    <tr className="user_item">
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
