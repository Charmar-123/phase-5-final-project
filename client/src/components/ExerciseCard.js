import React, { useState, useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, Box, TextareaAutosize, CircularProgress } from '@mui/material';


import { UserContext } from './UserContext.js'

import { useParams } from 'react-router-dom';

const ExerciseCard = ({ selectedExercise }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [displayVideo, setDisplayVideo] = useState()
    const [errors, setErrors] = useState([])
    const params = useParams();
    const { deleteExercise, updateExercise } = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(false)

    const { id, name, reps, sets, rest, description, video_url } = selectedExercise
    const videoKey = displayVideo
    const [formData, setFormData] = useState({
        name: '',
        reps: "",
        sets: "",
        rest: "",
        description: "",
        video_url: "",
        video: null,
    })
    useEffect(() => {
        setFormData({
            name: name,
            reps: reps,
            sets: sets,
            rest: rest,
            description: description,
            video_url: video_url,
            video: null
        })
        setDisplayVideo(video_url)
    }, [selectedExercise])

    const handleDeleteCard = () => {
        setIsLoading(true)
        fetch(`/api/exercises/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    deleteExercise(id, params.workoutId)
                    setIsLoading(false)

                }
            })
    }

    const handleEditCard = () => {
        setIsEditing(true);
    }
    const handleCancelCard = () => {
        setIsEditing(false);
        setFormData({
            name: name,
            reps: reps,
            sets: sets,
            rest: rest,
            description: description,
            video_url: video_url,
            video: null
        })
        setDisplayVideo(video_url)
        // console.log(video_url);
        setErrors([])
    }
    const handleSaveCard = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formDataToPatch = new FormData();

        // Append each field to the FormData
        formDataToPatch.append('name', formData.name);
        formDataToPatch.append('reps', formData.reps);
        formDataToPatch.append('sets', formData.sets);
        formDataToPatch.append('rest', formData.rest);
        formDataToPatch.append('description', formData.description);

        // Append the video file if it's present
        if (formData.video) {
            formDataToPatch.append('video', formData.video);
        }

        // console.log(formDataToPatch);
        fetch(`/api/exercises/${id}`, {
            method: 'PATCH',
            body: formDataToPatch,
            headers: {   // 'Content-Type': 'multipart/form-data' 
            },
        }).then(res => {
            if (res.ok) {
                res.json().then((exercise) => {
                    updateExercise(exercise, params.workoutId)
                    setIsEditing(false);
                    setIsLoading(false)
                    setErrors([])
                })
            } else {
                res.json().then(json => {
                    console.log(json.errors);
                    setErrors(json.errors)
                    setIsLoading(false)
                })
            }
        })

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const handleVideoChange = (e) => {
        const selectedFile = e.target.files[0];

        setFormData({
            ...formData,
            video: selectedFile,
        });
        setDisplayVideo(URL.createObjectURL(selectedFile));

    };
    if (!selectedExercise) return <h1>Loading</h1>
    return (

        <form onSubmit={handleSaveCard}>


            <Card sx={{
                textAlign: 'left',
                maxWidth: 345,
                boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"



            }}>
                <CardMedia key={videoKey}>
                    {isEditing ?
                        <div style={{ display: 'flex', justifyContent: 'center', }}>
                            <div style={{ opacity: 0.5 }}>
                                <video autoPlay loop muted style={{ width: 345, height: 194 }}>
                                    <source
                                        src={displayVideo}
                                        type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div style={{
                                position: 'absolute', zIndex: 1000,
                                marginTop: '100px'
                            }}>
                                <label style={{
                                    display: 'inline-block',
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: 'grey',
                                    textAlign: 'center',
                                    lineHeight: '50px',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    <input
                                        type='file'
                                        accept='video/*'
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0,
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            cursor: 'pointer',
                                        }}
                                        onChange={(e) => {
                                            handleVideoChange(e)
                                            // console.log("Changed")
                                        }
                                        }
                                    />
                                    Edit
                                </label>

                            </div>

                        </div>

                        : <video autoPlay loop muted style={{ width: 345, height: 194 }}>
                            <source
                                src={displayVideo}
                                type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    }
                </CardMedia>
                <CardContent>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800, }} variant="h5" component="div">
                        Exercise:
                    </Typography>
                    {isEditing ?
                        <input
                            style={{
                                fontSize: '30px', fontFamily: "CardFont", fontWeight: 800, width: "300px"
                            }}
                            name='name'
                            value={formData.name}
                            maxLength={13}
                            onChange={(e) => handleChange(e)}
                        />
                        :
                        <Typography sx={{ fontFamily: "CardFont", fontWeight: 800 }} gutterBottom variant="h4" component="div">
                            {name}
                        </Typography>}
                        {errors ? <h4 style={{ fontSize: 15, margin: 0, color: "red" }}>{errors.name}</h4> : null}

                    <Divider />
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                            Sets:
                        </Typography>

                        {isEditing ?
                            <input
                                type='number'
                                min="0"
                                style={{
                                    fontSize: '30px', fontFamily: "CardFont", fontWeight: 800, width: "150px"
                                }}
                                name='sets'
                                value={formData.sets}
                                maxLength={13}
                                onChange={(e) => handleChange(e)}
                            />
                            : <Typography sx={{ fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                                {sets}
                            </Typography>}



                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                            Rest:
                        </Typography>

                        {isEditing ?
                            <input
                                min="0"
                                type='number'
                                style={{
                                    fontSize: '30px', fontFamily: "CardFont", fontWeight: 800, width: "150px"
                                }}
                                name='rest'
                                value={formData.rest}
                                maxLength={13}
                                onChange={(e) => handleChange(e)}
                            /> :
                            <Typography sx={{ fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                                {rest}
                            </Typography>
                        }


                    </Box>

                    <Divider />
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                            Reps:
                        </Typography>
                        {isEditing ?
                            <input
                                min="0"
                                type='number'
                                style={{
                                    fontSize: '30px', fontFamily: "CardFont", fontWeight: 800, width: "150px"
                                }}
                                name='reps'
                                value={formData.reps}
                                maxLength={13}
                                onChange={(e) => handleChange(e)}
                            /> :
                            <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                                {reps}
                            </Typography>}
                    </Box>
                    <Divider />
                    <Box>
                        <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                            Description:
                        </Typography>

                        {isEditing ?
                            <textarea
                                style={{
                                    fontSize: '30px', fontFamily: "CardFont", fontWeight: 800, width: "300px", resize: 'none'
                                }}
                                name='description'
                                value={formData.description}
                                maxLength={150}
                                onChange={(e) => handleChange(e)}
                            /> :
                            <TextareaAutosize
                                disabled
                                style={{
                                    backgroundColor: "white",
                                    fontSize: 15, fontFamily: 'CardFont', fontWeight: '800',
                                    border: "none",
                                    width: 300,
                                    minHeight: 50, resize: "none", outline: "none"
                                }}
                                value={description}
                            ></TextareaAutosize>
                        }


                    </Box>
                    <CardActions>
                        {isEditing ?
                            <>
                                <Button
                                    disabled={isLoading ? true : false}
                                    variant='contained'
                                    color='success'
                                    type='submit'
                                >
                                    {isLoading ? <CircularProgress /> : 'Save'}
                                    </Button>
                                <Button
                                    variant='contained'
                                    onClick={() => handleCancelCard()}>Cancel</Button>
                            </>
                            :
                            <Button
                                onClick={() => handleEditCard()}
                                variant='contained' >Edit</Button>}
                        <Button
                            disabled={isLoading ? true : false}
                            onClick={() => handleDeleteCard()}
                            color='error'
                            variant='contained'>
                                {isLoading ? <CircularProgress /> : 'Delete'}
                                </Button>
                    </CardActions>
                </CardContent>

            </Card>
        </form>
    )
}



export default ExerciseCard