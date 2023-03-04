import { Fragment, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import Card from '../Card/Card';
import './Modal.scss';

interface Props {
  isVisible?: boolean;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>> | any;
  children: React.ReactNode;
}

const Modal = ({ isVisible, setIsVisible, children }: Props) => {
  const [isBackdropClicked, setIsBackdropClicked] = useState<boolean>(false);

  const backdropClickHandler = () => {
    setIsBackdropClicked(true);
    if (typeof isVisible === undefined || isVisible === true)
      setIsVisible(false);
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
