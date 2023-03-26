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
  setDBScheduleItems: React.Dispatch<React.SetStateAction<ScheduleItem[]>>;
}

const ScheduleList = ({ dbScheduleItems, setDBScheduleItems }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const adminContext = useContext(AdminContext);
  const [scheduleItem, setScheduleItem] = useState<ScheduleItem | undefined>(
    undefined
  );
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [sortedScheduleItems, setSortedScheduleItems] = useState<
    ScheduleItem[]
  >([]);

  const sortByTime = () => {
    return [...scheduleItems].sort((a, b) => a.activityTime - b.activityTime);
  };

  useEffect(() => {
    setSortedScheduleItems(sortByTime());
  }, [scheduleItems]);

  useEffect(() => {
    console.log(sortedScheduleItems[2]);
  }, [sortedScheduleItems]);

  // Set schedule from database
  useEffect(() => {
    if (dbScheduleItems) {
      dbScheduleItems.map(dbScheduleItem => {
        while (idCount === dbScheduleItem.id) {
          idCount++;
          console.log(idCount, dbScheduleItem.id);
        }
        setScheduleItems(prevState => [...prevState, dbScheduleItem]);
      });
    }
  }, [dbScheduleItems]);

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
        {sortedScheduleItems.map((scheduleItem: ScheduleItem, key: number) => (
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
