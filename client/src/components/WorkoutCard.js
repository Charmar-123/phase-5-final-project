import React, { useContext, useState, useEffect } from 'react'
import dayjs from 'dayjs';
import { UserContext } from './UserContext.js'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
const WorkoutCard = ({ workout, user }) => {


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

    const { id, name, datetime, workout_type, intensity, accessible, admin, zoom_link } = workout
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
    const { deleteWorkout, updateWorkout, loggedInUser, addWorkout } = useContext(UserContext);

    const [showDate, setShowDate] = useState(false)
    const [errors, setErrors] = useState([])


    const [workoutName, setWorkoutName] = useState(name)
    const [workoutExerciseType, setWorkoutExerciseType] = useState(workout_type)
    const [workoutIntensity, setWorkoutIntensity] = useState(intensity)
    const [workoutLink, setWorkoutLink] = useState(zoom_link)
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = () => {
        setIsLoading(true)
        fetch(`/api/workouts/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    deleteWorkout(id)
                    setIsLoading(false)
                }
            })
    }
    const handleSubmitTime = (e) => {
        e.preventDefault();
        setIsLoading(true)
        fetch(`/api/workouts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                datetime: dateTime,
                accessible: true
            })
        }).then(res => {
            if (res.ok) {
                res.json().then((workout) => {
                    updateWorkout(workout)
                    setShowDate(false);
                    setIsLoading(false)
                })
            } else {
                res.json().then(json => {
                    // console.log(json.errors);
                    setErrors(json.errors)
                    setIsLoading(false)
                })
            }
        })
    }

    const cancelEdit = () => {
        setWorkoutName(name);
        setWorkoutExerciseType(workout_type);
        setWorkoutIntensity(intensity);
        setWorkoutLink(workoutLink)
        checkIfDateAfter();
        setEditEnabled(false)
    }

    const handleSubmitEditWorkout = (e) => {
        e.preventDefault();
        fetch(`/api/workouts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: workoutName,
                zoom_link: workoutLink,
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

    const handleJoinWorkout = () => {
        fetch(`/api/participants`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                workout_id: id,
                user_id: loggedInUser.id
            })
        })
            .then(res => {
                if (res.ok) {
                    res.json().then((workout) => {
                        addWorkout(workout)
                        navigate(`/users/${loggedInUser.id}`)

                    })
                } else {
                    res.json().then(json => {
                        setErrors(json.errors)
                    })
                }
            })
    }

    const handleDeleteJoined = () => {
        fetch(`/api/participants/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    deleteWorkout(id)
                }
            })
    }
    return (
        <motion.div
            style={{ border: "solid", width: 600, padding: 8, borderRadius: 16, background: "white" }}>

            <form onSubmit={handleSubmitEditWorkout}>
                <div
                    style={{ position: 'relative' }}
                >
                    <Button
                        variant='contained'

                        onClick={
                            admin ?
                                () => navigate(`/users/${loggedInUser.id}/workouts/${id}/exercises`)
                                :
                                () => navigate(`/users/${loggedInUser.id}/communityworkouts/${id}/exercises`)}
                        style={{ position: 'absolute', top: 31, right: 0 }}

                    >View</Button>

                    <div style={{ display: 'flex', margin: '-30px 0', alignItems: 'center' }}>
                        <h3 style={{ fontSize: 30, marginRight: 8 }}>Workout Name: </h3>
                        <input
                            style={
                                { ...styles.div, width: 250 }
                            }
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                            disabled={editEnabled ? false : true}
                            maxLength={13}
                        />
                    </div>
                    <div style={{ display: 'flex', margin: '-30px 0', alignItems: 'center' }}>
                        <h3 style={{ fontSize: 30, marginRight: 8 }}>Workout Link: </h3>
                        <input
                            style={
                                { ...styles.div, width: 250 }
                            }
                            value={workoutLink}
                            onChange={(e) => setWorkoutLink(e.target.value)}
                            disabled={editEnabled ? false : true}
                            maxLength={13}
                        />
                    </div>


                    <div style={{ display: 'flex', margin: '-30px 0', alignItems: 'center' }}>
                        <h3 style={{ fontSize: 30, marginRight: 8 }}>Workout Type: </h3>
                        <textarea
                            style={
                                { ...styles.div, resize: 'none' }
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
                        <h3>Date and time: {dayjs(datetime).format('dddd, MMMM D, YYYY') + ' at ' + dayjs(datetime).format('HH:mm')}</h3>
                        {editEnabled &&
                            <>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        disablePast

                                        value={dateTime}
                                        onChange={(value) => {
                                            setDateTime(value)
                                        }}
                                    />
                                </LocalizationProvider>
                            </>}
                    </div>


                    {editEnabled === false && admin === true ?
                        <Button
                        
                            variant='contained'
                            onClick={() => setEditEnabled(true)}>Edit</Button> :
                        null
                    }
                    {editEnabled ?
                        <div>
                            <Button
                                style={{marginRight: 5 }}
                                disabled={isLoading ? true : false}
                                variant='contained'
                                onClick={() => cancelEdit()}>Cancel</Button>
                            <Button
                            disabled={isLoading ? true : false}
                                variant='contained'
                                type='submit'>
                                     {isLoading ? <CircularProgress/> : 'Save'}
                                    </Button>
                        </div>
                        :
                        null
                    }
                </div>
            </form>


            {admin === true ? <Button
            disabled={isLoading ? true : false}
                variant='contained'
                onClick={handleDelete}
                style={{marginTop: 5}}
            >   
                {isLoading ? <CircularProgress/> : 'Delete'}
                </Button> : null}

            {/* Only if workout is joined show delete button */}

            {admin === false && user === true ? <Button
            disabled={isLoading ? true : false}
                variant='contained'
                onClick={handleDeleteJoined}
            >
                {isLoading ? <CircularProgress/> : 'Delete'}
              </Button> : null}

            {admin === false && user === false ? <Button
            disabled={isLoading ? true : false}
                onClick={() => handleJoinWorkout()}
                variant='contained'
            >
                {isLoading ? <CircularProgress/> : 'Join'}
                </Button> : null}

            {admin === true && accessible === false ? <Button
                style={{marginTop:5, marginLeft: 5}}
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
                    disabled={isLoading ? true : false}
                        variant='contained'
                        type='submit'>
                            {isLoading ? <CircularProgress/> : 'Set New Time'}
                            </Button>
                    <Button
                        variant='contained'
                        onClick={() => setShowDate(false)}
                    >Cancel</Button>
                </form>}

        </motion.div>
    )
}

export default WorkoutCard