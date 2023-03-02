import { Fragment, useState } from 'react';
import * as ReactDOM from 'react-dom';
import Card from '../Card/Card';
import './Modal.scss';

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  const [isBackdropClicked, setIsBackdropClicked] = useState<boolean>(false);

  const backdropClickHandler = () => {
    setIsBackdropClicked(true);
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Fragment>
          {!isBackdropClicked && (
            <Fragment>
              <div className="backdrop" onClick={backdropClickHandler}></div>
              <div className="modal">
                <Card>{children}</Card>
              </div>
            </Fragment>
          )}
        </Fragment>,
        document.getElementById('modal-root') as HTMLElement
      )}
    </Fragment>
  );
};

export default Modal;
