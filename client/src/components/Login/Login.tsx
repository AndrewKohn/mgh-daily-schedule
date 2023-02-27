import { Fragment, useContext, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
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

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    console.log(username, password);
    adminContext.onLogIn(username, password);
  };

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

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Modal>
          <form onSubmit={submitHandler} className="login-form">
            <div className="username-container">
              <label htmlFor="username">Username</label>
              <input
                onChange={e => userInputChangeHandler(e.target.value)}
                onBlur={e => validateUsernameHandler(e.target.value)}
                className={isUsernameValid ? '' : 'invalid'}
                id="username"
              />
            </div>
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
            {
              // Add disable class if user/pw don't meet min requirements.
              !adminContext.isLoggedIn ? (
                <Button>Login</Button>
              ) : (
                <Button>logout</Button>
              )
            }
          </form>
        </Modal>,
        document.getElementById('modal-root') as HTMLElement
      )}
    </Fragment>
  );
};

export default Login;

// [TODO] create new modal root in html
