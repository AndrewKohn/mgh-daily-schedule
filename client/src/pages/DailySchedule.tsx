import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import ScheduleList from '../components/ScheduleList/ScheduleList';

interface Props {}

const DailySchedule = ({}) => {
  const [data, setData] = useState<any>();
  // FETCH
  // useEffect(() => {
  //   async function getData() {
  //     const response = await fetch('http://localhost:3000/daily_schedule');
  //     const data = await response.json();

  //     console.log(data.dailySchedules[4]);
  //   }

  //   getData();
  // }, []);

  // AXIOS
  useEffect(() => {
    // axios
    //   .get('http://localhost:3000/daily_schedule')
    //   .then(res => setData(res.data.dailySchedules));
    try {
      axios.post('http://localhost:3000/daily_schedule', {
        patientName: 'string 3',
        activityTime: 22,
        activityTitle: 'my TItle',
        activityNote: 'notey mcnoteface',
        isImportant: 0,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  return (
    <Fragment>
      <Header title="Daily" />
      <ScheduleList />
    </Fragment>
  );
};

export default DailySchedule;
