import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

import benchPress from '../assets/videos/bench-press.mp4'



// t.string "name"
// t.string "sets"
// t.string "reps"
// t.string "weight"
// t.string "target_area"
// t.string "description"

const WorkoutCard = () => {
    return (
        <Card sx={{ maxWidth: 345 }}>
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
                <Typography gutterBottom variant="h5" component="div">
                    Exercise: Dumbell Press
                </Typography>
                <Divider />
                <Typography variant="body1">
                    Sets: 4
                </Typography>
                <Divider />
                <Typography variant="body1">
                    Reps: 20
                </Typography>
                <Divider />
                <Typography variant="body1">
                    Description: Push from an incline bench.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default WorkoutCard