import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext.js'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import WorkoutCard from './WorkoutCard.js';
import { Button } from '@mui/material';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const UserPage = () => {

  const navigate = useNavigate();
  const { setLoggedInUser, loggedInUser } = useContext(UserContext);
  const [alignment, setAlignment] = useState('upcoming');

  // console.log(loggedInUser);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    // console.log(newAlignment);
  };
  if (!loggedInUser) {
    return <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}

    >
      <CircularProgress />
    </div>
  }
  const { name, id, workouts, profile_pic_url } = loggedInUser

  const accessibleUserWorkouts = workouts.filter((workout) => workout.accessible === true && workout.admin === true)
  const unaccessibleUserWorkouts = workouts.filter((workout) => workout.accessible === false && workout.admin === true)

  const accessibleJoinedWorkouts = workouts.filter((workout) => workout.accessible === true && workout.admin === false)
  const unaccessibleJoinedWorkouts = workouts.filter((workout) => workout.accessible === false && workout.admin === false)

  // console.log(loggedInUser);
  return (
    <div style={{ height: '100vh', padding: 15, background: "linear-gradient(180deg, rgba(87,121,255,1) 0%, rgba(255,126,154,1) 67%)" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{ backgroundColor: "blue", width: 100, height: 100, borderRadius: '50%', overflow: 'hidden' }}
          >
            <img
              src={profile_pic_url}
              alt="Uploaded "
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <h1 style={{ marginLeft: 5 }}>Welcome {name}</h1>
        </div>
        <Button
          style={{ height: 30 }}
          variant='contained'
          onClick={() => navigate(`/users/${id}/workouts/new`)}
        >
          Create Workout
        </Button>
      </div>
      {accessibleUserWorkouts.length > 0 ?
        <h1>Your next workout is on {dayjs(accessibleUserWorkouts[0].datetime).format('YYYY-MM-DD')} at {dayjs(accessibleUserWorkouts[0].datetime).format('HH:mm ')}!</h1> : null}
      <ToggleButtonGroup
        sx={{ background: "white", marginTop: 5, marginBottom: 3 }}
        color="standard"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="your-upcoming-workouts">Your Upcoming Workouts</ToggleButton>
        <ToggleButton value="your-previous-workouts">Your Previous Workouts</ToggleButton>
        <ToggleButton value="upcoming">Joined Upcoming Workouts</ToggleButton>
        <ToggleButton value="previous">Joined Previous Workouts</ToggleButton>
      </ToggleButtonGroup>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {alignment === "your-upcoming-workouts" && accessibleUserWorkouts.length > 0 ? <>
          
          {accessibleUserWorkouts.map((workout) => {
            return (
              <WorkoutCard
                user={true}
                key={workout.name}
                workout={workout} />
            )
          })}

        </> : null
        }


        {alignment === "your-previous-workouts" && unaccessibleUserWorkouts.length > 0 ?
          <>

            {/* <h3>User Workouts Unaccessible:</h3> */}
            {unaccessibleUserWorkouts.map((workout) => {
              return (
                <WorkoutCard
                  user={true}
                  key={workout.name}
                  workout={workout} />
              )
            })}
          </>
          : null
        }

        {alignment === "previous" && unaccessibleJoinedWorkouts.length > 0 ?
          <>

            {/* <h3>User Workouts Unaccessible:</h3> */}
            {unaccessibleJoinedWorkouts.map((workout) => {
              return (
                <WorkoutCard
                  user={true}
                  key={workout.name}
                  workout={workout} />
              )
            })}
          </>
          : null
        }

        {alignment === "upcoming" && accessibleJoinedWorkouts.length > 0 ?
          <>

            {/* <h3>User Workouts Unaccessible:</h3> */}
            {accessibleJoinedWorkouts.map((workout) => {
              return (
                <WorkoutCard
                  user={true}
                  key={workout.name}
                  workout={workout} />
              )
            })}
          </>
          : null
        }
      </div>

    </div>
  )
}

export default UserPage