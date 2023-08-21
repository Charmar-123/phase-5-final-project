import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';


const WorkoutCard = ({name}) => {

    return (

        <motion.div
        style={{userSelect: 'none'}}
        whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
        >
            <Card sx={{
                width: 345,

                boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"



            }}>

                <CardContent>
                    <Typography sx={{ marginRight: 1, fontFamily: "CardFont", fontWeight: 800 }} variant="h5" component="div">
                        Exercise:
                    </Typography>
                    <Typography sx={{ fontFamily: "CardFont", fontWeight: 800 }} variant="h4" component="div">
                        {name}
                    </Typography>



                </CardContent>

            </Card>
        </motion.div>

    )
}



export default WorkoutCard