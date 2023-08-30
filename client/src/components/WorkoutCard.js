import React, { useContext, useState } from 'react'
import dayjs from 'dayjs';
import { UserContext } from './UserContext.js'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
const WorkoutCard = ({ workout }) => {

    const { id, name, datetime, workout_type, intensity, accessible, admin } = workout
    const { deleteWorkout, updateWorkout } = useContext(UserContext);
    const [dateTime, setDateTime] = useState(dayjs().add(5, "minute"))
    const [showDate, setShowDate] = useState(false)
    const [errors, setErrors] = useState([])
    const handleDelete = () => {
        fetch(`/workouts/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    deleteWorkout(id)

                }
            })
    }
    const handleSubmitTime = (e) => {
        e.preventDefault();

        fetch(`/workouts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                datetime: dateTime,
                accessible: true
            })
          }).then(res => {
            if (res.ok) {
              res.json().then((workout) => {
                console.log(workout);
                updateWorkout(workout)
                setShowDate(false);
              })
            } else {
              res.json().then(json => {
                console.log(json.errors);
                setErrors(json.errors)
              })
            }
          })
    }
    return (
        <div style={{ border: "solid" }}>
            <h3>Workout Name: {name}</h3>
            <h3>Workout datetime: {dayjs(datetime).format('YYYY-MM-DD HH:mm')}</h3>
            <h3>Workout type: {workout_type}</h3>
            <h3>Workout intensity: {intensity}</h3>
            {admin === true ? <button
                onClick={handleDelete}
            >Delete</button> : null}
            {admin === false && accessible === true ? <button>Join</button> : null}
            {admin === true && accessible === false ? <button
                onClick={() => setShowDate(true)}
            >Reset</button> : null}
            {showDate && <form onSubmit={handleSubmitTime}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DateTimePicker
                        disablePast

                        value={dateTime}
                        onChange={(value) => {
                            setDateTime(value)
                        }}

                        sx={{ border: 3, borderRadius: 2, backgroundColor: "white" }}
                    />

                </LocalizationProvider>
                <button type='submit'>Set New Time</button>
            </form>}

        </div>
    )
}

export default WorkoutCard