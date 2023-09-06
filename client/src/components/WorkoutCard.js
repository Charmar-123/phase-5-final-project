import React, { useContext, useState, useEffect } from 'react'
import dayjs from 'dayjs';
import { UserContext } from './UserContext.js'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const WorkoutCard = ({ workout }) => {
    const navigate = useNavigate();
    const [editEnabled, setEditEnabled] = useState(false)
    const styles = {
        div: {
            fontFamily: 'CardFont', background: "none",
            fontSize: 30, color: "black",
            height: 30,
            border: editEnabled ? "solid" : "none"
        },

    }
    const { id, name, datetime, workout_type, intensity, accessible, admin } = workout
    const [dateTime, setDateTime] = useState()

    const checkIfDateAfter = () => {
        if (datetime >= dayjs()) {
            setDateTime(datetime)
        } else {
            setDateTime(dayjs().add(5, "minute"))
        }
    }

    useEffect(() => {
        checkIfDateAfter()
    }, [])

    // console.log(datetime);
    const { deleteWorkout, updateWorkout, loggedInUser } = useContext(UserContext);

    const [showDate, setShowDate] = useState(false)
    const [errors, setErrors] = useState([])


    const [workoutName, setWorkoutName] = useState(name)
    const [workoutExerciseType, setWorkoutExerciseType] = useState(workout_type)
    const [workoutIntensity, setWorkoutIntensity] = useState(intensity)


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
                    // console.log(workout);
                    updateWorkout(workout)
                    setShowDate(false);
                })
            } else {
                res.json().then(json => {
                    // console.log(json.errors);
                    setErrors(json.errors)
                })
            }
        })
    }

    const cancelEdit = () => {
        setWorkoutName(name);
        setWorkoutExerciseType(workout_type);
        setWorkoutIntensity(intensity);
        checkIfDateAfter();
        setEditEnabled(false)
    }

    const handleSubmitEditWorkout = (e) => {
        e.preventDefault();
        fetch(`/workouts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: workoutName,
                datetime: dateTime,
                workout_type: workoutExerciseType,
                intensity: workoutIntensity,
                user_id: loggedInUser.id
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then((workout) => {
                    // console.log(workout);
                    updateWorkout(workout)
                    setEditEnabled(false);
                })
            } else {
                res.json().then(json => {
                    // console.log(json.errors);
                    setErrors(json.errors)
                })
            }
        })
    }
    return (
        <motion.div 
        onClick={() => navigate(`/users/${loggedInUser.id}/workouts/${id}/exercises`)}
        // whileHover={{scale: 1.1}}
        // whileTap={{scale: 0.9}}
        style={{ border: "solid" }}>

            <form onSubmit={handleSubmitEditWorkout}>
                <div style={{ display: 'flex', margin: '-30px 0', alignItems: 'center' }}>
                    <h3 style={{ fontSize: 30, marginRight: 8 }}>Workout Name: </h3>
                    <input
                        style={
                            styles.div
                        }
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        disabled={editEnabled ? false : true}
                    />
                </div>
                <div style={{ display: 'flex', margin: '-30px 0', alignItems: 'center' }}>
                    <h3 style={{ fontSize: 30, marginRight: 8 }}>Workout Type: </h3>
                    <input
                        style={
                            styles.div
                        }
                        value={workoutExerciseType}
                        onChange={(e) => setWorkoutExerciseType(e.target.value)}
                        disabled={editEnabled ? false : true}
                    />
                </div>
                <div style={{ display: 'flex', margin: '-30px 0', alignItems: 'center' }}>
                    <h3 style={{ fontSize: 30, marginRight: 8 }}>Workout Intensity: </h3>
                    <input
                        style={
                            styles.div
                        }
                        type='number'
                        value={workoutIntensity}
                        onChange={(e) => setWorkoutIntensity(e.target.value)}
                        min="1" max="5"
                        disabled={editEnabled ? false : true}
                    />
                </div>
                <div style={{ display: 'flex' }}>
                    <h3>Workout datetime: {dayjs(datetime).format('YYYY-MM-DD HH:mm')}</h3>
                    {editEnabled &&
                        <>
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
                        </>}
                </div>
                {editEnabled ?
                <div>
                    <button onClick={() => cancelEdit()}>Cancel</button>
                    <button type='submit'>Save</button>
                </div>
                : <button onClick={() => setEditEnabled(true)}>Edit</button>}
            </form>


            {admin === true ? <button
                onClick={handleDelete}
            >Delete</button> : null}
            {admin === false && accessible === true ? <button>Join</button> : null}
            {admin === true && accessible === false ? <button
                onClick={() => setShowDate(true)}
            >Rescheduel</button> : null}
 
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

        </motion.div>
    )
}

export default WorkoutCard