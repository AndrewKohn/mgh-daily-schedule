import './ScheduleList.scss';
import ScheduleListItem from './ScheduleListItem';

interface Props {}

const ScheduleList = ({}) => {
  return (
    <ul className="schedule-list">
      <span className="list-headings">
        <p>Time</p>
        <p>Patient</p>
        <p>Activity</p>
        <p>&nbsp;</p>
      </span>
      <ScheduleListItem />
    </ul>
  );
};

export default ScheduleList;
