import { useEffect, useState, useContext } from 'react';
import Modal from '../../UI/Modal/Modal';
import './ScheduleForm.scss';
import optionTimes from '../../../store/OptionTimes';
import ScheduleItem from '../../../store/ScheduleListModel';
import Patient from '../../../store/PatientModel';
import StaffShiftContext from '../../../store/StaffShiftContext';

interface Props {
  submitFormHandler: (
    e: any,
    patientName: string,
    activityTime: number,
    activityTitle: string,
    isImportant: number,
    activityNote?: string,
    id?: number
  ) => void;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  scheduleItem?: ScheduleItem;
  patientsData: Patient[];
}

const ScheduleForm = ({
  submitFormHandler,
  isVisible,
  setIsVisible,
  scheduleItem,
  patientsData,
}: Props) => {
  const staffShiftContext = useContext(StaffShiftContext);
  let patientNames = patientsData
    .map((patient: Patient) => {
      if (staffShiftContext.isClearViewHouse) {
        if (patient.patientResidence === 'clearview' && patient.isActive)
          return patient.patientName;
      }
      if (!staffShiftContext.isClearViewHouse) {
        if (patient.patientResidence === 'williston' && patient.isActive)
          return patient.patientName;
      }
    })
    .filter((name): name is string => name !== undefined);
  const [activityTime, setActivityTime] = useState<number>(0);
  const [patientName, setPatientName] = useState<string>(patientNames[0]);
  const [activityTitle, setActivityTitle] = useState<string>('');
  const [activityNote, setActivityNote] = useState<string | undefined>('');
  const [isImportant, setIsImportant] = useState<number>(0);
  const [id, setId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (scheduleItem) {
      setId(scheduleItem.id);
      setActivityTime(scheduleItem.activityTime);
      setPatientName(scheduleItem.patientName);
      setActivityTitle(scheduleItem.activityTitle);
      setActivityNote(scheduleItem.activityNote);
      setIsImportant(scheduleItem.isImportant);
    }
  }, []);

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

  const getActivityTimeEdit = (time: number) => {
    if (time === 0) return '12AM';
    if (time < 12) return time + 'AM';
    if (time >= 12) return time - 12 + 'PM';
  };

  const transformTextAreaContent = (textAreaContent: string | undefined) => {
    if (textAreaContent !== undefined) {
      const splitTextContent = textAreaContent.split('');
      let modifiedTextContent: string[] = [];
      for (let i = 0; i < splitTextContent.length; i++) {
        if (splitTextContent[i] === "'") {
          modifiedTextContent.push('\\');
        }

        modifiedTextContent.push(splitTextContent[i]);
      }

      return modifiedTextContent.join('');
    }
  };

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <form
        onSubmit={e => {
          scheduleItem
            ? submitFormHandler(
                e,
                patientName,
                activityTime,
                activityTitle,
                isImportant,
                transformTextAreaContent(activityNote),
                id
              )
            : submitFormHandler(
                e,
                patientName,
                activityTime,
                activityTitle,
                isImportant,
                transformTextAreaContent(activityNote)
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
              value={getActivityTimeEdit(activityTime)}
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
          </div>
          <div className="form--selection-wrapper">
            <label htmlFor="activity-importance">Important</label>
            <input
              id="activity-importance"
              className="important-checkbox"
              type="checkbox"
              checked={isImportant === 1 ? true : false}
              value={scheduleItem ? isImportant : ''}
              onChange={e => setIsImportant(e.target.checked === true ? 1 : 0)}
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
