import { createContext, useState } from 'react';
import { ProductInterface } from '..';

const defaultState = {
  basket: {
    items: {},
    totalCount: 0,
    totalPrice: 0,
  },
  currency: '£',
};

export interface IUser {
  basket: {
    items: object | ProductInterface;
    totalCount: number;
    totalPrice: number;
  };
  currency: string;
}

export type UserContextType = {
  user: IUser;
  setUser: (data: any) => void;
};

interface UserContextInterface {
  children?: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({
  user: defaultState,
  setUser: () => {},
});

export const UserProvider: React.FC<UserContextInterface> = ({ children }) => {
  const [user, setUser] = useState<IUser>(defaultState);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
