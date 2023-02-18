import Card from '../Card/Card';
import './Modal.scss';

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  return (
    <div className="backdrop">
      <div className="modal">
        <Card classes="card">{children}</Card>
      </div>
    </div>
  );
};

export default Modal;
