import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, Box } from '@mui/material';

import benchPress from '../assets/videos/bench-press.mp4'
import AutoTypeInput from './AutoTypeInput';



// t.string "name"
// t.string "sets"
// t.string "reps"
// t.string "weight"
// t.string "target_area"
// t.string "description"

const WorkoutCard = ({ name, reps, sets, rest, description }) => {

    return (
        <Card sx={{
            maxWidth: 345, 

            boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"



        }}>
            <CardMedia>
                <video
                    style={{ width: 345, height: 194 }}
                    autoPlay
                    loop
                    muted
                >
                    <source src={benchPress} />
                </video>
            </CardMedia>
            <CardContent>
                <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h5" component="div">
                    Exercise:
                </Typography>
             <Typography sx={{ fontFamily: "CardFont", fontWeight: 800 }} gutterBottom variant="h4" component="div">
                        Dumbbell Press
                    </Typography>
                

                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                        Sets:
                    </Typography>
                
                        <Typography sx={{ fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                            4
                        </Typography>
                    


                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                        Rest:
                    </Typography>
              
                        <Typography sx={{ fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                            4
                        </Typography>
                    


                </Box>

                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                        Reps:
                    </Typography>
                <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                        20
                    </Typography>
                </Box>
                <Divider />
                <Box>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h6">
                        Description:
                    </Typography>
                
                        <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h5">
                            Push from an incline bench
                        </Typography>
                    

                </Box>
            </CardContent>

        </Card>
    )
}



export default WorkoutCard