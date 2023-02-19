import { createContext, useEffect, useState } from 'react';

interface Props {
  children?: React.ReactNode;
}

const AdminContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogIn: (username: string, password: string) => {},
});

export const AdminContextProvider: React.FC<Props> = ({
  children,
}): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    console.log('is Logged in: ', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: () => setIsLoggedIn(false),
        onLogIn: () => setIsLoggedIn(true),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
