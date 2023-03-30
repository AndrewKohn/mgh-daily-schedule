import { useContext, useEffect, useState } from 'react';
import { BsFillExclamationCircleFill, BsPencilSquare } from 'react-icons/bs';
import './ScheduleListItem.scss';
import ScheduleItem from '../../store/ScheduleListModel';
import AdminContext from '../../store/AdminContext';
import optionTimes from '../../store/OptionTimes';

interface Props {
  scheduleItem: ScheduleItem;
}

const ScheduleListItem = ({ scheduleItem }: Props) => {
  const adminContext = useContext(AdminContext);

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
      <button className="edit-button">
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
    <li className="schedule-list-item">
      <span className="schedule-list-item-information">
        <p data-testid="required-time">
          {optionTimes[scheduleItem?.activityTime]}
        </p>
        <p data-testid="required-name">{scheduleItem?.patientName}</p>
        <details className="activity-container">
          <summary data-testid="required-activity" className="activity-title">
            {activityImportance()}

            {scheduleItem?.activityTitle}
          </summary>
          <p className="activity-details">{scheduleItem?.activityNote}</p>
        </details>
        <span className="action-container">{activityAction()}</span>
      </span>
    </li>
  );
};

export default ScheduleListItem;
