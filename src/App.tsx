import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './store';
import { loadUsers } from './features/User/UserSlice';
import './App.css';
import Table from './features/User/Table';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUsers()); 
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Table />} />
      </Routes>
    </div>
  );
}

export default App;
