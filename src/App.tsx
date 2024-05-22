import { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './store';
import { loadUsers } from './features/User/UserSlice';
import { Route, Routes } from 'react-router-dom';
import UserList from './features/User/UserList';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
