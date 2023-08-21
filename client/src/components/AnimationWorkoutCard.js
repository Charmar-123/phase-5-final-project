import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, Box, TextareaAutosize } from '@mui/material';

import benchPress from '../assets/videos/bench-press.mp4'
import AutoTypeInput from './AutoTypeInput';
import AnimationVideo from './AnimationVideo';



// t.string "name"
// t.string "sets"
// t.string "reps"
// t.string "weight"
// t.string "target_area"
// t.string "description"

const AnimationWorkoutCard = ({ userInteracted, name, reps, sets, rest, description, selectedFile }) => {

    const renderVideo = () => {
        if (userInteracted && selectedFile) {
            return (
                <video autoPlay loop muted style={{ width: 345, height: 194 }}>
                    <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
                    Your browser does not support the video tag.
                </video>
            )
        } else if (userInteracted) {
            return (<h1></h1>)
        } else {
            return (
                <AnimationVideo />
            )
        }
    }
    return (
        <Card sx={{
            width: 345, marginLeft: 20,

            boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"



        }}>
            <CardMedia
                sx={{ minHeight: 200, }}
            >

                {renderVideo()}
            </CardMedia>
            <CardContent>
                <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h5" component="div">
                    Exercise:
                </Typography>
                {userInteracted ?
                    <Typography sx={{ fontFamily: "CardFont", fontWeight: 800 }} gutterBottom variant="h4" component="div">
                        {name}
                    </Typography> : <AutoTypeInput
                        text='Dumbbell Press'
                        delay={4}
                        border={false}
                    />
                }

                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                        Sets:
                    </Typography>
                    {userInteracted ?


                        <Typography sx={{ fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                            {sets}
                        </Typography> :
                        <AutoTypeInput
                            fontSize={25}
                            text="4"
                            delay={5}
                            border={false}
                        />
                    }


                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                        Rest:
                    </Typography>
                    {userInteracted ?


                        <Typography sx={{ fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                            {rest} seconds
                        </Typography>
                        :
                        <AutoTypeInput
                            fontSize={25}
                            text="30 Seconds"
                            delay={6}
                            border={false}
                        />
                    }


                </Box>

                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                        Reps:
                    </Typography>
                    {userInteracted ? <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                        {reps}
                    </Typography> :
                        <AutoTypeInput
                            fontSize={25}
                            text="20"
                            delay={7}
                            border={false}
                        />}
                </Box>
                <Divider />
                <Box sx={{ display: 'inline-block' }}>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                        Description:
                    </Typography>
                    {userInteracted ?
                        <Typography

                            sx={{ display: 'inline-block', wordBreak: 'break-word', marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                            {description}
                        </Typography>
                        :
                        <AutoTypeInput
                            fontSize={25}
                            text="Push up at  45 deg from a   flat bench"
                            delay={8}
                            border={false}
                        />
                    }

                </Box>
            </CardContent>

        </Card>
    )
}



export default AnimationWorkoutCard