import { ReactNode } from 'react';
import './Button.scss';

interface Props {
  children?: ReactNode;
  buttonType?: any;
  buttonHandler?: () => void;
}

const Button = ({ children, buttonType, buttonHandler }: Props) => {
  return (
    <button className="button" type={buttonType} onClick={buttonHandler}>
      {children}
    </button>
  );
};

export default Button;
