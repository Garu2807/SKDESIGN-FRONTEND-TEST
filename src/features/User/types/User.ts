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
  address: Address;
  description: string;
};

export type userId = User['id'];
