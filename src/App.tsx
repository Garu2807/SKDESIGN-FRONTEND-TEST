import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './store';
import { loadUsers } from './features/User/UserSlice';
import UserList from './features/User/UserList';
import AddUserForm from './features/User/AddUserForm';
import UserPage from './features/User/UserPage';
import './App.css';
import Table from './features/User/Table';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUsers()); // Загружаем пользователей при первой загрузке приложения
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Table />} />
        {/* <Route path="/form" element={<AddUserForm />} /> */}
      </Routes>
    </div>
  );
}

export default App;
