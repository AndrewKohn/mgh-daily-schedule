import axios from 'axios';
import { useEffect, useState } from 'react';
import './Footer.scss';

interface Props {}

const Footer = ({}) => {
  const currentDate = new Date().toString();
  const currentYear = currentDate.split(' ')[3];
  const [dbData, setDBData] = useState<any>([]);
  const [lastDateEdit, setLastDateEdit] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/daily_schedule')
      .then(res => setDBData(res.data.dailySchedules));
  }, []);

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

  // use to gather date string
  // console.log(lastEditDate);

  return (
    <footer className="footer">
      <p className="footer-text">
        <a href="mailto: contact@kohnandrew.com">Andrew Kohn</a> ©{' '}
        <span>{currentYear}</span> · All rights reserved
      </p>
      <p className="date">
        Latest Edit: {lastDateEdit} 02:20:33 (Central Standard Time)
      </p>
    </footer>
  );
};

export default Footer;
