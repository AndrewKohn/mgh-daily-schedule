import Card from '../components/UI/Card/Card';
import dailyScheduleIcon from '../icons/daily-schedule-icon.png';
import staffScheduleIcon from '../icons/staff-schedule-icon.png';
import loginIcon from '../icons/login-icon.png';
import './Home.scss';
import { useEffect, useState } from 'react';
import Login from '../components/Login/Login';
import { Link } from 'react-router-dom';

interface Props {}

const Home = ({}) => {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  useEffect(() => {
    document
      .getElementById('favicon')
      ?.setAttribute('href', '../src/icons/morning-glory.png');
    document.title = 'MGH Daily Schedule';
  }, []);

  const showLoginHandler = () => {
    setShowLogin(false);
    setTimeout(() => {
      setShowLogin(true);
    }, 10);
  };

  return (
    <div className="login-container">
      <Card classes="nav-card">
        <h1 className="login-heading">Morning Glory Homes</h1>
        <nav className="home-nav">
          <Link to="/daily-schedule" className="link">
            <img
              className="icon"
              src={dailyScheduleIcon}
              alt="daily schedule icon"
            />
            <p className="link-text">Daily Schedule</p>
          </Link>
          <Link to="/staff-schedule" className="link">
            <img
              className="icon"
              src={staffScheduleIcon}
              alt="staff schedule icon"
            />
            <p className="link-text">Staff Schedule</p>
          </Link>
          <button className="button link" onClick={showLoginHandler}>
            <img className="icon" src={loginIcon} alt="login icon" />
            <p className="link-text">Admin Login</p>
          </button>
        </nav>
      </Card>
      {showLogin && <Login />}
    </div>
  );
};

export default Home;
