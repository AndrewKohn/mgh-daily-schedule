import { Fragment, useContext, useEffect, useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import AdminContext from '../../store/AdminContext';
import ScheduleForm from './ScheduleForm/ScheduleForm';
import './ScheduleList.scss';
import ScheduleListItem from './ScheduleListItem';
import ScheduleItem from '../../store/ScheduleListModel';
import axios from 'axios';
import StaffShiftContext from '../../store/StaffShiftContext';
import Patient from '../../store/PatientModel';

interface Props {
  scheduleItemsData: ScheduleItem[];
  DBPath: string;
  patientsData: Patient[];
}

const ScheduleList = ({ scheduleItemsData, DBPath, patientsData }: Props) => {
  const adminContext = useContext(AdminContext);
  const { isDayShift } = useContext(StaffShiftContext);
  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
  const [scheduleItem, setScheduleItem] = useState<ScheduleItem | undefined>(
    undefined
  );
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [sortedScheduleItems, setSortedScheduleItems] = useState<
    ScheduleItem[]
  >([]);
  const [idCount, setIdCount] = useState<number>(1);

  const sortByTime = () => {
    const dayShiftStart = '7';
    const nightShiftStart = '19';
    const newArray = [...scheduleItems].sort(
      (first, second) => first.activityTime - second.activityTime
    );
    let newArrayIndex = -1;

    // Get the first index of the sorted array that begins with the startTime
    for (let i = 0; i < newArray.length; i++) {
      if (
        newArray[i].activityTime
          .toString()
          .startsWith(isDayShift ? dayShiftStart : nightShiftStart)
      ) {
        newArrayIndex = i;
        break;
      }
    }
    // Sort the schedule items by time
    return newArray
      .slice(newArrayIndex)
      .concat(newArray.slice(0, newArrayIndex));
  };

  const highlightShiftTimes = (scheduleItem: ScheduleItem) => {
    if (
      isDayShift &&
      scheduleItem.activityTime >= 7 &&
      scheduleItem.activityTime < 19
    )
      return 'highlight--day';

    if (
      (!isDayShift && scheduleItem.activityTime < 7) ||
      (!isDayShift && scheduleItem.activityTime >= 19)
    )
      return 'highlight--night';
  };

  // Set schedule from database
  useEffect(() => {
    if (scheduleItemsData) {
      let maxId = 0;
      scheduleItemsData.forEach(scheduleItemData => {
        if (scheduleItemData.id > maxId) {
          maxId = scheduleItemData.id;
        }
      });
      setIdCount(maxId + 1);
      setScheduleItems(scheduleItemsData);
    }
  }, [scheduleItemsData]);

  // Sorts list by time
  useEffect(() => {
    setSortedScheduleItems(sortByTime());
  }, [scheduleItems, isDayShift]);

  // Adds new schedule items
  useEffect(() => {
    if (scheduleItem) {
      setScheduleItems(prevState => [...prevState, scheduleItem]);
    }
  }, [scheduleItem]);

  const submitFormPostHandler = (
    e: React.FormEvent<HTMLFormElement>,
    patientName: string,
    activityTime: number,
    activityTitle: string,
    isImportant: number,
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

    try {
      axios.post(`http://75.72.55.128:59640${DBPath}`, {
        id: idCount,
        patientName: patientName,
        activityTime: activityTime,
        activityTitle: activityTitle,
        activityNote: activityNote,
        isImportant: isImportant,
      });
    } catch (err) {
      console.log(err);
    }

    setIdCount(prevCount => prevCount++);
  };

  const submitFormPutHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    patientName: string,
    activityTime: number,
    activityTitle: string,
    isImportant: number,
    activityNote?: string,
    id?: number
  ) => {
    e.preventDefault();

    try {
      await axios.put(`http://75.72.55.128:59640${DBPath}/${id}`, {
        patientName: patientName,
        activityTime: activityTime,
        activityTitle: activityTitle,
        activityNote: activityNote,
        isImportant: isImportant,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const showFormHandler = (e: any) => {
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth',
    // });

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
          <ScheduleListItem
            scheduleItem={scheduleItem}
            patientsData={patientsData}
            submitFormHandler={submitFormPutHandler}
            key={key}
            // update after implementing patientHouse in db
            highlightedShift={highlightShiftTimes(scheduleItem)}
          />
        ))}
      </ul>
      {scheduleItemsData.length === 0 && adminContext.isLoggedIn && (
        <button className="add-icon-container" onClick={showFormHandler}>
          <BsFillPlusCircleFill className="add-icon" />
        </button>
      )}
      {formIsVisible && (
        <ScheduleForm
          patientsData={patientsData}
          submitFormHandler={submitFormPostHandler}
          isVisible={formIsVisible}
          setIsVisible={setFormIsVisible}
        />
      )}
    </Fragment>
  );
};

export default ScheduleList;
