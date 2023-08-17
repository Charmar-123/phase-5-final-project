
import './App.css';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import WorkoutCard from './components/WorkoutCard';
import WorkoutPage from './components/WorkoutPage';
import CreateWorkout from './components/CreateWorkout';




function App() {
  return (
    <>
      <NavigationBar />
      {/* <WorkoutPage/> */}
      <CreateWorkout/>
      {/* <RatingsDropDown/> */}
      {/* <Home /> */}
      {/* <AboutUs/> */}
    </>

  );
}

export default App;
