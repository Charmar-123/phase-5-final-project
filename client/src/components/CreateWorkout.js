
import React, { useState } from 'react'
import { motion } from "framer-motion";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import RatingsDropdown from './RatingsDropdown';

const CreateWorkout = () => {
    const [workoutName, setWorkoutName] = useState('')
    const [dateTime, setDateTime] = useState(dayjs().add(5, "minute"))
    const [workoutExerciseType, setWorkoutExerciseType] = useState('')

    const [workoutIntensity, setWorkoutIntensity] = useState('')


    const styles = {
        ' input:focus': {
            outline: 'none',
            borderColor: '#719ECE',
        }
    }



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

        fetch('/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: workoutName,
                datetime: dateTime,
                workout_type: workoutExerciseType,
                intensity: workoutIntensity
            })
        })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            console.log('Response data:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }



    return (

        <form onSubmit={handleSubmit}
            style={{
                height: '130vh',
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
                            style={{ width: 200, height: 50, borderRadius: 5, fontFamily: 'CardFont', fontWeight: '950', fontSize: 25, }}
                        />


                    </div>

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
                </motion.div>
                <div style={{ display: 'flex'}}>
                    <motion.div
                        style={{ marginRight: 40, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                        variants={titleItem}>
                        <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 45, marginTop: 10, marginBottom: 0 }}>Tell Us About It!</h1>
                        <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 25, }}>What equipment do we need and what type of workout is it.</h1>

                        <textarea
                            style={{ fontFamily: 'CardFont', fontWeight: '950', width: 300, borderRadius: 10, height: 200, fontSize: 15, resize: 'none', padding: '8px', outline: 'none', borderWidth: 2 }}
                            maxLength={300}
                            placeholder='Write here...(max 300 characters)'
                            onChange={(e) => setWorkoutExerciseType(e.target.value)}
                        >
                        </textarea>

                        <button
                            type='submit'
                            style={{
                                fontSize: 20, fontFamily: 'CardFont', fontWeight: '950', marginTop: 10, width: 200, height: 50, borderRadius: 10,

                                background: 'linear-gradient(90deg, rgba(107,227,244,1) 12%, rgba(249,255,0,1) 79%)'
                            }}>Create Workout!</button>

                    </motion.div>

                    <RatingsDropdown setWorkoutIntensity={setWorkoutIntensity} titleItem={titleItem} />
                </div>





            </motion.div>

        </form>

    )
}



export default CreateWorkout