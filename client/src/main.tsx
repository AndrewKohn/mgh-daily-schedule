import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { AdminContextProvider } from './store/AdminContext';
import { StaffShiftContextProvider } from './store/StaffShiftContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AdminContextProvider>
      <StaffShiftContextProvider>
        <App />
      </StaffShiftContextProvider>
    </AdminContextProvider>
  </React.StrictMode>
);
