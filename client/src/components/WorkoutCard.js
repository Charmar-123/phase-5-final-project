import React, { useContext } from 'react'
import dayjs from 'dayjs';
import { UserContext } from './UserContext.js'
const WorkoutCard = ({workout}) => {

    const {id,name, datetime, workout_type,intensity, accessible, admin} = workout
    const { deleteWorkout } = useContext(UserContext);

    const handleDelete = () => {
        fetch(`/workouts/${id}`, {
          method: 'DELETE',
        })
          .then(res => {
            if (res.ok) {
              deleteWorkout(id)
            //   navigate(`/patients/${loggedInPatient.id}`)
            }
          })
      }
  return (
    <div style={{border: "solid"}}>
        <h3>Workout Name: {name}</h3>
        <h3>Workout datetime: {dayjs(datetime).format('YYYY-MM-DD HH:mm')}</h3>
        <h3>Workout type: {workout_type}</h3>
        <h3>Workout intensity: {intensity}</h3>
        {admin === true ? <button
        onClick={handleDelete}
        >Delete</button> : null}
        {admin === false && accessible === true ? <button>Join</button> : null}
        {admin === true && accessible === false ? <button>Reset</button> : null}
    </div>
  )
}

export default WorkoutCard