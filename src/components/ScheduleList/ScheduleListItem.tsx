import './ScheduleListItem.scss';

interface Props {}

const ScheduleListItem = ({}) => {
  return (
    <li>
      <span>
        <p>10:45</p>
      </span>
      <span>
        <p>Doe, J</p>
      </span>
      <span>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe maxime
          sequi porro accusamus rem nulla, voluptatibus possimus, earum, est
          dicta fugit sit quia et. Dolor laborum explicabo iure excepturi
          sapiente.
        </p>
      </span>
      <span>
        <input className="checkbox" type="checkbox" />
      </span>
    </li>
  );
};

export default ScheduleListItem;
