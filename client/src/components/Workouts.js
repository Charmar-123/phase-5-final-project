import React, { useEffect, useState, useContext } from 'react'
import WorkoutCard from './WorkoutCard'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext.js'
const Workouts = () => {
  const navigate = useNavigate();
  const { workouts } = useContext(UserContext);
  return (
    <div>
        {workouts.map((workout) => {
            return (
                <WorkoutCard
                key={workout.id}
                workout={workout}
                />
            )
        })}
    </div>
  )
}

export default Workouts