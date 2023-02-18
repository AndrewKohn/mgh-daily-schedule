import './ScheduleListItem.scss';
import { BsFillCaretRightFill } from 'react-icons/bs';

interface Props {}

const ScheduleListItem = ({}) => {
  return (
    <li className="schedule-list-item">
      <span className="schedule-list-item-information">
        <p>10AM</p>
        <p>Doe, Jane</p>
        <details className="activity-container">
          <summary className="activity-title">Activity Title</summary>
          <p className="activity-details">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut
            consequuntur odit nemo repudiandae. Deserunt numquam nulla qui error
            ipsum, quas maiores quasi asperiores odio labore aliquid unde facere
            at tenetur.
          </p>
        </details>
        <span className="checkbox-container">
          <input className="checkbox" type="checkbox" />
        </span>
      </span>
    </li>
  );
};

export default ScheduleListItem;
