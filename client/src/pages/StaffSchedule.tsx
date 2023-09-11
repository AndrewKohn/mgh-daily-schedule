import { Fragment } from 'react';
import Calendar from '../components/Calendar/Calendar';
import Header from '../components/Header/Header';

const StaffSchedule = ({}) => {
  return (
    <Fragment>
      <Header title="Staff" />
      <Calendar />
    </Fragment>
  );
};

export default StaffSchedule;
