import { useContext } from 'react';
import './App.scss';
import Footer from './components/Footer/Footer';
import AdminContext from './store/AdminContext';
import { Routes, Route } from 'react-router-dom';
import DailySchedule from './pages/DailySchedule';
import Home from './pages/Home';
import StaffSchedule from './pages/StaffSchedule';

const App = ({}) => {
  return (
    <div className="container">
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily-schedule" element={<DailySchedule />} />
          <Route path="/staff-schedule" element={<StaffSchedule />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
