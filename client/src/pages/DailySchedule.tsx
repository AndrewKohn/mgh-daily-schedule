import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import ScheduleList from '../components/ScheduleList/ScheduleList';
import ScheduleItem from '../store/ScheduleListModel';

const DailySchedule = ({}) => {
  const [dbData, setDBData] = useState<any>([]);
  const [dbScheduleItems, setDBScheduleItems] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    // Initial GET
    axios.get('http://localhost:3000/daily_schedule').then(res => {
      const newDbData = res.data.dailySchedules;
      if (JSON.stringify(dbData) !== JSON.stringify(newDbData)) {
        setDBData(newDbData);
      }
    });

    // Set state if there are changes
    const intervalDBGet = setInterval(() => {
      axios.get('http://localhost:3000/daily_schedule').then(res => {
        const newDbData = res.data.dailySchedules;
        if (JSON.stringify(dbData) !== JSON.stringify(newDbData)) {
          setDBData(newDbData);
        }
      });
    }, 1000);

    return () => clearInterval(intervalDBGet);
  }, [dbData]);

  useEffect(() => {
    if (dbData.length > 0) {
      const newDbScheduleItems = dbData.map((data: any) => ({
        id: data.id,
        patientName: data.patient_name,
        activityTime: data.activity_time,
        activityTitle: data.activity_title,
        activityNote: data.activity_note,
        isImportant: data.is_important,
        isComplete: false,
        isEdit: false,
      }));
      setDBScheduleItems([...newDbScheduleItems]);
    }
  }, [dbData]);

  return (
    <Fragment>
      <Header title="Daily" />
      <ScheduleList dbScheduleItems={dbScheduleItems} />
    </Fragment>
  );
};

export default DailySchedule;
