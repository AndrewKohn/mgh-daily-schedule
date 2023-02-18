import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import ScheduleList from './components/ScheduleList/ScheduleList';

const App = ({}) => {
  return (
    <div className="container">
      <main className="main">
        {/* <Login /> */}
        <Header />
        <ScheduleList />
      </main>
      <Footer />
    </div>
  );
};

export default App;
