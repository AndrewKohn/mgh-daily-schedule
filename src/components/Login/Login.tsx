import { Fragment, useContext } from 'react';
import * as ReactDOM from 'react-dom';
import AdminContext from '../../store/AdminContext';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import './Login.scss';

interface Props {}

const Login = ({}) => {
  const adminContext = useContext(AdminContext);

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Modal>
          <form onSubmit={submitHandler} className="login-form">
            <div className="username-container">
              <label htmlFor="username">Username</label>
              <input id="username" />
            </div>
            <div className="password-container">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" />
            </div>
            <Button>Submit</Button>
          </form>
        </Modal>,
        document.getElementById('modal-root') as HTMLElement
      )}
    </Fragment>
  );
};

export default Login;

// [TODO] create new modal root in html
