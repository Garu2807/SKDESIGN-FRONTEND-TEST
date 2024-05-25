export type Address = {
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
};
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  description: string;
};
export type SortKey =
  | keyof User
  | 'address.state'
  | 'address.streetAddress'
  | 'address.city'
  | 'address.zip';
export type userId = User['id'];
