import React, { useContext, useState, useEffect } from 'react';

import { Container, Typography, TextField, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { UserContext } from './UserContext.js'
import treadmillVideo from '../assets/videos/treadmill.mp4'

const PatientPortal = () => {


    const navigate = useNavigate();
    const { setLoggedInUser, loggedInUser } = useContext(UserContext);



    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState(null)


    useEffect(() => {
        if (loggedInUser){
            navigate(`/users/${loggedInUser.id}`)
        }

    }, [])




    const handleChange = (e) => {

        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })
    }


    const { email, password } = loginData;
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password

        }

        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (res.ok) {
                    res.json().then(user => {
                        // console.log(user);
                        setLoggedInUser(user)
                        navigate(`/users/${user.id}`)
                    })
                }
                else {
                    res.json().then(json => {

                        console.log(json);
                        setErrors(json.errors)
                    })
                }
            })
    }


    return (

        <div>
            <div
                style={{
                    position: 'relative'
                }}
            >
                <video
                    autoPlay
                    muted
                    style={{

                        opacity: 0.9, width: '100%'
                    }}
                    loop
                >
                    <source src={treadmillVideo} />


                </video>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100vh', // Adjust this as needed for vertical centering

                        position: 'absolute', // Position the centered div
                        top: 0,
                        left: 0,
                    }}
                >
                    <div
                        style={{
                            flexDirection: "column",
                            display: 'flex',
                            // justifyContent: 'center',
                            alignItems: 'center',
                            // opacity: 0.5,
                            width: 600,
                            height: 400,
                            backgroundColor: 'rgba(255, 0, 0, 0.8)',
                            borderRadius: 12
                        }}>

                        <h1

                            style={{ marginTop: 100, fontFamily: 'CardFont', fontWeight: '950', }}
                        >Welcome Back!</h1>
                        <form onSubmit={handleSubmit}>
                            <div
                                style={{ marginTop: 20 }}

                            >
                                <input
                                    style={{
                                        fontSize: 20, fontFamily: 'CardFont', fontWeight: '950',
                                        marginRight: 10,
                                        width: 200, height: 40, border: "solid",
                                        borderRadius: 8
                                    }}
                                    placeholder='Email Address'
                                    name='email'
                                    value={email}
                                    onChange={handleChange}
                                ></input>
                                <input
                                    style={{
                                        fontSize: 20, fontFamily: 'CardFont', fontWeight: '950',
                                        width: 200, height: 40, border: "solid",
                                        borderRadius: 8
                                    }}
                                    placeholder='Password'
                                    name='password'
                                    type="password"
                                    value={password}
                                    onChange={handleChange}
                                ></input>
                            </div>
                            {errors ? <h6 style={{ fontSize: 15, margin: 0 }}>{errors}</h6> : null}
                            <button
                                style={{ fontSize: 20, fontFamily: 'CardFont', fontWeight: '950', width: 100, marginTop: 10, height: 30, borderRadius: 8 }}
                                type='submit'
                            >Sign In</button>
                            <a
                                style={{ marginLeft: 195, textDecoration: "none", color: "black", fontFamily: 'CardFont', fontWeight: '950', }}
                                href='/'>forgot password?</a>
                        </form>
                        <a style={{
                            fontSize: 15, fontFamily: 'CardFont', fontWeight: '950',
                         marginTop: 15, textDecoration: "none", color: "black",
                        }}
                        
                        href='/signup'>Don't have an account? Create one!</a>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default PatientPortal