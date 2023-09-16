import React, { useContext, useState, useEffect } from 'react'
import dayjs from 'dayjs';
import { UserContext } from './UserContext.js'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
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

            // whileHover={{scale: 1.1}}
            // whileTap={{scale: 0.9}}
            style={{ border: "solid", width: 600, padding: 8, borderRadius: 16, background: "white" }}>

            <form onSubmit={handleSubmitEditWorkout}>
                <div
                    style={{ position: 'relative' }}
                >
                    <Button
                        variant='contained'
                        onClick={() => navigate(`/users/${loggedInUser.id}/workouts/${id}/exercises`)}
                        style={{ position: 'absolute', top: 30, right: 0 }}

                    >View</Button>

                    <div style={{ display: 'flex', margin: '-30px 0', alignItems: 'center' }}>
                        <h3 style={{ fontSize: 30, marginRight: 8 }}>Workout Name: </h3>
                        <input
                            style={
                                {...styles.div, width: 250}
                            }
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                            disabled={editEnabled ? false : true}
                            maxLength={13}
                        />
                    </div>


                    <div style={{ display: 'flex', margin: '-30px 0', alignItems: 'center' }}>
                        <h3 style={{ fontSize: 30, marginRight: 8 }}>Workout Type: </h3>
                        <textarea
                            style={
                                {...styles.div, resize:'none'}
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
                        <h3>Date and time: {dayjs(datetime).format('dddd, MMMM D, YYYY') +' at '+ dayjs(datetime).format('HH:mm')}</h3>
                        {editEnabled &&
                            <>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        disablePast

                                        value={dateTime}
                                        onChange={(value) => {
                                            setDateTime(value)
                                        }}
                                        // sx={{ border: 3, borderRadius: 2, backgroundColor: "white" }}
                                    />
                                </LocalizationProvider>

                                {/* <Button
                                    variant='contained'
                                    type='submit'>Set New Time</Button> */}
                            </>}
                    </div>
                    {editEnabled ?
                        <div>
                            <Button
                                variant='contained'
                                onClick={() => cancelEdit()}>Cancel</Button>
                            <Button
                                variant='contained'
                                type='submit'>Save</Button>
                        </div>
                        : <Button
                            variant='contained'
                            onClick={() => setEditEnabled(true)}>Edit</Button>}
                </div>
            </form>


            {admin === true ? <Button
                variant='contained'
                onClick={handleDelete}
            >Delete</Button> : null}
            {admin === false && accessible === true ? <Button
                variant='contained'
            >Join</Button> : null}
            {admin === true && accessible === false ? <Button
                variant='contained'
                onClick={() => setShowDate(true)}
            >Rescheduel</Button> : null}

            {showDate &&
                <form onSubmit={handleSubmitTime}>
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
                    <Button
                        variant='contained'
                        type='submit'>Set New Time</Button>
                    <Button
                        variant='contained'
                        onClick={() => setShowDate(false)}
                    >Cancel</Button>
                </form>}

        </motion.div>
    )
}

export default WorkoutCard