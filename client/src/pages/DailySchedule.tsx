import { Fragment, useContext } from 'react';
import Header from '../components/Header/Header';
import Login from '../components/Login/Login';
import ScheduleList from '../components/ScheduleList/ScheduleList';
import AdminContext from '../store/AdminContext';

interface Props {}

const DailySchedule = ({}) => {
  const adminContext = useContext(AdminContext);

  return (
    <Fragment>
      <Header />
      <ScheduleList />
    </Fragment>
  );
};

export default DailySchedule;
