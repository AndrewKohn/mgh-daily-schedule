import './Header.scss';
import {
  BsArrowLeftSquareFill,
  BsChevronLeft,
  BsFillCaretRightFill,
} from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import StaffShiftContext from '../../store/StaffShiftContext';
import { Link } from 'react-router-dom';

interface Props {}

const Header = ({}: Props) => {
  const staffShiftContext = useContext(StaffShiftContext);

  // House Buttons
  const changeCVHouseButtonColor = (currentHouse: boolean) => {
    return currentHouse ? 'house-button selected-house' : 'house-button';
  };

  const changeWLHouseButtonColor = (currentHouse: boolean) => {
    return !currentHouse ? 'house-button selected-house' : 'house-button';
  };

  const changeArrowDirection = (currentHouse: boolean) => {
    return currentHouse ? 'icon left-icon' : 'icon';
  };

  // Shift Buttons
  const changeDayShiftButtonColor = (currentShift: boolean) => {
    return currentShift ? 'shift-button selected-shift' : 'shift-button';
  };

  const changeNightShiftButtonColor = (currentShift: boolean) => {
    return !currentShift ? 'shift-button selected-shift' : 'shift-button';
  };

  useEffect(() => {
    // Adjust favicon by shift
    staffShiftContext.isDayShift
      ? document
          .getElementById('favicon')
          ?.setAttribute('href', './src/icons/sun.png')
      : document
          .getElementById('favicon')
          ?.setAttribute('href', './src/icons/moon.png');

    // Adjust page title by house
    staffShiftContext.isClearViewHouse
      ? staffShiftContext.isDayShift
        ? (document.title = 'Clearview Day Schedule')
        : (document.title = 'Clearview Night Schedule')
      : staffShiftContext.isDayShift
      ? (document.title = 'Williston Day Schedule')
      : (document.title = 'Williston Night Schedule');
  }, [staffShiftContext.isClearViewHouse, staffShiftContext.isDayShift]);

  return (
    <header>
      <Link to="/">
        <BsArrowLeftSquareFill className="back-icon" />
      </Link>
      <div className="primary-heading-container">
        <h1>Morning Glory Homes</h1>
        <p>Daily schedule</p>
      </div>

      <div className="house-button-wrapper">
        <button
          onClick={staffShiftContext.onHouseChange}
          className={changeCVHouseButtonColor(
            staffShiftContext.isClearViewHouse
          )}
        >
          <span>Clearview</span>
        </button>
        <button
          onClick={staffShiftContext.onHouseChange}
          className="house-button"
        >
          <BsFillCaretRightFill
            className={changeArrowDirection(staffShiftContext.isClearViewHouse)}
          />
        </button>
        <button
          onClick={staffShiftContext.onHouseChange}
          className={changeWLHouseButtonColor(
            staffShiftContext.isClearViewHouse
          )}
        >
          <span>Williston</span>
        </button>
      </div>

      <div className="shift-button-wrapper">
        <button
          onClick={staffShiftContext.onStaffShiftChange}
          className={changeDayShiftButtonColor(staffShiftContext.isDayShift)}
        >
          Day Shift
        </button>
        <button
          onClick={staffShiftContext.onStaffShiftChange}
          className={changeNightShiftButtonColor(staffShiftContext.isDayShift)}
        >
          Night Shift
        </button>
      </div>
    </header>
  );
};

export default Header;
