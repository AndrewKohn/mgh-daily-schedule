import './App.scss';
import Header from './components/Header/Header';
import ScheduleList from './components/ScheduleList/ScheduleList';

const App = ({}) => {
  return (
    <div className="container">
      <main className="main">
        <Header />
        <ScheduleList />
      </main>
    </div>
  );
};

export default App;
