import { createContext, useEffect, useState } from 'react';

interface Props {
  children?: React.ReactNode;
}

const AdminContext = createContext({
  isLoggedIn: true,
  onLogout: () => {},
  onLogIn: (username: string, password: string) => {},
});

export const AdminContextProvider: React.FC<Props> = ({
  children,
}): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const loginHandler = (username: string, password: string) => {
    username === 'testLogin' && password === 'zulu123'
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
  };

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: () => setIsLoggedIn(false),
        onLogIn: (username, password) => loginHandler(username, password),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
