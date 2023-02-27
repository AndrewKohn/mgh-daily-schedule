import { useContext, useEffect } from 'react';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import ScheduleList from './components/ScheduleList/ScheduleList';
import AdminContext from './store/AdminContext';

const App = ({}) => {
  const adminContext = useContext(AdminContext);

  return (
    <div className="container">
      <main className="main">
        {!adminContext.isLoggedIn && <Login />}
        <Header />
        <ScheduleList />
      </main>
      <Footer />
    </div>
  );
};

export default App;
