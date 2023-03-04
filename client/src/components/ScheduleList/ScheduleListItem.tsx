import { useContext, useEffect, useState } from 'react';
import { BsFillExclamationCircleFill, BsPencilSquare } from 'react-icons/bs';
import './ScheduleListItem.scss';
import ScheduleItem from '../../store/ScheduleListModel';
import AdminContext from '../../store/AdminContext';

interface Props {}

const ScheduleListItem = ({}) => {
  const [scheduleItem, setScheduleItem] = useState<ScheduleItem>();
  const adminContext = useContext(AdminContext);

  useEffect(() => {
    setScheduleItem({
      id: 11,
      patientName: 'Dane Joe',
      activityTime: 9,
      activityTitle: 'Medication Administration',
      activityNote:
        'Insulin instructions...  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut consequuntur odit nemo repudiandae. Deserunt numquam nulla qui error ipsum, quas maiores quasi asperiores odio labore aliquid unde facere at tenetur.',
      isImportant: true,
      isComplete: false,
      isEdit: false,
    });
  }, []);

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
        <p data-testid="required-time">{scheduleItem?.activityTime}AM</p>
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
