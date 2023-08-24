
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

import { useState } from 'react';
import Grid from './components/Grid.js';
import LoginScreen from './components/LoginScreen';

import { UserContext } from './components/UserContext';
import { Route, Routes } from 'react-router-dom';
import UserPage from './components/UserPage';
import CreateAccount from './components/CreateAccount';



function App() {


  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path='/users/:id' element={<UserPage/>}/>
        <Route path='/login' element={ <LoginScreen />}/>
        <Route path='/' element={ <CreateAccount/>}/>
        <Route path='/workoutpage' element={<WorkoutPage/>}/>
        <Route path='/createworkout' element={<CreateWorkout/>}/>
        <Route path='/submitedworkout' element={<SubmitedWorkout/>}/>

        {/* <WorkoutPage/> */}
        {/* <CreateWorkout/> */}
        {/* <Home /> */}
        {/* <AboutUs/> */}
        {/* <SubmitedWorkout/> */}
      </Routes>






    </>

  );
}

export default App;
