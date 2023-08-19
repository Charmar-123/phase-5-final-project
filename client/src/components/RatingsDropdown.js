import { Box, TextField, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const RatingsDropdown = ({ titleItem }) => {
    const [isToggled, setIsToggled] = useState(false);

    const [selectedRating, setSelectedRating] = useState({ text: 'Pick a level out of 5!', rating: '😅' })
    const styles = {
        ratingsText: {

            textAlign: 'center',
            fontFamily: 'CardFont',
            fontWeight: 900



        },

        ratingsDiv: {
            boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset", width: 210, height: 60, borderRadius: 6, marginBottom: 19
        }

    }
    const ratingItem = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,

        }

    }
    const ratingVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
        }

    }

    const handleClick = () => {
        setIsToggled(!isToggled); // Toggle the value using the NOT operator
    };

    const onRatingClick = (text, rating) => {
        setSelectedRating({ text: text, rating: rating })
        handleClick()
    }
    return (
        <motion.div
            variants={titleItem}>

            <Typography sx={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4 }} variant='h3'>How Intense Is It!</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


                    <motion.div
                        onClick={handleClick}
                        style={{ ...styles.ratingsDiv, display: 'flex', alignContent: 'flex-start', alignItems: 'center', width: 240 }}
                        whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>


                        <Typography sx={{ ...styles.ratingsText, flex: '1', textAlign: 'center' }}>{selectedRating.text} <br /> {selectedRating.rating}
                        </Typography>
                        {isToggled ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </motion.div>




                    <AnimatePresence initial={false}>

                        {isToggled &&

                            <>
                                <motion.div
                                    variants={ratingVariants}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                >

                                    <motion.div
                                        variants={ratingItem} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                                        style={styles.ratingsDiv}

                                        onClick={() => {

                                            onRatingClick(`Piece of cake!`, `😅`)
                                        }}
                                    >
                                        <Typography

                                            sx={styles.ratingsText}>Piece of cake!<br /> 😅</Typography>


                                    </motion.div>



                                    <motion.div

                                        onClick={() => {

                                            onRatingClick(`Feeling the burn!`, `😅😅`)
                                        }}
                                        variants={ratingItem} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                                        style={styles.ratingsDiv}>
                                        <Typography sx={styles.ratingsText}>Feeling the burn!<br />  😅😅</Typography>

                                    </motion.div>
                                    <motion.div

                                        onClick={() => {

                                            onRatingClick(`Sweating buckets!`, `😅😅😅`)
                                        }}
                                        variants={ratingItem} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                                        style={styles.ratingsDiv}>
                                        <Typography sx={styles.ratingsText}>Sweating buckets!<br />  😅😅😅</Typography>

                                    </motion.div>
                                    <motion.div

                                        onClick={() => {

                                            onRatingClick(`Gasping for air!`, `😅😅😅😅`)
                                        }}
                                        variants={ratingItem} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                                        style={styles.ratingsDiv}>
                                        <Typography sx={styles.ratingsText}>Gasping for air!<br />  😅😅😅😅</Typography>

                                    </motion.div>
                                    <motion.div

                                        onClick={() => {

                                            onRatingClick(`Total workout apocalypse!`, `😅😅😅😅😅`)
                                        }}
                                        variants={ratingItem} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                                        style={styles.ratingsDiv}>
                                        <Typography sx={styles.ratingsText}>Total workout apocalypse!<br />  😅😅😅😅😅</Typography>

                                    </motion.div>




                                </motion.div>


                            </>


                        }


                    </AnimatePresence>






                </Box>
            </Box>

        </motion.div>
    )
}

export default RatingsDropdown