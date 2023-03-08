import { useContext, useEffect, useState } from 'react';
import StaffShiftContext from '../../store/StaffShiftContext';
import './Calendar.scss';
import CalendarTiles from './CalendarTiles';

interface calendarContent {
  id: number;
  date: { month: string; dayName: string; dayNumber: string };
  staffShift?: { dayShift: string; nightShift: string };
}

const Calendar = ({}) => {
  const exDate = new Date();
  const date = new Date(exDate.getFullYear(), 3, 1);
  const [calendar, setCalendar] = useState<calendarContent[]>([]);

  const calendarStartDate = () => {
    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let count = 0;

    while (startDate.toString().split(' ')[0] !== 'Sun') {
      startDate = new Date(date.getFullYear(), date.getMonth(), count--);
    }

    return startDate;
  };

  const calendarEndDate = () => {
    let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    let count = 0;

    while (endDate.toString().split(' ')[0] !== 'Sat') {
      endDate = new Date(date.getFullYear(), date.getMonth() + 1, count++);
    }

    return endDate;
  };

  const setCalendarData = (start: Date, end: Date) => {
    // Starting w/ previous month

    // Ending with next month
    let nextMonthDayCount = end.getDate();

    console.log('==========NEXT MONTH');
    for (let i = 0; i < nextMonthDayCount; i++) {
      console.log(new Date(end.getFullYear(), end.getMonth(), i + 1));
    }
  };

  setCalendarData(calendarStartDate(), calendarEndDate());

  // useEffect(() => setCalendarData(calendarStartDate(), calendarEndDate()), []);
  // useEffect(() => console.log(calendar), [calendar]);

  // console.log('START:');
  // console.log(calendarStartDate());
  // console.log('END');
  // console.log(calendarEndDate());
  // console.log(date.getDate());
  // console.log(previousMonth);
  // console.log(currentMonth);
  // console.log(nextMonth);

  return (
    <div className="calendar-container">
      <h3 className="month-title">Month</h3>
      <div className="month-container">
        <p className="day-title">SUNDAY</p>
        <p className="day-title">MONDAY</p>
        <p className="day-title">TUESDAY</p>
        <p className="day-title">WEDNESDAY</p>
        <p className="day-title">THURSDAY</p>
        <p className="day-title">FRIDAY</p>
        <p className="day-title">SATURDAY</p>
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
        <CalendarTiles />
      </div>
    </div>
  );
};

export default Calendar;
