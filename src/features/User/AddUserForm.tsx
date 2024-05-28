import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { addUser } from './UserSlice';
import './style.css';

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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
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
    navigate('/'); // Перенаправление на главную страницу после добавления пользователя
  };

  return (
    <div className="addForm">
      <form onSubmit={handleSubmit}>
        <div className="form_group">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </div>
        <div className="form_group">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
        <div className="form_group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form_group">
          <input
            type="tel"
            pattern="\(\d{3}\)\d{3}-\d{4}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone (format: (123)456-7890)"
          />
        </div>
        <div className="form_group">
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
          />
        </div>
        <div className="form_group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </div>
        <div className="form_group">
          <input
            type="text"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            placeholder="Street Address"
          />
        </div>
        <div className="form_group">
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Zip Code"
          />
        </div>
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}

export default AddUserForm;
