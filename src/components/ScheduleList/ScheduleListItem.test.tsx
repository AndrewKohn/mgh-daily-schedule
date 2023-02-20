import ScheduleListItem from './ScheduleListItem';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('<ScheduleListItem />', () => {
  it('Time element exists and is visible', () => {
    render(<ScheduleListItem />);

    const requiredTime = screen.getByTestId('required-time');
    expect(requiredTime).toBeInTheDocument();
  });

  it('Patient Name element exists and is visible', () => {
    render(<ScheduleListItem />);

    const requiredName = screen.getByTestId('required-name');
    expect(requiredName).toBeInTheDocument();
  });

  it('Activity element exists and is visible', () => {
    render(<ScheduleListItem />);

    const requiredActivity = screen.getByTestId('required-activity');
    expect(requiredActivity).toBeInTheDocument();
  });
});
