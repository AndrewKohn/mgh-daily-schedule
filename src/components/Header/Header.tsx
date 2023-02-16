import './Header.scss';
import { BsFillCaretRightFill } from 'react-icons/bs';

interface Props {}

const Header = ({}) => {
  return (
    <header>
      <div className="primary-heading-container">
        <h1>Morning Glory Homes</h1>
        <p>Daily schedule</p>
      </div>

      <div className="house-button-wrapper">
        <button>
          <span>Clearview</span>
        </button>
        <button>
          <BsFillCaretRightFill className="icon" />
        </button>
        <button>
          <span>Williston</span>
        </button>
      </div>

      <div className="shift-button-wrapper">
        <button>Day Shift</button>
        <button>Night Shift</button>
      </div>
    </header>
  );
};

export default Header;
