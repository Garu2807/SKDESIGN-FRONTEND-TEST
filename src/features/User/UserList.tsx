import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import UserItem from './UserItem';
import { loadUsers } from './UserSlice';

function UserList(): JSX.Element {
  const { users } = useSelector((store: RootState) => store.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  return (
    <div>
      {users.map((user) => (
        <UserItem user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;
