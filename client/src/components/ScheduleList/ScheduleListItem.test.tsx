import ScheduleListItem from './ScheduleListItem';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('<ScheduleListItem />', () => {
  it('Time element exists and is visible', () => {
    render(
      <ScheduleListItem
        scheduleItem={{
          id: 11,
          patientName: 'Dane Joe',
          activityTime: 9,
          activityTitle: 'Medication Administration',
          activityNote:
            'Insulin instructions...  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut consequuntur odit nemo repudiandae. Deserunt numquam nulla qui error ipsum, quas maiores quasi asperiores odio labore aliquid unde facere at tenetur.',
          isImportant: false,
          isComplete: false,
          isEdit: false,
        }}
      />
    );

    const requiredTime = screen.getByTestId('required-time');
    expect(requiredTime).toBeInTheDocument();
  });

  it('Patient Name element exists and is visible', () => {
    render(
      <ScheduleListItem
        scheduleItem={{
          id: 11,
          patientName: 'Dane Joe',
          activityTime: 9,
          activityTitle: 'Medication Administration',
          activityNote:
            'Insulin instructions...  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut consequuntur odit nemo repudiandae. Deserunt numquam nulla qui error ipsum, quas maiores quasi asperiores odio labore aliquid unde facere at tenetur.',
          isImportant: false,
          isComplete: false,
          isEdit: false,
        }}
      />
    );

    const requiredName = screen.getByTestId('required-name');
    expect(requiredName).toBeInTheDocument();
  });

  it('Activity element exists and is visible', () => {
    render(
      <ScheduleListItem
        scheduleItem={{
          id: 11,
          patientName: 'Dane Joe',
          activityTime: 9,
          activityTitle: 'Medication Administration',
          activityNote:
            'Insulin instructions...  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut consequuntur odit nemo repudiandae. Deserunt numquam nulla qui error ipsum, quas maiores quasi asperiores odio labore aliquid unde facere at tenetur.',
          isImportant: false,
          isComplete: false,
          isEdit: false,
        }}
      />
    );

    const requiredActivity = screen.getByTestId('required-activity');
    expect(requiredActivity).toBeInTheDocument();
  });
});
