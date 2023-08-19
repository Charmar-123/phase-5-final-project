
import './App.css';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import WorkoutCard from './components/WorkoutCard';
import WorkoutPage from './components/WorkoutPage';
import CreateWorkout from './components/CreateWorkout';
import IntroAnimation from './components/IntroAnimation';
import SubmitedWorkout from './components/SubmitedWorkout';
import AutoTypeInput from './components/AutoTypeInput';
import ProgressBar from './components/ProgressBar';
import { useState } from 'react';




function App() {

 
  return (
    <>
      <NavigationBar />
      {/* <IntroAnimation/> */}
      {/* <WorkoutPage/> */}
      {/* <CreateWorkout/> */}
      {/* <RatingsDropDown/> */}
      {/* <Home /> */}
      {/* <AboutUs/> */}
      {/* <ProgressBar/> */}
      <SubmitedWorkout/>
 

    </>

  );
}

export default App;
