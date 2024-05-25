import { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './store';
import { loadUsers } from './features/User/UserSlice';
import { Route, Routes } from 'react-router-dom';
import UserList from './features/User/UserList';
import AddUserForm from './features/User/AddUserForm';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/form" element={<AddUserForm />} />
        <Route path="/" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
