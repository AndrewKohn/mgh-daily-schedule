import { Fragment, useContext, useEffect, useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import AdminContext from '../../store/AdminContext';
import ScheduleForm from '../ScheduleForm/ScheduleForm';
import './ScheduleList.scss';
import ScheduleListItem from './ScheduleListItem';
import ScheduleItem from '../../store/ScheduleListModel';

interface Props {}

const ScheduleList = ({}) => {
  let idCount: number = 0;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const adminContext = useContext(AdminContext);
  const [scheduleItem, setScheduleItem] = useState<ScheduleItem | undefined>(
    undefined
  );

  useEffect(() => console.log(scheduleItem), []);

  const showFormHandler = (e: any) => {
    setIsVisible(true);
  };

  const submitFormHandler = (
    e: any,
    patientName: string,
    activityTime: string,
    activityTitle: string,
    isImportant: boolean,
    activityNote?: string
  ) => {
    e.preventDefault();

    // setScheduleItem({
    //   id: idCount++,
    //   patientName: patientName,
    //   activityTime: time,
    //   activityTitle: activityTitle,
    //   activityNote: activityNote,
    //   isImportant: isImportant,
    //   isComplete: false,
    //   isEdit: false,
    // });

    // [TODO]
    // activityTime length can be 3 or 4.
    console.log(activityTime);
  };

  useEffect(() => console.log(scheduleItem), [scheduleItem]);

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
        <ScheduleForm
          submitFormHandler={submitFormHandler}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
    </Fragment>
  );
};

export default ScheduleList;
