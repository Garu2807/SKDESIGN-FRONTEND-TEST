import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { loadUsers } from './UserSlice';

function UserPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { users } = useSelector((store: RootState) => store.users);
  const oneUser = users.find((user) => user.id === Number(id));

  useEffect(() => {
    if (!users.length) {
      dispatch(loadUsers());
    }
  }, [dispatch, users.length]);

  if (!oneUser) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="user_info">
      <p>
        Выбран пользователь <b>{`${oneUser.firstName} ${oneUser.lastName}`}</b>
      </p>
      <p>
        Описание:
        <textarea name="descr" id="">{`${oneUser.description}`}</textarea>
      </p>
      <p>
        Адрес проживания: <b>{`${oneUser.address.streetAddress}`}</b>
      </p>
      <p>
        Город: <b>{`${oneUser.address.city}`}</b>
      </p>
      <p>
        Провинция/штат: <b>{`${oneUser.address.state}`}</b>
      </p>
      <p>
        Индекс: <b>{`${oneUser.address.zip}`}</b>
      </p>
    </div>
  );
}

export default UserPage;
