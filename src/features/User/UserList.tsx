import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import UserItem from './UserItem';
import { loadUsers } from './UserSlice';
import './style.css';
function UserList(): JSX.Element {
  const { users } = useSelector((store: RootState) => store.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  return (
    <div className="user_list">
      
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>
            <th>phone</th>
            <th>state</th>
            <th>city</th>
            <th>address</th>
            <th>zip</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem user={user} key={user.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
