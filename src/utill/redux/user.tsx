import { createContext, ReactNode, useState } from 'react';

export const UserContext = createContext<any>({
  user: null,
  setUserHandler: (data: any) => {},
});

interface UserContextProviderProps {
  children?: any;
}

const UserContextProvider: React.FC<any> = ({
  children,
}: UserContextProviderProps) => {
  const [user, setUser] = useState<any>();

  const setUserHandler = (data: string) => setUser(data);

  return (
    <UserContext.Provider value={{ user: user, setUserHandler }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
