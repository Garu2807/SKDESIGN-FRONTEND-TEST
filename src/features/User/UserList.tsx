import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import UserItem from './UserItem';
import { loadUsers, searchUser } from './UserSlice';
import './style.css';
import useSort from './hooks/useSort';
import usePage from './hooks/usePage';

function UserList(): JSX.Element {
  const { filteredUsers } = useSelector((store: RootState) => store.users);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const {
    items: sortedUsers,
    requestSort,
    sortConfig,
    getClassNamesFor,
  } = useSort(filteredUsers);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const { currentPage, goToPage, goToNextPage, goFirstPage } =
    usePage(totalPages);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(searchUser(searchTerm));
  };

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

  const getSortArrow = (key: string) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    }
    return null;
  };

  return (
    <div className="user_list">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search users"
        />
        <button type="submit">Найти</button>
      </form>
      <table>
        <thead>
          <tr>
            <th
              onClick={() => requestSort('id')}
              className={getClassNamesFor('id')}
            >
              id {getSortArrow('id')}
            </th>
            <th
              onClick={() => requestSort('firstName')}
              className={getClassNamesFor('firstName')}
            >
              firstName {getSortArrow('firstName')}
            </th>
            <th
              onClick={() => requestSort('lastName')}
              className={getClassNamesFor('lastName')}
            >
              lastName {getSortArrow('lastName')}
            </th>
            <th
              onClick={() => requestSort('email')}
              className={getClassNamesFor('email')}
            >
              email {getSortArrow('email')}
            </th>
            <th
              onClick={() => requestSort('phone')}
              className={getClassNamesFor('phone')}
            >
              phone {getSortArrow('phone')}
            </th>
            <th
              onClick={() => requestSort('address.state')}
              className={getClassNamesFor('address.state')}
            >
              state {getSortArrow('address.state')}
            </th>
            <th
              onClick={() => requestSort('address.city')}
              className={getClassNamesFor('address.city')}
            >
              city {getSortArrow('address.city')}
            </th>
            <th
              onClick={() => requestSort('address.streetAddress')}
              className={getClassNamesFor('address.streetAddress')}
            >
              address {getSortArrow('address.streetAddress')}
            </th>
            <th
              onClick={() => requestSort('address.zip')}
              className={getClassNamesFor('address.zip')}
            >
              zip {getSortArrow('address.zip')}
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
        <button onClick={() => goFirstPage()} disabled={currentPage === 1}>
          В начало
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
