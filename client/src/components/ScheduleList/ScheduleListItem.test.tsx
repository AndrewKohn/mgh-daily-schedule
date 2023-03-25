import ScheduleListItem from './ScheduleListItem';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminContext from '../../store/AdminContext';

describe('<ScheduleListItem />', () => {
  const values = {
    id: 11,
    patientName: 'Dane Joe',
    activityTime: 9,
    activityTitle: 'Medication Administration',
    activityNote:
      'Insulin instructions...  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut consequuntur odit nemo repudiandae. Deserunt numquam nulla qui error ipsum, quas maiores quasi asperiores odio labore aliquid unde facere at tenetur.',
    isImportant: false,
    isComplete: false,
    isEdit: false,
  };

  it('Time element exists and is visible', () => {
    render(<ScheduleListItem scheduleItem={values} />);

    const requiredTime = screen.getByTestId('required-time');
    expect(requiredTime).toBeInTheDocument();
  });

  it('Patient Name element exists and is visible', () => {
    render(<ScheduleListItem scheduleItem={values} />);

    const requiredName = screen.getByTestId('required-name');
    expect(requiredName).toBeInTheDocument();
  });

  it('Activity element exists and is visible', () => {
    render(<ScheduleListItem scheduleItem={values} />);

    const requiredActivity = screen.getByTestId('required-activity');
    expect(requiredActivity).toBeInTheDocument();
  });

  describe('activityImportance()', () => {
    it('Should return an exclamation circle icon if the schedule item is important', () => {
      const scheduleItem = {
        id: 1,
        patientName: 'John Doe',
        activityTime: 1,
        activityTitle: 'Some Activity',
        activityNote: '',
        isImportant: true,
        isComplete: false,
        isEdit: false,
      };
      const { container } = render(
        <ScheduleListItem scheduleItem={scheduleItem} />
      );
      const icon = container.querySelector('.important svg');
      expect(icon).toBeInTheDocument();
    });

    it('Should return an empty string if the schedule item is not important', () => {
      const scheduleItem = {
        id: 1,
        patientName: 'John Doe',
        activityTime: 1,
        activityTitle: 'Some Activity',
        activityNote: '',
        isImportant: false,
        isComplete: false,
        isEdit: false,
      };
      const { container } = render(
        <ScheduleListItem scheduleItem={scheduleItem} />
      );
      const icon = container.querySelector('.important svg');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('activityAction()', () => {
    it('Should return an edit button if the user is logged in', () => {
      const scheduleItem = {
        id: 1,
        patientName: 'John Doe',
        activityTime: 1,
        activityTitle: 'Some Activity',
        activityNote: '',
        isImportant: false,
        isComplete: false,
        isEdit: false,
      };
      const adminContext = {
        isLoggedIn: true,
        onLogout: () => {},
        onLogIn: (username: string, password: string) => {},
      };
      const { container } = render(
        <AdminContext.Provider value={adminContext}>
          <ScheduleListItem scheduleItem={scheduleItem} />
        </AdminContext.Provider>
      );
      const button = container.querySelector('.edit-button');
      expect(button).toBeInTheDocument();
    });

    it('Should return a checkbox if the user is not logged in', () => {
      const scheduleItem = {
        id: 1,
        patientName: 'John Doe',
        activityTime: 1,
        activityTitle: 'Some Activity',
        activityNote: '',
        isImportant: false,
        isComplete: false,
        isEdit: false,
      };
      const adminContext = {
        isLoggedIn: false,
        onLogout: () => {},
        onLogIn: (username: string, password: string) => {},
      };
      const { container } = render(
        <AdminContext.Provider value={adminContext}>
          <ScheduleListItem scheduleItem={scheduleItem} />
        </AdminContext.Provider>
      );
      const checkbox = container.querySelector('.checkbox');
      expect(checkbox).toBeInTheDocument();
    });
  });
});
