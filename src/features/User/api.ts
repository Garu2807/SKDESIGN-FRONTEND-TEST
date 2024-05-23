import { User } from './types/User';

export const loadUsers = async (): Promise<User[]> => {
  const res = await fetch(
    'http://www.filltext.com/?rows=100&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
  );
  const data = res.json();
  console.log(data);
  return data;
};
loadUsers();
