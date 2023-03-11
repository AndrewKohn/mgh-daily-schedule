import { useState } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';
import Modal from '../UI/Modal/Modal';
import './ScheduleForm.scss';

// [TODO]
// Add/Remove patient button handlers

interface Props {
  submitFormHandler: (
    e: any,
    patientName: string,
    activityTime: string,
    activityTitle: string,
    isImportant: boolean,
    activityNote?: string
  ) => void;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleForm = ({
  submitFormHandler,
  isVisible,
  setIsVisible,
}: Props) => {
  const optionTimes: string[] = [
    '12AM',
    '1AM',
    '2AM',
    '3AM',
    '4AM',
    '5AM',
    '6AM',
    '7AM',
    '8AM',
    '9AM',
    '10AM',
    '11AM',
    '12PM',
    '1PM',
    '2PM',
    '3PM',
    '4PM',
    '5PM',
    '6PM',
    '7PM',
    '8PM',
    '9PM',
    '10PM',
    '11PM',
  ];

  let patientNames = [
    'Adams, Dorothy',
    'Butter, Peanut',
    'Wills, Rean',
    'Hernandez, Raul',
    'James, Connor',
    'Rian, Anya',
  ];

  const [activityTime, setActivityTime] = useState<string>(optionTimes[0]);
  const [patientName, setPatientName] = useState<string>(patientNames[0]);
  const [activityTitle, setActivityTitle] = useState<string>('');
  const [activityNote, setActivityNote] = useState<string>('');
  const [isImportant, setIsImportant] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log('time', time);
  // }, [time]);

  // const setActivityTimeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
  //   const target = e.target as HTMLSelectElement;
  //   setActivityTime(Number(target.value));
  // };

  // const setPatientNameHandler = (e: React.FormEvent<HTMLSelectElement>) => {
  //   const target = e.target as HTMLSelectElement;
  //   setPatientName(target.value);
  // };

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <form
        onSubmit={e =>
          submitFormHandler(
            e,
            patientName,
            activityTime,
            activityTitle,
            isImportant,
            activityNote
          )
        }
        className="schedule-form"
      >
        <h2 className="form-title">New Activity</h2>
        <div className="form--input-container">
          <div className="form--selection-wrapper">
            <label className="form--label" htmlFor="time">
              Time
            </label>
            <select
              id="time"
              name="time"
              className="form--input-select"
              value={activityTime}
              onChange={e => setActivityTime(e.target.value)}
              autoFocus
            >
              {optionTimes.map((selectedTime: string, key: number) => (
                <option key={key}>{selectedTime}</option>
              ))}
            </select>
          </div>
          <div className="form--selection-wrapper">
            <label className="form--label" htmlFor="patient">
              Patient
            </label>
            <select
              id="patient"
              name="patient"
              className="form--input-select"
              value={patientName}
              onChange={e => setPatientName(e.target.value)}
            >
              {patientNames.map((name: string, key: number) => (
                <option key={key}>{name}</option>
              ))}
            </select>
            <button className="icon icon--add" type="button">
              <IoMdAddCircleOutline />
            </button>
            <button className="icon icon--delete" type="button">
              <IoMdRemoveCircleOutline />
            </button>
          </div>
          <div className="form--selection-wrapper">
            <label htmlFor="activity-importance">Important</label>
            <input
              id="activity-importance"
              className="important-checkbox"
              type="checkbox"
              checked={isImportant}
              onChange={e => setIsImportant(e.target.checked)}
            />
          </div>
        </div>
        <div className="form--input-wrapper">
          <label className="form--label" htmlFor="activity-title">
            Activity Title
          </label>
          <input
            className="form--input"
            id="activity-title"
            name="activity-title"
            type="text"
            value={activityTitle}
            onChange={e => setActivityTitle(e.target.value)}
          />
        </div>
        <div className="form--input-wrapper">
          <label className="form--label" htmlFor="activity-notes">
            Activity Notes
          </label>
          <textarea
            className="form--input-textarea"
            id="activity-notes"
            name="activity-notes"
            value={activityNote}
            onChange={e => setActivityNote(e.target.value)}
          />
        </div>
        <button className="form--button" type="submit">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default ScheduleForm;
