import { User } from './types/User';

export const loadUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch(
      'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    );
    const data = await res.json();

    const uniqueData = data.filter(
      (user: { id: any }, index: any, self: any[]) =>
        index === self.findIndex((t) => t.id === user.id)
    );

    return uniqueData;
  } catch (error) {
    console.error('Произошла ошибка при загрузке:', error);
    return [];
  }
};
