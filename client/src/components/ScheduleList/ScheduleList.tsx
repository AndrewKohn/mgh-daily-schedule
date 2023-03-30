import { Fragment, useContext, useEffect, useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import AdminContext from '../../store/AdminContext';
import ScheduleForm from './ScheduleForm/ScheduleForm';
import './ScheduleList.scss';
import ScheduleListItem from './ScheduleListItem';
import ScheduleItem from '../../store/ScheduleListModel';

let idCount: number = 1;
interface Props {
  dbScheduleItems: ScheduleItem[];
}

const ScheduleList = ({ dbScheduleItems }: Props) => {
  const adminContext = useContext(AdminContext);
  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
  const [scheduleItem, setScheduleItem] = useState<ScheduleItem | undefined>(
    undefined
  );
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [sortedScheduleItems, setSortedScheduleItems] = useState<
    ScheduleItem[]
  >([]);

  const sortByTime = () => {
    return [...scheduleItems].sort(
      (first, second) => first.activityTime - second.activityTime
    );
  };

  // Set schedule from database
  useEffect(() => {
    if (dbScheduleItems) {
      dbScheduleItems.map(dbScheduleItem => {
        while (idCount === dbScheduleItem.id) {
          idCount++;
        }
        setScheduleItems(prevState => [...prevState, dbScheduleItem]);
      });
    }
  }, [dbScheduleItems]);

  // Sorts list by time
  useEffect(() => {
    setSortedScheduleItems(sortByTime());
  }, [scheduleItems]);

  // Adds new schedule items
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

  const showFormHandler = (e: any) => {
    setFormIsVisible(true);
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
        {sortedScheduleItems.map((scheduleItem: ScheduleItem, key: number) => (
          <ScheduleListItem scheduleItem={scheduleItem} key={key} />
        ))}
      </ul>
      {adminContext.isLoggedIn && (
        <button className="add-icon-container" onClick={showFormHandler}>
          <BsFillPlusCircleFill className="add-icon" />
        </button>
      )}
      {formIsVisible && (
        <ScheduleForm
          submitFormHandler={submitFormHandler}
          isVisible={formIsVisible}
          setIsVisible={setFormIsVisible}
        />
      )}
    </Fragment>
  );
};

export default ScheduleList;
