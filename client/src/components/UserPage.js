import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext.js'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
const UserPage = () => {

  const navigate = useNavigate();
  const { setLoggedInUser, loggedInUser } = useContext(UserContext);

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

  const accessibleWorkouts = workouts.filter((workout) => workout.accessible === true)
  const unaccessibleWorkouts = workouts.filter((workout) => workout.accessible === false)

  console.log(accessibleWorkouts);
  return (
    <div style={{ padding: 15 }}>
      <h1>Welcome {name}</h1>

      <div
        style={{ backgroundColor: "blue", width: 200, height: 200, borderRadius: '50%', overflow: 'hidden' }}
      >
        <img
          src={profile_pic_url}

          alt="Uploaded "
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      {accessibleWorkouts.length > 0 ? <>
        <h3>Your next workout is at {dayjs(accessibleWorkouts[0].datetime).format('YYYY-MM-DD')} on {dayjs(accessibleWorkouts[0].datetime).format('HH:mm ')}!</h3>
        <h3>Upcoming Workouts:</h3>
        {accessibleWorkouts.map((workout) => {
          return (
            <div>
              <h6>name:{workout.name} date:{workout.datetime}</h6>
              {workout.exercises && workout.exercises.map((exec) => {
                return <h6>{exec.name}</h6>
              })}
            </div>
          )
        })}

      </> :
        <button onClick={() => navigate(`/users/${id}/workouts/new`)}>Create Workout</button>
      }
      {unaccessibleWorkouts.length > 0 ?
        <>

          <h3>Completed Workouts:</h3>
          {unaccessibleWorkouts.map((workout) => {
          return (
            <div>
              <h6>name:{workout.name} date:{workout.datetime}</h6>
              {workout.exercises && workout.exercises.map((exec) => {
                return <h6>{exec.name}</h6>
              })}
            </div>
          )
        })}
          <button onClick={() => navigate(`/users/${id}/workouts/new`)}>Create Workout</button>
        </>
        : null
      }



      {/* <button onClick={() => handleLogOut()}>Logout</button> */}
    </div>
  )
}

export default UserPage