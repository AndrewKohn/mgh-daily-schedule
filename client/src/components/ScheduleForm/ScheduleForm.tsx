import { useEffect, useState } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import Modal from '../UI/Modal/Modal';
import './ScheduleForm.scss';

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleForm = ({ isVisible, setIsVisible }: Props) => {
  const [time, setTime] = useState<string>('');
  const [patient, setPatient] = useState<string>('');

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

  const patientNames = [
    'Adams, Dorothy',
    'Butter, Peanut',
    'Wills, Rean',
    'Hernandez, Raul',
    'James, Connor',
    'Rian, Anya',
  ];

  // useEffect(() => {
  //   console.log('time', time);
  // }, [time]);

  const setTimeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    setTime(target.value);
  };

  const setPatientHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    setPatient(target.value);
  };

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <form className="schedule-form">
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
              value={time}
              onChange={setTimeHandler}
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
              value={patient}
              onChange={setPatientHandler}
            >
              {patientNames.map((name: string, key: number) => (
                <option key={key}>{name}</option>
              ))}
            </select>
            <button className="icon icon--add" type="button">
              <FcCheckmark />
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
