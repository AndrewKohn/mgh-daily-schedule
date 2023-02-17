import './Header.scss';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';

interface Props {}

const Header = ({}) => {
  const [isDayShift, setIsDayShift] = useState<boolean>(true);
  const [isClearviewHouse, setIsClearviewHouse] = useState<boolean>(true);

  // House Buttons
  const houseButtonHandler = () => {
    setIsClearviewHouse(!isClearviewHouse);
  };

  const changeCVHouseButtonColor = (selectedHouse: boolean) => {
    return isClearviewHouse ? 'house-button selected-house' : 'house-button';
  };

  const changeWLHouseButtonColor = (selectedHouse: boolean) => {
    return !isClearviewHouse ? 'house-button selected-house' : 'house-button';
  };

  const changeArrowDirection = (selectedHouse: boolean) => {
    return isClearviewHouse ? 'icon left-icon' : 'icon';
  };

  // Shift Buttons
  const shiftButtonHandler = () => {
    setIsDayShift(!isDayShift);
  };

  const changeDayShiftButtonColor = (selectedShift: boolean) => {
    return isDayShift ? 'shift-button selected-shift' : 'shift-button';
  };

  const changeNightShiftButtonColor = (selectedShift: boolean) => {
    return !isDayShift ? 'shift-button selected-shift' : 'shift-button';
  };

  useEffect(() => {
    console.log('House:', isClearviewHouse);
    console.log('day:', isDayShift);
  }, [isClearviewHouse, isDayShift]);

  return (
    <header>
      <div className="primary-heading-container">
        <h1>Morning Glory Homes</h1>
        <p>Daily schedule</p>
      </div>

      <div className="house-button-wrapper">
        <button
          onClick={houseButtonHandler}
          className={changeCVHouseButtonColor(isClearviewHouse)}
        >
          <span>Clearview</span>
        </button>
        <button onClick={houseButtonHandler} className="house-button">
          <BsFillCaretRightFill
            className={changeArrowDirection(isClearviewHouse)}
          />
        </button>
        <button
          onClick={houseButtonHandler}
          className={changeWLHouseButtonColor(isClearviewHouse)}
        >
          <span>Williston</span>
        </button>
      </div>

      <div className="shift-button-wrapper">
        <button
          onClick={shiftButtonHandler}
          className={changeDayShiftButtonColor(isDayShift)}
        >
          Day Shift
        </button>
        <button
          onClick={shiftButtonHandler}
          className={changeNightShiftButtonColor(isDayShift)}
        >
          Night Shift
        </button>
      </div>
    </header>
  );
};

export default Header;
