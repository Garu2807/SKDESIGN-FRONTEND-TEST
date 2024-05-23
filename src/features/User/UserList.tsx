import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import UserItem from './UserItem';
import { loadUsers } from './UserSlice';
import './style.css';
import useSort from './hooks/useSorte';
import usePage from './hooks/usePage';

function UserList(): JSX.Element {
  const { users } = useSelector((store: RootState) => store.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const { items: sortedUsers, requestSort, getClassNamesFor } = useSort(users);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const { currentPage, goToPage, goToNextPage, goFirtPage } =
    usePage(totalPages);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  let startPage = currentPage - 2;
  let endPage = currentPage + 2;
  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(totalPages, 5);
  }
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - 4);
  }

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
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <UserItem user={user} key={`${user.id}-${index}`} />
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => goFirtPage()} disabled={currentPage === 1}>
          Пред
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={startPage + i}
            onClick={() => goToPage(startPage + i)}
            className={currentPage === startPage + i ? 'active' : ''}
          >
            {startPage + i}
          </button>
        ))}
        <button
          onClick={() => goToNextPage()}
          disabled={currentPage === totalPages}
        >
          След
        </button>
      </div>
    </div>
  );
}

export default UserList;
