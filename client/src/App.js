import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import WorkoutCard from './components/WorkoutCard';
import WorkoutPage from './components/WorkoutPage';
import Logo from './components/Logo';


function App() {
  return (
    <>
      <NavigationBar />
      <Logo/>
      {/* <WorkoutPage/> */}
      <Home />
      {/* <AboutUs/> */}
    </>

  );
}

export default App;
