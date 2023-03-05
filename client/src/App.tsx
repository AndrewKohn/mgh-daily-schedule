import { useContext, useEffect } from 'react';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import ScheduleList from './components/ScheduleList/ScheduleList';
import AdminContext from './store/AdminContext';
import { Routes, Route } from 'react-router-dom';
import DailySchedule from './pages/DailySchedule';
import Home from './pages/Home';

const App = ({}) => {
  const adminContext = useContext(AdminContext);

  return (
    <div className="container">
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily-schedule" element={<DailySchedule />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
