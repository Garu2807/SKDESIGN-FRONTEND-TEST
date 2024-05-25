import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { addUser } from './UserSlice';

function AddUserForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [zip, setZip] = useState('');
  const navigate = useNavigate();
  const handleSumbit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      address: {
        streetAddress,
        city,
        state,
        zip,
      },
      description: 'et lacus magna dolor...',
    };
    dispatch(addUser(newUser));
  };
  return (
    <div className="addForm">
      <form onSubmit={(e) => handleSumbit(e)}>
        <div className="form_grop">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form_grop">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form_grop">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form_grop">
          <input
            type="tel"
            pattern="\(\d{3}\)\d{3}-\d{4}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}

export default AddUserForm;
