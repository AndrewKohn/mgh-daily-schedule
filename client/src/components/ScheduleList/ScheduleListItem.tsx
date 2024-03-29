import { Fragment, useContext, useState } from 'react';
import { BsFillExclamationCircleFill, BsPencilSquare } from 'react-icons/bs';
import './ScheduleListItem.scss';
import ScheduleItem from '../../store/ScheduleListModel';
import AdminContext from '../../store/AdminContext';
import optionTimes from '../../store/OptionTimes';
import ScheduleForm from './ScheduleForm/ScheduleForm';
import Patient from '../../store/PatientModel';
// import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import profileImageSm1 from '../../assets/profile/man-1-sm.webp'; // TODO: Add to public dir & Add relative path to sql db

interface Props {
  scheduleItem: ScheduleItem;
  patientsData: Patient[];
  submitFormHandler: (
    e: React.FormEvent<HTMLFormElement>,
    patientName: string,
    activityTime: number,
    activityTitle: string,
    isImportant: number,
    activityNote?: string,
    id?: number
  ) => Promise<void>;
  highlightedShift?: string;
}

const ScheduleListItem = ({
  scheduleItem,
  patientsData,
  submitFormHandler,
  highlightedShift,
}: Props) => {
  const adminContext = useContext(AdminContext);
  const [editScheduleItem, setEditScheduleItem] = useState<boolean>(false);

  const editButtonHandler = () => {
    setEditScheduleItem(true);
  };

  const activityImportance = () => {
    return scheduleItem?.isImportant ? (
      <span className="important">
        <BsFillExclamationCircleFill />
      </span>
    ) : (
      ''
    );
  };

  const activityAction = () => {
    return adminContext.isLoggedIn ? (
      <button className="edit-button" onClick={editButtonHandler}>
        <div className="edit-icon">
          <BsPencilSquare />
        </div>
      </button>
    ) : (
      <input
        className="checkbox"
        type="checkbox"
        defaultChecked={scheduleItem?.isComplete}
      />
    );
  };

  return (
    <Fragment>
      <li className={`schedule-list-item ${highlightedShift}`}>
        <span className="schedule-list-item-information">
          <p data-testid="required-time">
            {optionTimes[scheduleItem?.activityTime]}
          </p>

          <div className="patient-profile">
            {adminContext.isLoggedIn ? (
              <img
                className="profile-picture"
                src={profileImageSm1}
                alt="man-1 profile picture "
              />
            ) : (
              <CgProfile className="profile-picture" />
            )}

            <p data-testid="required-name">{scheduleItem?.patientName}</p>
          </div>
          {scheduleItem.activityNote !== undefined &&
          scheduleItem.activityNote.length > 0 ? (
            <details className="activity-container">
              <summary
                data-testid="required-activity"
                className="activity-title"
              >
                {activityImportance()}

                {scheduleItem?.activityTitle}
              </summary>
              <p className="activity-details">{scheduleItem?.activityNote}</p>
            </details>
          ) : (
            <div className="activity-container">
              <span
                data-testid="required-activity"
                className="activity-title--without-note"
              >
                {activityImportance()}

                {scheduleItem?.activityTitle}
              </span>
            </div>
          )}

          <span className="action-container">{activityAction()}</span>
        </span>
      </li>
      {editScheduleItem && (
        <ScheduleForm
          submitFormHandler={submitFormHandler}
          isVisible={editScheduleItem}
          setIsVisible={setEditScheduleItem}
          scheduleItem={scheduleItem}
          patientsData={patientsData}
        />
      )}
    </Fragment>
  );
};

export default ScheduleListItem;
