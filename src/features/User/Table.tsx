import React, { useEffect, useMemo, useState } from 'react'; // используем useNavigate для перенаправления
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { loadUsers } from './UserSlice';
import { User } from './types/User';
import './style.css';
import UserPage from './UserPage';

function Table(): JSX.Element {
  const users = useSelector((store: RootState) => store.users.users);
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);
  const handleCloseClick = () => {
    setSelectedUser(null); // Сброс выбранного пользователя
  };

  // Мемоизация колонок для предотвращения ненужных перерисовок
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 150,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address.city',
        header: 'City',
        size: 200,
      },
      {
        accessorKey: 'address.state',
        header: 'State',
        size: 150,
      },
      {
        accessorKey: 'address.streetAddress',
        header: 'Street',
        size: 150,
      },
      {
        accessorKey: 'address.zip',
        header: 'Zip',
        size: 150,
      },
    ],
    []
  );
  const handleRowClick = (row: {
    original: React.SetStateAction<User | null>;
  }) => {
    setSelectedUser(row.original);
  };
  const table = useMaterialReactTable<User>({
    columns,
    data: users,
    enableRowSelection: false,
    enablePagination: true,
    muiTableBodyRowProps: ({ row }: { row: MRT_Row<User> }) => ({
      onClick: () => handleRowClick(row),
      style: {
        cursor: 'pointer',
      },
    }),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <div>
        {selectedUser && (
          <UserPage user={selectedUser} onClose={handleCloseClick} />
        )}
      </div>
    </>
  );
}

export default Table;
