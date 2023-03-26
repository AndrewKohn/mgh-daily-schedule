import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import ScheduleList from '../components/ScheduleList/ScheduleList';
import ScheduleItem from '../store/ScheduleListModel';

interface Props {}

const DailySchedule = ({}) => {
  const [dbData, setDBData] = useState<any>([]);
  const [dbScheduleItems, setDBScheduleItems] = useState<ScheduleItem[]>([]);
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
    axios
      .get('http://localhost:3000/daily_schedule')
      .then(res => setDBData(res.data.dailySchedules));
    // try {
    //   axios.post('http://localhost:3000/daily_schedule', {
    //     patientName: 'string 3',
    //     activityTime: 22,
    //     activityTitle: 'my TItle',
    //     activityNote: 'notey mcnoteface',
    //     isImportant: 0,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  }, []);

  useEffect(() => {
    if (dbData) {
      dbData.map((data: any) => {
        setDBScheduleItems(prevState => [
          ...prevState,
          {
            id: data.id,
            patientName: data.patient_name,
            activityTime: data.activity_time,
            activityTitle: data.activity_title,
            activityNote: data.activity_note,
            isImportant: data.is_important,
            isComplete: false,
            isEdit: false,
          },
        ]);
      });
    }
  }, [dbData]);

  useEffect(() => {
    console.log(`item data:  COUNT = ${dbScheduleItems.length}`);
    dbScheduleItems.map(data => console.log(data));
  }, [dbScheduleItems]);

  return (
    <Fragment>
      <Header title="Daily" />
      <ScheduleList
        dbScheduleItems={dbScheduleItems}
        setDBScheduleItems={setDBScheduleItems}
      />
    </Fragment>
  );
};

export default DailySchedule;
