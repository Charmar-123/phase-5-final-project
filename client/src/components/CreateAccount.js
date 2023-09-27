import React, { useState, useContext, useEffect } from 'react'
import AnimationWorkoutCard from './AnimationWorkoutCard'
import { AnimatePresence, motion } from 'framer-motion'
import { CircularProgress, TextField, TextareaAutosize, Typography } from '@mui/material'
import AutoTypeInput from './AutoTypeInput'
import { useNavigate } from 'react-router-dom'

import { UserContext } from './UserContext.js'
import profilePic from '../assets/images/profile-pic.png'
const CreateAccount = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [errors, setErrors] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();
    const { setLoggedInUser } = useContext(UserContext)


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
        setIsLoading(true)
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('bio', bio)
        formData.append('password', password)
        formData.append('password_confirmation', confirmPassword)
        formData.append('profile_pic', selectedFile)

        fetch('/api/users', {
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-Type': 'multipart/form-data'
            }
        })

            .then(res => {
                if (res.ok) {
                    res.json().then((user) => {
                        console.log(user);
                        setLoggedInUser(user)
                        navigate(`/users/${user.id}/workouts/new`)
                        setIsLoading(false)
                    })
                } else {
                    res.json().then(data => {
                        setErrors(data.errors)
                        console.log(data.errors);
                        setIsLoading(false)
                    })
                }
            })

    }

    useEffect(() => {
        const fileName = 'profile-pic.png';

        fetch(profilePic)
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
                    minHeight: '105vh', paddingLeft: 70, display: 'flex', flexDirection: 'row',
                    background: 'linear-gradient(90deg, rgba(107,227,244,1) 0%, rgba(255,0,35,1) 97%)'
                }} >


                <motion.div
                    variants={titleVaritants}
                    initial="hidden"
                    animate="show"

                >
                    <motion.div
                        variants={titleItem}

                        style={{ ...styles.div, marginTop: -15 }}>
                        <h1 style={styles.font} >Get ready to embark on your fitness journey!</h1>

                    </motion.div>

                    <motion.div
                        variants={titleItem}


                        style={{ ...styles.div, marginBottom: -25, display: 'flex', flexDirection: "row", marginTop: 40 }}
                    >
                        <div style={{ marginRight: 30 }}>
                            <h3 style={{ ...styles.font, fontSize: 25 }}>Add a photo!</h3>
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
                                    type='file' accept='image/*'
                                    onChange={(e) => {
                                        // console.log(profilePic);
                                        // console.log(e.target.files[0]);
                                        setSelectedFile(e.target.files[0])

                                    }}


                                />
                                Select Photo
                            </label>
                        </div>


                        <div
                            style={{ backgroundColor: "blue", width: 200, height: 200, borderRadius: '50%', overflow: 'hidden' }}
                        >
                            <img
                                src={selectedFile && URL.createObjectURL(selectedFile)}

                                alt="Uploaded "
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                    </motion.div>
                    <motion.div
                        variants={titleItem}
                        style={styles.div}
                    >
                        <h3 style={{ ...styles.font, fontSize: 25 }}>Tell us your full name!</h3>


                        <motion.input
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

                        />

                        {errors.name && errors.name.map((error, index) => {
                            return (<h6 key={index} style={{ margin: 0 }}>{error}</h6>)
                        })}
                    </motion.div>


                    <motion.div
                        variants={titleItem}
                        style={styles.div}
                    >
                        <h3 variants={titleItem} style={{ ...styles.font, fontSize: 25 }}>What's your email address?</h3>

                        <motion.input
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
                                setEmail(e.target.value)
                            }}

                        />
                        {errors.email && errors.email.map((error, index) => {
                            return (<h6 key={index} style={{ margin: 0 }}>{error}</h6>)
                        })}
                    </motion.div>
                    <motion.div
                        variants={titleItem}
                        style={styles.div}
                    >
                        <h3 variants={titleItem} style={{ ...styles.font, fontSize: 25 }}>Pick a password.</h3>

                        <motion.input
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
                                setPassword(e.target.value)
                            }}
                            type='password'

                        />
                        {errors.password && errors.password.map((error, index) => {
                            return (<h6 key={index} style={{ margin: 0 }}>{error}</h6>)
                        })}

                    </motion.div>
                    <motion.div
                        variants={titleItem}
                        style={styles.div}
                    >
                        <h3 variants={titleItem} style={{ ...styles.font, fontSize: 25 }}>Confirm your password.</h3>


                        <motion.input
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
                                setConfirmPassword(e.target.value)
                            }}
                            type='password'

                        />
                        {errors.password_confirmation && errors.password_confirmation.map((error, index) => {
                            return (<h6 key={index} style={{ margin: 0 }}>{error}</h6>)
                        })}
                    </motion.div>

                    <motion.div
                        variants={titleItem}
                        style={{ ...styles.div, marginBottom: 0 }}
                    >
                        <h3 variants={titleItem} style={{ ...styles.font, fontSize: 25 }}>Tell us a bit about yourself!</h3>



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
                                    setBio(e.target.value)
                                }}
                                maxLength={100}       >
                            </TextareaAutosize>

                        </motion.div>



                    </motion.div>

                    <motion.button
                        type='submit'
                        disabled={isLoading ? true : false}
                        variants={titleItem} 
                        style={{ ...styles.font, fontSize: 20, borderRadius: 16, height: 50 }}>
                        {isLoading ? <CircularProgress /> : 'Create Account!'}
                        {/* <CircularProgress/> */}
                    </motion.button>
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

                </motion.div>

            </motion.div>



        </form>

    )
}

export default CreateAccount