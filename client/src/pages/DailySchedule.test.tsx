import jest from 'jest-mock';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header/Header';
import StaffShiftContext from '../store/StaffShiftContext';
import ScheduleList from '../components/ScheduleList/ScheduleList';

describe('<DailySchedule />', () => {
  const contextValues = {
    isClearViewHouse: true,
    isDayShift: true,
    onHouseChange: jest.fn(),
    onStaffShiftChange: jest.fn(),
  };

  it('Header displays title prop correctly', () => {
    const title: string = 'Test';
    render(
      <Router>
        <StaffShiftContext.Provider value={contextValues}>
          <Header title={title} />
        </StaffShiftContext.Provider>
      </Router>
    );

    expect(screen.getByText(`${title} schedule`)).toBeInTheDocument();
  });

  it('ScheduleList passes props correctly', () => {
    const scheduleItemData = [
      {
        id: 1,
        patientName: 'Patient A',
        activityTime: 7,
        activityTitle: 'Test title 1',
        activityNote: 'Test note 1',
        isImportant: 1,
        isComplete: false,
        isEdit: false,
      },
      {
        id: 2,
        patientName: 'Patient B',
        activityTime: 0, // mil time: 12AM
        activityTitle: 'Test title 2',
        activityNote: 'Test note 2',
        isImportant: 0,
        isComplete: false,
        isEdit: false,
      },
    ];
    const patientsData = [
      {
        id: 1,
        patientName: 'Patient One',
        patientResidence: 'clearview',
        isActive: true,
      },
      {
        id: 2,
        patientName: 'Patient Two',
        patientResidence: 'clearview',
        isActive: false,
      },
      {
        id: 3,
        patientName: 'Patient Three',
        patientResidence: 'clearview',
        isActive: false,
      },
    ];
    const DBPath = '/clearview';

    render(
      <Router>
        <StaffShiftContext.Provider value={contextValues}>
          <ScheduleList
            scheduleItemsData={scheduleItemData}
            DBPath={DBPath}
            patientsData={patientsData}
          />
        </StaffShiftContext.Provider>
      </Router>
    );

    expect(screen.getByText('Patient A')).toBeInTheDocument();
    expect(screen.getByText('Patient B')).toBeInTheDocument();
    expect(screen.queryByText('Patient C')).toBeNull();
    expect(screen.getByText('12AM')).toBeInTheDocument();
    expect(screen.getByText('7AM')).toBeInTheDocument();
    expect(screen.queryByText('4PM')).toBeNull();
  });
});
