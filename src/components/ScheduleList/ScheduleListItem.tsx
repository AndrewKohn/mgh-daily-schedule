import './ScheduleListItem.scss';

interface Props {}

const ScheduleListItem = ({}) => {
  return (
    <li className="schedule-list-item">
      <span className="schedule-list-item-information">
        <p>10AM</p>
        <p>Doe, Jane</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quam
          atque eaque laborum delectus nihil illum sed similique eos,
          reprehenderit hic ullam minus labore libero possimus? Accusantium
          rerum similique nisi!
        </p>
        <span>
          <input className="checkbox" type="checkbox" />
        </span>
      </span>
    </li>
  );
};

export default ScheduleListItem;
