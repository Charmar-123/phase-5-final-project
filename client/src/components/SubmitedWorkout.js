import React, { useState, useContext, useEffect } from 'react'
import AnimationWorkoutCard from './AnimationWorkoutCard'
import { AnimatePresence, motion } from 'framer-motion'
import { TextField, TextareaAutosize, Typography } from '@mui/material'
import AutoTypeInput from './AutoTypeInput'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext.js'
import { useParams } from 'react-router-dom';

import gymVideoWorkout from '../assets/videos/gym-video-workout.mp4'
const SubmitedWorkout = () => {
    const [name, setName] = useState("")
    const [reps, setReps] = useState()
    const [sets, setSets] = useState()
    const [rest, setRest] = useState()
    const [description, setDescription] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [errors, setErrors] = useState([])
    const [userInteracted, setUserInteracted] = useState(false)
    const navigate = useNavigate();
    const { loggedInUser, addExercise } = useContext(UserContext)
    const { workoutId } = useParams();
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
            duration: 1,
            ease: 'linear'
        }

    }

    const styles = {
        font: {
            fontSize: 50, fontFamily: 'CardFont', fontWeight: '950', marginBottom: 1
        },
        div: {
            marginBottom: -30
        }
    }

  
    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('sets', sets)
        formData.append('reps', reps)
        formData.append('rest', rest)
        formData.append('description', description)
        formData.append('workout_id', workoutId)
        formData.append('video', selectedFile)

        fetch('/exercises', {
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-Type': 'multipart/form-data'
            }
        })

        .then(res => {
            if (res.ok) {
                res.json().then((exercise) => {
                    // console.log(exercise);
                    addExercise(exercise, workoutId)
                    navigate(`/users/${loggedInUser.id}/workouts/${workoutId}/exercises`)
                    // console.log("success");
                })
            } else {
                res.json().then(data => {
                    setErrors(data.errors)
                    console.log(data.errors);
                })
            }
        })
  
    }
    useEffect(() => {
        const fileName = 'gym-video-workout.mp4';

        fetch(gymVideoWorkout)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], fileName);
                // console.log(file);
                setSelectedFile(file)
            })
    }, [])
    return (

        <form onSubmit={handleSubmit}>
            <motion.div
                variants={titleVaritants}
                style={{
                    minHeight: '100vh', paddingLeft: 70, display: 'flex', flexDirection: 'row',
                    background: 'linear-gradient(90deg, rgba(244,180,107,1) 12%, rgba(249,255,0,1) 46%)'
                }} >

                <motion.div
                    variants={titleVaritants}
                    initial="hidden"
                    animate="show"

                >
                    <motion.div
                        variants={titleItem}

                        style={{ ...styles.div, marginTop: -15 }}>
                        <h1 style={styles.font} >Let's add an exercise!</h1>

                    </motion.div>

                    <motion.div
                        variants={titleItem}

                        onClick={() => setUserInteracted(true)}
                        style={{ ...styles.div, marginBottom: -25 }}
                    >
                        <h3 style={{ ...styles.font, fontSize: 25 }}>Add a video.</h3>
                        <label

                            style={{
                                border: "solid",
                                background: "white",

                                borderRadius: 16,
                                width: 150, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20, fontFamily: 'CardFont', fontWeight: '950',

                            }}>
                            <input
                                id='file-upload'
                                style={{ display: 'none' }}
                                type='file' accept='video/*'
                                onChange={(e) => {
                                    setSelectedFile(e.target.files[0])
                                }}


                            />
                            Select Video
                        </label>


                    </motion.div>
                    <motion.div
                        variants={titleItem}
                        onClick={() => setUserInteracted(true)}
                        style={styles.div}
                    >
                        <h3 style={{ ...styles.font, fontSize: 25 }}>What's is called?</h3>


                        {userInteracted ? <motion.input
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            style={{

                                fontSize: 35, fontFamily: 'CardFont', fontWeight: '800',
                                border: "solid",
                                borderRadius: 9, width: 300,
                                height: 50, resize: "none", outline: "none"

                            }}
                            onChange={(e) => {
                                // console.log(e.target.value);
                                setName(e.target.value)
                            }}
                            maxLength={13}
                        /> :


                            <AutoTypeInput
                                paddingLeft={4}
                                delay={4}
                                text={'Dumbbell Press'}
                            />



                        }



                    </motion.div>


                    <motion.div
                        variants={titleItem}
                        onClick={() => setUserInteracted(true)}
                        style={styles.div}
                    >
                        <h3 variants={titleItem} style={{ ...styles.font, fontSize: 25 }}>How many Sets total?</h3>


                        {userInteracted ? <motion.input
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            style={{

                                fontSize: 35, fontFamily: 'CardFont', fontWeight: '800',
                                border: "solid",
                                borderRadius: 9, width: 300,
                                height: 50, resize: "none", outline: "none"

                            }}
                            onChange={(e) => {
                                // console.log(e.target.value);
                                setSets(e.target.value)
                            }}
                            min={0}
                            type='number'
                        /> : <AutoTypeInput
                            paddingLeft={4}
                            delay={5}
                            text={'4'}
                        />}
                    </motion.div>
                    <motion.div
                        variants={titleItem}
                        onClick={() => setUserInteracted(true)}
                        style={styles.div}
                    >
                        <h3 variants={titleItem} style={{ ...styles.font, fontSize: 25 }}>Rest in seconds between sets?</h3>


                        {userInteracted ? <motion.input
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            style={{

                                fontSize: 35, fontFamily: 'CardFont', fontWeight: '800',
                                border: "solid",
                                borderRadius: 9, width: 300,
                                height: 50, resize: "none", outline: "none"

                            }}
                            type='number'
                            min={0}
                            onChange={(e) => {
                                // console.log(e.target.value);
                                setRest(e.target.value)
                            }}
                            maxLength={15}
                        /> : <AutoTypeInput
                            paddingLeft={4}
                            delay={6}
                            text={'30'}
                        />}
                    </motion.div>
                    <motion.div
                        variants={titleItem}
                        onClick={() => setUserInteracted(true)}
                        style={styles.div}
                    >
                        <h3 variants={titleItem} style={{ ...styles.font, fontSize: 25 }}>How many reps in a set?</h3>


                        {userInteracted ? <motion.input
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            style={{

                                fontSize: 35, fontFamily: 'CardFont', fontWeight: '800',
                                border: "solid",
                                borderRadius: 9, width: 300,
                                height: 50, resize: "none", outline: "none"

                            }}
                            type='number'
                            min={0}
                            onChange={(e) => {
                                // console.log(e.target.value);
                                setReps(e.target.value)
                            }}
                            maxLength={15}
                        /> : <AutoTypeInput
                            paddingLeft={4}
                            delay={7}
                            text={'20'}
                        />}
                    </motion.div>

                    <motion.div
                        variants={titleItem}
                        onClick={() => setUserInteracted(true)}
                        style={{ ...styles.div, marginBottom: 0 }}
                    >
                        <h3 variants={titleItem} style={{ ...styles.font, fontSize: 25 }}>Describe the exercise.</h3>


                        {userInteracted ?

                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}>
                                <TextareaAutosize
                                    style={{
                                        fontSize: 35, fontFamily: 'CardFont', fontWeight: '800',
                                        border: "solid",
                                        borderRadius: 9, width: 300,
                                        minHeight: 50, resize: "none", outline: "none"
                                    }}

                                    onChange={(e) => {
                                        // console.log(e.target.value);
                                        setDescription(e.target.value)
                                    }}
                                    maxLength={100}       >
                                </TextareaAutosize>

                            </motion.div>

                            :
                            <AutoTypeInput
                                paddingLeft={4}
                                delay={8}
                                text={'Push up at  45 deg from a flat  bench'}
                            />}
                    </motion.div>





                    <motion.p variants={titleItem} style={{ ...styles.font, fontSize: 10 }}>*If you had 2 set of 20 reps on the bench press then you would do 20 bench presses rest for 2 minutes and then do another 20</motion.p>
                    <motion.button variants={titleItem} style={{ ...styles.font, fontSize: 20, borderRadius: 16, height: 50 }}>Create Exercise!</motion.button>
                    <motion.button 
                    onClick={() => navigate(`/users/${loggedInUser.id}/workouts/${workoutId}/exercises`)}
                    variants={titleItem} style={{ ...styles.font, fontSize: 20, borderRadius: 16, height: 50, marginLeft: 10 }}>Cancel</motion.button>
                </motion.div>

                <motion.div
                    initial={{ x: 500, y: -500, opacity: 0.2, rotate: "90deg" }}
                    animate={{ x: 0, y: 0, opacity: 1, rotate: "0deg" }}
                    transition={{
                        ease: 'linear',
                        duration: 3
                    }}
                    style={{ marginTop: 5 }}
                >
                    <AnimationWorkoutCard userInteracted={userInteracted}
                        name={name}
                        sets={sets}
                        reps={reps}
                        rest={rest}
                        description={description}
                        selectedFile={selectedFile}
                    />
                </motion.div>

            </motion.div>

            

        </form>


    )
}

export default SubmitedWorkout
