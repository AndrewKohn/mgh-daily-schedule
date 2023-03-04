import { Fragment, useContext, useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import AdminContext from '../../store/AdminContext';
import ScheduleForm from '../ScheduleForm/ScheduleForm';
import './ScheduleList.scss';
import ScheduleListItem from './ScheduleListItem';

interface Props {}

const ScheduleList = ({}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const adminContext = useContext(AdminContext);

  const showFormHandler = (e: any) => {
    setIsVisible(true);
  };

  return (
    <Fragment>
      <ul className="schedule-list">
        <span className="list-headings">
          <p>Time</p>
          <p>Patient</p>
          <p>Activity</p>
          <p>&nbsp;</p>
        </span>
        <ScheduleListItem />
      </ul>
      {adminContext.isLoggedIn && (
        <button className="add-icon-container" onClick={showFormHandler}>
          <BsFillPlusCircleFill className="add-icon" />
        </button>
      )}
      {isVisible && (
        <ScheduleForm isVisible={isVisible} setIsVisible={setIsVisible} />
      )}
    </Fragment>
  );
};

export default ScheduleList;
