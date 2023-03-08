import './CalendarTiles.scss';

interface Props {}

const CalendarTiles = ({}) => {
  return (
    <div className="square">
      <p className="day">13</p>
      <div className="triangle"></div>
      <p className="assignee day-shift-assignee">EM</p>
      <p className="assignee night-shift-assignee">MK</p>
    </div>
  );
};

export default CalendarTiles;
