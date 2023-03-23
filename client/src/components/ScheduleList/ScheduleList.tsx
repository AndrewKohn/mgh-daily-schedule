import { Fragment, useContext, useEffect, useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import AdminContext from '../../store/AdminContext';
import ScheduleForm from './ScheduleForm/ScheduleForm';
import './ScheduleList.scss';
import ScheduleListItem from './ScheduleListItem';
import ScheduleItem from '../../store/ScheduleListModel';

let idCount: number = 0;
interface Props {}

const ScheduleList = ({}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const adminContext = useContext(AdminContext);
  const [scheduleItem, setScheduleItem] = useState<ScheduleItem | undefined>(
    undefined
  );
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);

  useEffect(() => console.log(scheduleItems), [scheduleItems]);

  const showFormHandler = (e: any) => {
    setIsVisible(true);
  };

  useEffect(() => {
    if (scheduleItem) {
      setScheduleItems(prevState => [...prevState, scheduleItem]);
    }
  }, [scheduleItem]);

  const submitFormHandler = (
    e: React.FormEvent<HTMLFormElement>,
    patientName: string,
    activityTime: number,
    activityTitle: string,
    isImportant: boolean,
    activityNote?: string
  ) => {
    e.preventDefault();

    setScheduleItem({
      id: idCount,
      patientName: patientName,
      activityTime: activityTime,
      activityTitle: activityTitle,
      activityNote: activityNote,
      isImportant: isImportant,
      isComplete: false,
      isEdit: false,
    });

    idCount++;
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
        {scheduleItems.map((scheduleItem: ScheduleItem, key: number) => (
          <ScheduleListItem scheduleItem={scheduleItem} key={key} />
        ))}
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
