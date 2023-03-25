import jest from 'jest-mock';
import Header from './Header';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import StaffShiftContext from '../../store/StaffShiftContext';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Header />', () => {
  it('Header can be rendered without crashing', () => {
    const title = 'TEST';

    const contextValues = {
      isClearViewHouse: true,
      isDayShift: false,
      onHouseChange: jest.fn(),
      onStaffShiftChange: jest.fn(),
    };

    render(
      <Router>
        <StaffShiftContext.Provider value={contextValues}>
          <Header title={title} />
        </StaffShiftContext.Provider>
      </Router>
    );
  });

  it('Clearview button is rendered and is selected by default', () => {
    const title = 'TEST';

    const contextValues = {
      isClearViewHouse: true,
      isDayShift: false,
      onHouseChange: jest.fn(),
      onStaffShiftChange: jest.fn(),
    };

    render(
      <Router>
        <StaffShiftContext.Provider value={contextValues}>
          <Header title={title} />
        </StaffShiftContext.Provider>
      </Router>
    );
    const clearviewButton = screen.getByTestId('clearview-button');

    expect(clearviewButton).toHaveClass('selected-house');
  });

  it('Day Shift button is rendered and is selected by default', () => {
    const title = 'TEST';

    const contextValues = {
      isClearViewHouse: true,
      isDayShift: true,
      onHouseChange: jest.fn(),
      onStaffShiftChange: jest.fn(),
    };

    render(
      <Router>
        <StaffShiftContext.Provider value={contextValues}>
          <Header title={title} />
        </StaffShiftContext.Provider>
      </Router>
    );

    const dayShiftButton = screen.getByTestId('day-shift-button');

    expect(dayShiftButton).toHaveClass('selected-shift');
  });

  it('Title changes when the current house in daytime changes value', () => {
    // Define initial context values
    const initialContextValues = {
      isClearViewHouse: true,
      isDayShift: true,
      onHouseChange: jest.fn(),
      onStaffShiftChange: jest.fn(),
    };

    // Render Header component with initial context values
    render(
      <Router>
        <StaffShiftContext.Provider value={initialContextValues}>
          <Header title="Some title" />
        </StaffShiftContext.Provider>
      </Router>
    );

    // Verify that the initial page title is set correctly
    expect(document.title).toBe('Clearview Day Schedule');
    expect(document.title).not.toBe('Williston Day Schedule');

    // Define updated context values
    const updatedContextValues = {
      isClearViewHouse: false,
      isDayShift: true,
      onHouseChange: jest.fn(),
      onStaffShiftChange: jest.fn(),
    };

    // Update context values and rerender Header component
    render(
      <Router>
        <StaffShiftContext.Provider value={updatedContextValues}>
          <Header title="Some title" />
        </StaffShiftContext.Provider>
      </Router>
    );

    // Verify that the page title is updated correctly
    expect(document.title).toBe('Williston Day Schedule');
    expect(document.title).not.toBe('Clearview Day Schedule');
  });

  it('Title changes when the current house in nighttime changes value', () => {
    // Define initial context values
    const initialContextValues = {
      isClearViewHouse: true,
      isDayShift: false,
      onHouseChange: jest.fn(),
      onStaffShiftChange: jest.fn(),
    };

    // Render Header component with initial context values
    render(
      <Router>
        <StaffShiftContext.Provider value={initialContextValues}>
          <Header title="Some title" />
        </StaffShiftContext.Provider>
      </Router>
    );

    // Verify that the initial page title is set correctly
    expect(document.title).toBe('Clearview Night Schedule');
    expect(document.title).not.toBe('Williston Night Schedule');

    // Define updated context values
    const updatedContextValues = {
      isClearViewHouse: false,
      isDayShift: false,
      onHouseChange: jest.fn(),
      onStaffShiftChange: jest.fn(),
    };

    // Update context values and rerender Header component
    render(
      <Router>
        <StaffShiftContext.Provider value={updatedContextValues}>
          <Header title="Some title" />
        </StaffShiftContext.Provider>
      </Router>
    );

    // Verify that the page title is updated correctly
    expect(document.title).toBe('Williston Night Schedule');
    expect(document.title).not.toBe('Clearview Night Schedule');
  });
});
