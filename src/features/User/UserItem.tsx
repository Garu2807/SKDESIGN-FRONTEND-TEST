import React from 'react';
import { User } from './types/User';
export type UserProps = {
  user: User;
};
function UserItem({ user }: UserProps): JSX.Element {
  return (
    <div className="user_item">
      <p>{user.id}</p>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>{user.email}</p>
      <p>{user.address.city}</p>
      <p>{user.address.state}</p>
      <p>{user.address.streetAddress}</p>
      <p>{user.address.zip}</p>
    </div>
  );
}

export default UserItem;
