import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import UserItem from './UserItem';
import { loadUsers } from './UserSlice';
import './style.css';
import useSort from './useSorte';
import { SortKey } from './types/User';

function UserList(): JSX.Element {
  const { users } = useSelector((store: RootState) => store.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const { items: sortedUsers, requestSort, getClassNamesFor } = useSort(users);

  return (
    <div className="user_list">
      <table>
        <thead>
          <tr>
            <th
              onClick={() => requestSort('id')}
              className={getClassNamesFor('id')}
            >
              id
            </th>
            <th
              onClick={() => requestSort('firstName')}
              className={getClassNamesFor('firstName')}
            >
              firstName
            </th>
            <th
              onClick={() => requestSort('lastName')}
              className={getClassNamesFor('lastName')}
            >
              lastName
            </th>
            <th
              onClick={() => requestSort('email')}
              className={getClassNamesFor('email')}
            >
              email
            </th>
            <th
              onClick={() => requestSort('phone')}
              className={getClassNamesFor('phone')}
            >
              phone
            </th>
            <th
              onClick={() => requestSort('address.state')}
              className={getClassNamesFor('address.state')}
            >
              state
            </th>
            <th
              onClick={() => requestSort('address.city')}
              className={getClassNamesFor('address.city')}
            >
              city
            </th>
            <th
              onClick={() => requestSort('address.streetAddress')}
              className={getClassNamesFor('address.streetAddress')}
            >
              address
            </th>
            <th
              onClick={() => requestSort('address.zip')}
              className={getClassNamesFor('address.zip')}
            >
              zip
            </th>
            <th
              onClick={() => requestSort('description')}
              className={getClassNamesFor('description')}
            >
              description
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <UserItem user={user} key={`${user.id}-${index}`} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
