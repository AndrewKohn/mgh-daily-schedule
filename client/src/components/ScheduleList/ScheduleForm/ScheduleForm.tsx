import { useEffect, useState } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';
import Modal from '../../UI/Modal/Modal';
import './ScheduleForm.scss';
import optionTimes from '../../../store/OptionTimes';

// [TODO]
// Tests:
// getMilitaryTime(), Add/remove patient functions, form submission

interface Props {
  submitFormHandler: (
    e: any,
    patientName: string,
    activityTime: number,
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
  let patientNames = [
    'Adams, Dorothy',
    'Butter, Peanut',
    'Wills, Rean',
    'Hernandez, Raul',
    'James, Connor',
    'Rian, Anya',
  ];
  const [activityTime, setActivityTime] = useState<number>(0);
  const [patientName, setPatientName] = useState<string>(patientNames[0]);
  const [activityTitle, setActivityTitle] = useState<string>('');
  const [activityNote, setActivityNote] = useState<string>('');
  const [isImportant, setIsImportant] = useState<boolean>(false);

  const getMilitaryTime = (selectedTime: string) => {
    const time = selectedTime.split('');

    if (time.length > 3) {
      if (selectedTime === '12AM') return setActivityTime(0);

      time[2] + time[3] === 'PM' && time[0] + time[1] !== '12'
        ? setActivityTime(Number(time[0] + time[1]) + 12)
        : setActivityTime(Number(time[0] + time[1]));
    } else {
      time[1] + time[2] === 'PM'
        ? setActivityTime(Number(time[0]) + 12)
        : setActivityTime(Number(time[0]));
    }
  };

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <form
        onSubmit={e => {
          submitFormHandler(
            e,
            patientName,
            activityTime,
            activityTitle,
            isImportant,
            activityNote
          );
          setIsVisible(false);
        }}
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
              onChange={e => {
                getMilitaryTime(e.target.value);
              }}
              autoFocus
              required
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
              required
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
            required
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
