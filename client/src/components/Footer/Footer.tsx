import axios from 'axios';
import { useEffect, useState } from 'react';
import './Footer.scss';
import scheduleItem from '../../store/ScheduleListModel';

interface Props {}

const Footer = ({}) => {
  const currentDate = new Date().toString();
  const currentYear = currentDate.split(' ')[3];
  const [cvData, setCvData] = useState<scheduleItem[]>([]);
  const [wlData, setWlData] = useState<scheduleItem[]>([]);
  const [dbData, setDBData] = useState<any>([]);
  const [lastDateEdit, setLastDateEdit] = useState<string | null>(null);

  useEffect(() => {
    getScheduleData('clearview').then(data =>
      setCvData(data.clearviewDailySchedule)
    );

    getScheduleData('williston').then(data =>
      setWlData(data.willistonDailySchedule)
    );
  }, []);

  useEffect(() => {
    if (cvData && wlData) setDBData(cvData.concat(wlData));
  }, [cvData, wlData]);

  const getScheduleData = async (path: string) => {
    try {
      const response = await axios.get('http://75.72.55.128:3000/' + path);
      return response.data;
    } catch (error) {
      console.error('GET error:', error);
      return null;
    }
  };

  // Last date edit taken from database
  // [NOTE] time isn't even being tracked correctly in data.created_at
  useEffect(() => {
    let tempDate = [0, 0, 0];
    // let tempTime = [0, 0, 0];
    dbData.forEach((data: any) => {
      const date = data.created_at.split('T')[0].split('-');
      // const time = data.created_at.split('T')[1].split('.')[0].split(':');

      tempDate = compareTimeStamp(tempDate, date);
      // tempTime = compareTimeStamp(tempTime, time);
    });

    setLastDateEdit(tempDate[1] + '-' + tempDate[2] + '-' + tempDate[0]);
  }, [dbData]);

  const compareTimeStamp = (current: number[], next: number[]) => {
    if (current[0] < next[0]) return next;
    if (current[0] === next[0] && current[1] < next[1]) return next;
    if (current[0] === next[0] && current[2] < next[2]) return next;

    return current;
  };

  return (
    <footer className="footer">
      <p className="footer-text">
        <a href="mailto: contact@kohnandrew.com">Andrew Kohn</a> ©{' '}
        <span>{currentYear}</span> · All rights reserved
      </p>
      {lastDateEdit !== '0-0-0' ? (
        <p className="date">Latest Edit: {lastDateEdit}</p>
      ) : (
        ''
      )}
    </footer>
  );
};

export default Footer;
