
import React, { useState, useContext } from 'react'
import { motion } from "framer-motion";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import RatingsDropdown from './RatingsDropdown';
import { useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext.js'
import { CircularProgress } from '@mui/material';

const CreateWorkout = () => {
    const [workoutName, setWorkoutName] = useState('')
    const [zoomLink, setZoomLink] = useState('')
    const [dateTime, setDateTime] = useState(dayjs().add(5, "minute"))
    const [isLoading, setIsLoading] = useState(false)
    const [workoutExerciseType, setWorkoutExerciseType] = useState('')
    const [errors, setErrors] = useState([])
    const [workoutIntensity, setWorkoutIntensity] = useState('')
    const navigate = useNavigate();
    const { loggedInUser, addWorkout } = useContext(UserContext)




    const titleVaritants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5
            }
        }


    }

    const titleItem = {
        hidden: { opacity: 0 },

        show: { opacity: 1, scale: 1 },
        transition: {
            duration: 5,
            ease: [0, 0.71, 0.2, 1.01]
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        fetch('/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: workoutName,
                zoom_link: zoomLink,
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
                        addWorkout(workout)
                        navigate(`/users/${loggedInUser.id}/workouts/${workout.id}/exercises/new`)
                        setIsLoading(false)
                    })
                } else {
                    res.json().then(data => {
                        setErrors(data.errors)
                        // console.log(data.errors);
                        setIsLoading(false)
                    })
                }
            })
    }



    return (

        <form onSubmit={handleSubmit}
            style={{
                height: '160vh',
                marginTop: 0, paddingTop: 0, paddingLeft: 20,
                background: "linear-gradient(90deg, rgba(208,208,244,1) 5%, rgba(208,208,244,1) 17%, rgba(0,212,255,1) 50%)",

            }}
        >

            <motion.div

                variants={titleVaritants}
                initial="hidden"
                animate="show"
            >



                <motion.div
                    variants={titleItem}
                >

                    <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: 0 }}>Create Your Very Own Workout!</h1>
                </motion.div>
                <motion.div
                    variants={titleItem}>
                    <div

                    >
                        <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 35, marginTop: 0 }}>Give It A Name!</h1>


                        <input
                            placeholder='Workout Name'
                            onChange={(e) => setWorkoutName(e.target.value)}
                            style={{ width: 200, height: 50, borderRadius: 5, fontFamily: 'CardFont', fontWeight: '950', fontSize: 25, outline: "none" }}
                            maxLength={15}
                        />


                    </div>
                    {errors.name && errors.name.map((error, index) => {
                        return (<h6 key={index} style={{ margin: 0 }}>{error}</h6>)
                    })}
                </motion.div>
                <motion.div
                    variants={titleItem}>
                    <div

                    >
                        <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 35, marginTop: 0 }}>Add A Zoom or Google Meets link!</h1>


                        <input
                            placeholder='Link'
                            onChange={(e) => setZoomLink(e.target.value)}
                            style={{ width: 500, height: 50, borderRadius: 5, fontFamily: 'CardFont', fontWeight: '950', fontSize: 25, outline: "none" }}
                        />


                    </div>
                    {errors.zoom_link && errors.zoom_link.map((error, index) => {
                        return (<h6 key={index} style={{ margin: 0 }}>{error}</h6>)
                    })}
                </motion.div>
                <motion.div
                    variants={titleItem}>
                    <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 35, marginTop: 10 }}>Pick A Date And Time.</h1>

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
                    {errors.datetime && errors.datetime.map((error, index) => {
                        return (<h6 key={index} style={{ margin: 0 }}>{error}</h6>)
                    })}
                </motion.div>
                <div style={{ display: 'flex' }}>
                    <motion.div
                        style={{ marginRight: 40, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                        variants={titleItem}>
                        <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 45, marginTop: 10, marginBottom: 0 }}>Tell Us About It!</h1>
                        <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 25, }}>What equipment do we need and what type of workout is it.</h1>

                        <textarea
                            style={{ fontFamily: 'CardFont', fontWeight: '950', width: 300, borderRadius: 10, height: 200, fontSize: 17, resize: 'none', padding: '8px', outline: 'none', borderWidth: 2 }}
                            maxLength={300}
                            placeholder='Write here...(max 300 characters)'
                            onChange={(e) => setWorkoutExerciseType(e.target.value)}
                        >
                        </textarea>
                        {errors.workout_type && errors.workout_type.map((error, index) => {
                            return (<h6 key={index} style={{ margin: 0 }}>{error}</h6>)
                        })}

                        <div>
                            <button
                                disabled = {isLoading ? true : false}
                                type='submit'
                                style={{
                                    fontSize: 20, fontFamily: 'CardFont', fontWeight: '950', marginTop: 10, width: 200, height: 50, borderRadius: 10, marginRight: 10,

                                    background: 'linear-gradient(90deg, rgba(107,227,244,1) 12%, rgba(249,255,0,1) 79%)'
                                }}>
                                    {isLoading ? <CircularProgress/> : 'Create Workout!'}
                                    </button>
                            <button
                                onClick={() => navigate(`/users/${loggedInUser.id}`)}
                                style={{
                                    fontSize: 20, fontFamily: 'CardFont', fontWeight: '950', marginTop: 10, width: 200, height: 50, borderRadius: 10,

                                    background: 'linear-gradient(90deg, rgba(107,227,244,1) 12%, rgba(249,255,0,1) 79%)'
                                }}>Skip</button>
                        </div>


                    </motion.div>

                    <div>
                        <RatingsDropdown setWorkoutIntensity={setWorkoutIntensity} titleItem={titleItem} />
                        {errors.intensity && errors.intensity.map((error, index) => {
                            return (<h6 key={index} style={{ margin: 0 }}>{error}</h6>)
                        })}
                    </div>

                </div>





            </motion.div>

        </form>

    )
}



export default CreateWorkout