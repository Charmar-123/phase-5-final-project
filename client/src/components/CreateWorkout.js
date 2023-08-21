import { Box, TextField, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import { motion } from "framer-motion";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import RatingsDropdown from './RatingsDropdown';
import Textarea from '@mui/joy/Textarea';
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




    return (

        <div
            style={{
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
                    <Typography sx={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4 }} variant='h4'>Pick A Date And Time</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <DateTimePicker
                            disablePast
                            label="Pick A Date And Time"
                            value={dateTime}
                            onChange={(value) => setDateTime(value)}
                        />

                    </LocalizationProvider>
                </motion.div>
                <div style={{ display: 'flex' }}>
                    <motion.div
                        style={{ marginRight: 40, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                        variants={titleItem}>
                        <Typography sx={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4 }} variant='h3'>Tell Us About It!</Typography>
                        <Typography sx={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 1 }} variant='h5'>What equipment do we need and what type of workout is it.</Typography>

                        <textarea
                            style={{ width: 300, borderRadius: 10, height: 200, fontSize: 15, resize: 'none', padding: '8px', outline: 'none' }}
                            maxLength={300}
                            placeholder='Write here...(max 300 characters)'
                        >
                        </textarea>

                        <Button
                            variant='contained'
                            sx={{ marginTop: 10, background: 'linear-gradient(90deg, rgba(50,78,152,1) 6%, rgba(107,155,244,1) 47%, rgba(0,9,255,1) 60%)' }}>Submit</Button>

                    </motion.div>

                    <RatingsDropdown titleItem={titleItem} />
                </div>





            </motion.div>

        </div>

    )
}



export default CreateWorkout