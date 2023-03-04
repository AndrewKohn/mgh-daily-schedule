import { useEffect, useState } from 'react';
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
      <form>
        <h2>New Activity</h2>
        <label htmlFor="time">Time</label>
        <select
          id="time"
          name="time"
          value={time}
          onChange={setTimeHandler}
          autoFocus
        >
          {optionTimes.map((selectedTime: string, key: number) => (
            <option key={key}>{selectedTime}</option>
          ))}
        </select>
        <label htmlFor="patient">Patient</label>
        <select
          id="patient"
          name="patient"
          value={patient}
          onChange={setPatientHandler}
        >
          {patientNames.map((name: string, key: number) => (
            <option key={key}>{name}</option>
          ))}
        </select>
        <label htmlFor="activity-title">Activity Title</label>
        <input id="activity-title" name="activity-title" type="text" />
        <label htmlFor="activity-notes">Activity Notes</label>
        <textarea id="activity-notes" name="activity-notes" />
        <button>Submit</button>
      </form>
    </Modal>
  );
};

export default ScheduleForm;
