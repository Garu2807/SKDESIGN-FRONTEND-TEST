import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserList from './features/User/UserList';
import AddUserForm from './features/User/AddUserForm';
import UserPage from './features/User/UserPage';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/form" element={<AddUserForm />} />
        <Route path="/" element={<UserList />} />
        <Route path="/:id" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
