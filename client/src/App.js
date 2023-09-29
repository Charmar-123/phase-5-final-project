
import './App.css';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';

import WorkoutPage from './components/WorkoutPage';
import CreateWorkout from './components/CreateWorkout';
import SubmitedWorkout from './components/SubmitedWorkout';
import LoginScreen from './components/LoginScreen';
import { Route, Routes } from 'react-router-dom';
import UserPage from './components/UserPage';
import CreateAccount from './components/CreateAccount';
import Workouts from './components/Workouts';
import ViewWorkout from './components/ViewWorkout';



function App() {


  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path='/users/:userId' element={<UserPage/>}/>
        <Route path='/login' element={ <LoginScreen />}/>
        <Route path='/signup' element={ <CreateAccount/>}/>
        <Route path='/users/:userId/workouts/:workoutId' element={<WorkoutPage/>}/>
        <Route path='/users/:userId/workouts/new' element={<CreateWorkout/>}/>
        <Route path='/users/:userId/workouts/:workoutId/exercises/new' element={<SubmitedWorkout/>}/>
        <Route path='/users/:userId/workouts/:workoutId/exercises' element={<WorkoutPage/>}/>
        <Route path='/workouts' element={<Workouts/>}/>
        <Route path='/users/:userId/communityworkouts' element={<Workouts/>}/>
        <Route path='/users/:userId/communityworkouts/:workoutId/exercises' element={<ViewWorkout/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>






    </>

  );
}

export default App;
