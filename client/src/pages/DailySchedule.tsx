import axios from 'axios';
import { Fragment, useContext, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import ScheduleList from '../components/ScheduleList/ScheduleList';
import ScheduleItem from '../store/ScheduleListModel';
import StaffShiftContext from '../store/StaffShiftContext';
import Patient from '../store/PatientModel';

interface DBConfig {
  path: string;
  target: string;
}

const DailySchedule = ({}) => {
  const staffShiftContext = useContext(StaffShiftContext);
  const [dbData, setDBData] = useState<any>([]);
  const [dbScheduleItems, setDBScheduleItems] = useState<ScheduleItem[]>([]);
  const [clearviewDB, setClearviewDB] = useState<ScheduleItem[]>([]);
  const [willistonDB, setWillistonDB] = useState<ScheduleItem[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const clearviewConfig: DBConfig = {
    path: '/clearview',
    target: 'clearviewDailySchedule',
  };

  const willistonConfig: DBConfig = {
    path: '/williston',
    target: 'willistonDailySchedule',
  };

  const patientsConfig: DBConfig = {
    path: '/patients',
    target: 'patients',
  };

  useEffect(() => {
    // [TODO] : Maybe this might need setInterval to render update information
    getDBData(patientsConfig, patients, setPatients);

    staffShiftContext.isClearViewHouse
      ? getDBData(clearviewConfig, clearviewDB, setClearviewDB)
      : getDBData(willistonConfig, willistonDB, setWillistonDB);
  }, [staffShiftContext.isClearViewHouse, patients]);

  useEffect(() => {
    console.log('patients:', patients);
    console.log('cv:', clearviewDB);
    console.log('wl:', willistonDB);
  }, [patients, clearviewDB, willistonDB]);

  const getDBData = (
    config: DBConfig,
    state: any,
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const { path, target } = config;
    axios.get('http://localhost:3000' + path).then(res => {
      if (JSON.stringify(state) !== JSON.stringify(res.data[target]))
        setState(res.data[target]);
    });
  };

  ///////////////////////////////////////////////////////////////

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

  // Display data if present & updates upon changes
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

  //////////////////////////////////////////////////////

  return (
    <Fragment>
      <Header title="Daily" />
      <ScheduleList dbScheduleItems={dbScheduleItems} />
    </Fragment>
  );
};

export default DailySchedule;
