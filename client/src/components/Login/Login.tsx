import { useContext, useEffect, useState } from 'react';
import AdminContext from '../../store/AdminContext';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import './Login.scss';

interface Props {}

const Login = ({}) => {
  const adminContext = useContext(AdminContext);
  const [username, setUsername] = useState<string>('');
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [loginIsValid, setLoginIsValid] = useState<boolean>(false);

  useEffect(() => {
    setLoginIsValid(isUsernameValid && isPasswordValid);
  }, [username, password]);

  // Username
  const userInputChangeHandler = (userInput: string) => {
    if (userInput.length > 3) setUsername(userInput);
  };

  const validateUsernameHandler = (userInput: string) => {
    userInput.trim().length > 3
      ? setIsUsernameValid(true)
      : setIsUsernameValid(false);
  };

  // Password
  const passwordInputChangeHandler = (passwordInput: string) => {
    if (passwordInput.length > 6) setPassword(passwordInput);
  };

  const validatePasswordHandler = (passwordInput: string) => {
    passwordInput.trim().length > 5
      ? setIsPasswordValid(true)
      : setIsPasswordValid(false);
  };

  const logoutHandler = () => {
    setUsername('');
    setPassword('');
    adminContext.onLogout();
  };

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    adminContext.onLogIn(username, password);
  };

  return (
    <Modal>
      <form onSubmit={submitHandler} className="login-form">
        {!adminContext.isLoggedIn && (
          <div className="username-container">
            <label htmlFor="username">Username</label>
            <input
              onChange={e => userInputChangeHandler(e.target.value)}
              onBlur={e => validateUsernameHandler(e.target.value)}
              className={isUsernameValid ? '' : 'invalid'}
              id="username"
              autoFocus
            />
          </div>
        )}
        {!adminContext.isLoggedIn && (
          <div className="password-container">
            <label htmlFor="password">Password</label>
            <input
              onChange={e => {
                passwordInputChangeHandler(e.target.value);
              }}
              onBlur={e => validatePasswordHandler(e.target.value)}
              className={isPasswordValid ? '' : 'invalid'}
              id="password"
              type="password"
            />
          </div>
        )}

        {
          // Add disable class if user/pw don't meet min requirements.
          !adminContext.isLoggedIn ? (
            <Button buttonType="submit">Login</Button>
          ) : (
            <Button buttonType="button" buttonHandler={logoutHandler}>
              Logout
            </Button>
          )
        }
      </form>
    </Modal>
  );
};

export default Login;
