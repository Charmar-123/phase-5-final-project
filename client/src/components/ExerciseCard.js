import React, { useState, useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import benchPress from '../assets/videos/bench-press.mp4'
import AutoTypeInput from './AutoTypeInput';
import { UserContext } from './UserContext.js'

import { useParams } from 'react-router-dom';
// t.string "name"
// t.string "sets"
// t.string "reps"
// t.string "weight"
// t.string "target_area"
// t.string "description"

const ExerciseCard = ({ selectedExercise }) => {
    const [isEditing, setIsEditing] = useState(false);
    const params = useParams();
    const { deleteExercise } = useContext(UserContext)
    const navigate = useNavigate();

    // console.log(selectedExercise.name);
    const { id, name, reps, sets, rest, description, video_url } = selectedExercise

    const [formData, setFormData] = useState({
        name: '',
        reps: "",
        sets: "",
        rest: "",
        description: "",
        video_url: "",
    })
    useEffect(() => {
        setFormData({
            name: name,
            reps: reps,
            sets: sets,
            rest: rest,
            description: description,
            video_url: video_url
        })
    }, [selectedExercise])
    const videoKey = id
    const handleDeleteCard = () => {
        fetch(`/exercises/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    deleteExercise(id, params.workoutId)

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
        })
    }
    const handleSaveCard = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    if (!selectedExercise) return <h1>Loading</h1>
    return (
        <Card sx={{
            textAlign: 'left',
            maxWidth: 345,
            boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"



        }}>
            <CardMedia key={videoKey}>
                <video autoPlay loop muted style={{ width: 345, height: 194 }}>
                    <source
                        src={video_url}
                        type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
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
                        <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                            {description}
                        </Typography>}


                </Box>
                <CardActions>
                    {isEditing ?
                        <>
                            <Button
                                variant='contained'
                                color='success'>Save</Button>
                            <Button
                                variant='contained'
                                onClick={() => handleCancelCard()}>Cancel</Button>
                        </>
                        :
                        <Button
                            onClick={() => handleEditCard()}
                            variant='contained' >Edit</Button>}
                    <Button
                        onClick={() => handleDeleteCard()}
                        color='error'
                        variant='contained'>Delete</Button>
                </CardActions>
            </CardContent>

        </Card>
    )
}



export default ExerciseCard