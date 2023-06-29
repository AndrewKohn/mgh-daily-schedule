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
  const [patientsDB, setPatientsDB] = useState<Patient[]>([]);
  const [clearviewSchedule, setClearviewSchedule] = useState<ScheduleItem[]>(
    []
  );
  const [willistonSchedule, setWillistonSchedule] = useState<ScheduleItem[]>(
    []
  );
  const [patients, setPatients] = useState<Patient[]>([]);

  // [TODO] : Add more configs for public test account
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
    // initial GET
    getDBData<Patient[]>(patientsConfig, patientsDB, setPatientsDB);
    getDBData<ScheduleItem[]>(clearviewConfig, clearviewDB, setClearviewDB);
    getDBData<ScheduleItem[]>(willistonConfig, willistonDB, setWillistonDB);

    // Set state if there are changes
    const intervalDBGet = setInterval(() => {
      getDBData<Patient[]>(patientsConfig, patientsDB, setPatientsDB);
      getDBData<ScheduleItem[]>(clearviewConfig, clearviewDB, setClearviewDB);
      getDBData<ScheduleItem[]>(willistonConfig, willistonDB, setWillistonDB);
    }, 1000);

    return () => clearInterval(intervalDBGet);
  }, [staffShiftContext.isClearViewHouse]);

  useEffect(() => {
    if (patientsDB.length > 0 && patients !== patientsDB)
      setPatients(transformDBData('Patient', patientsDB));
    if (clearviewDB.length > 0 && clearviewSchedule !== clearviewDB) {
      setClearviewSchedule(transformDBData('ScheduleItem', clearviewDB));
    }
    if (willistonDB.length > 0 && willistonSchedule !== willistonDB) {
      setWillistonSchedule(transformDBData('ScheduleItem', willistonDB));
    }
  }, [patientsDB, clearviewDB, willistonDB]);

  const getDBData = <T extends any>(
    config: DBConfig,
    state: T,
    setState: React.Dispatch<React.SetStateAction<T>>
  ) => {
    const { path, target } = config;
    axios
      .get('http://localhost:3000' + path)
      .then(res => {
        if (JSON.stringify(state) !== JSON.stringify(res.data[target])) {
          setState(res.data[target]);
        }
      })
      .catch(error => console.error('GET error:', error));
  };

  const transformDBData = (inputType: string, state: any) => {
    if (inputType === 'Patient') {
      const patientsMap = state.map((patient: any) => ({
        id: patient.id,
        patientName: patient.patient_name,
        patientResidence: patient.residence,
        isActive: patient.is_active,
      }));
      return patientsMap;
    }
    if (inputType === 'ScheduleItem') {
      const scheduleItemsMap = state.map((scheduleItem: any) => ({
        id: scheduleItem.id,
        patientName: scheduleItem.patient_name,
        activityTime: scheduleItem.activity_time,
        activityTitle: scheduleItem.activity_title,
        activityNote: scheduleItem.activity_note,
        isImportant: scheduleItem.is_important,
        isComplete: false,
        isEdit: false,
      }));
      return scheduleItemsMap;
    }

    return [];
  };

  ///////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   // Initial GET
  //   axios.get('http://localhost:3000/daily_schedule').then(res => {
  //     const newDbData = res.data.dailySchedules;
  //     if (JSON.stringify(dbData) !== JSON.stringify(newDbData)) {
  //       setDBData(newDbData);
  //     }
  //   });

  //   // Set state if there are changes
  //   const intervalDBGet = setInterval(() => {
  //     axios.get('http://localhost:3000/daily_schedule').then(res => {
  //       const newDbData = res.data.dailySchedules;
  //       if (JSON.stringify(dbData) !== JSON.stringify(newDbData)) {
  //         setDBData(newDbData);
  //       }
  //     });
  //   }, 1000);

  //   return () => clearInterval(intervalDBGet);
  // }, [dbData]);

  // // Display data if present & updates upon changes
  // useEffect(() => {
  //   if (dbData.length > 0) {
  //     const newDbScheduleItems = dbData.map((data: any) => ({
  //       id: data.id,
  //       patientName: data.patient_name,
  //       activityTime: data.activity_time,
  //       activityTitle: data.activity_title,
  //       activityNote: data.activity_note,
  //       isImportant: data.is_important,
  //       isComplete: false,
  //       isEdit: false,
  //     }));
  //     setDBScheduleItems([...newDbScheduleItems]);
  //   }
  // }, [dbData]);

  //////////////////////////////////////////////////////

  return (
    <Fragment>
      <Header title="Daily" />
      <ScheduleList
        scheduleItemsData={
          staffShiftContext.isClearViewHouse
            ? clearviewSchedule
            : willistonSchedule
        }
        DBPath={
          staffShiftContext.isClearViewHouse
            ? clearviewConfig.path
            : willistonConfig.path
        }
        patientsData={patients}
      />
    </Fragment>
  );
};

export default DailySchedule;
