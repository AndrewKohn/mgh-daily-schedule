import { Fragment } from 'react';
import Header from '../components/Header/Header';
import ScheduleList from '../components/ScheduleList/ScheduleList';

interface Props {}

const DailySchedule = ({}) => {
  return (
    <Fragment>
      <Header title="Daily" />
      <ScheduleList />
    </Fragment>
  );
};

export default DailySchedule;
