import jest from 'jest';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminContext, { AdminContextProvider } from './AdminContext';
import { useContext, useState } from 'react';
import ReactDOM from 'react-dom';

describe('<AdminContext />', () => {
  it('User should be logged out upon initialization', () => {
    render(
      <AdminContextProvider>
        <TestComponent username="" password="" />
      </AdminContextProvider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).toBeNull();

    expect(screen.queryByText('Logged In')).toBeNull();
    expect(screen.getByText('Logged Out')).toBeInTheDocument();
  });

  it('Can handle Login', () => {
    render(
      <AdminContextProvider>
        <TestComponent username="testLogin" password="zulu123" />
      </AdminContextProvider>
    );

    expect(screen.getByText('Logged In')).toBeInTheDocument();
    expect(screen.queryByText('Logged Out')).toBeNull();
  });
});

type TestComponentProps = {
  username: string;
  password: string;
};

const TestComponent = ({ username, password }: TestComponentProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const loginHandler = (username: string, password: string) => {
    username === 'testLogin' && password === 'zulu123'
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
  };

  const contextValues = {
    isLoggedIn: isLoggedIn,
    onLogout: () => setIsLoggedIn(false),
    onLogIn: (username: string, password: string) =>
      loginHandler(username, password),
  };
  const adminContext = useContext(AdminContext);

  return (
    <AdminContext.Provider value={contextValues}>
      <div>
        {adminContext.isLoggedIn ? <p>Logged In</p> : <p>Logged Out</p>}
        {adminContext.isLoggedIn ? (
          <button onClick={adminContext.onLogout}>Logout</button>
        ) : (
          <button onClick={loginHandler}>Login</button>
        )}
      </div>
    </AdminContext.Provider>
  );
};
