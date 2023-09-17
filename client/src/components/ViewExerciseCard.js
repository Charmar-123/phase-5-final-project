import React, { useState, useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, Box, TextareaAutosize } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import benchPress from '../assets/videos/bench-press.mp4'
import AutoTypeInput from './AutoTypeInput';
import { UserContext } from './UserContext.js'

import { useParams } from 'react-router-dom';

const ViewExerciseCard = ({ selectedExercise }) => {
    const [displayVideo, setDisplayVideo] = useState()

    const params = useParams();
    const { deleteExercise, updateExercise } = useContext(UserContext)
    const navigate = useNavigate();
    // const [selectedFile, setSelectedFile] = useState(null)

    // console.log(selectedExercise.name);
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
                        src={displayVideo}
                        type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

            </CardMedia>
            <CardContent>
                <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800, }} variant="h5" component="div">
                    Exercise:
                </Typography>

                <Typography sx={{ fontFamily: "CardFont", fontWeight: 800 }} gutterBottom variant="h4" component="div">
                    {name}
                </Typography>


                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                        Sets:
                    </Typography>

                    <Typography sx={{ fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                        {sets}
                    </Typography>



                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                        Rest:
                    </Typography>


                    <Typography sx={{ fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                        {rest}
                    </Typography>



                </Box>

                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                        Reps:
                    </Typography>

                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                        {reps}
                    </Typography>
                </Box>
                <Divider />
                <Box>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                        Description:
                    </Typography>


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



                </Box>

            </CardContent>

        </Card>

    )
}



export default ViewExerciseCard