import { ReactNode } from 'react';
import './Button.scss';

interface Props {
  children: ReactNode;
}

const Button = ({ children }: Props) => {
  return <button className="button">{children}</button>;
};

export default Button;
