
import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';




const RatingsDropdown = ({ titleItem, setWorkoutIntensity }) => {
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

    const onRatingClick = (text, rating, val) => {
        setSelectedRating({ text: text, rating: rating })
        setWorkoutIntensity(val)
        handleClick()
    }
    return (
        <motion.div
            variants={titleItem}>

            <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 50 }} variant='h3'>How Intense Is It!</h1>


            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


                <motion.div
                    onClick={handleClick}
                    style={{ ...styles.ratingsDiv, display: 'flex', alignContent: 'flex-start', alignItems: 'center', width: 240, backgroundColor: 'white', }}
                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>



                    <h5 style={{ ...styles.ratingsText, flex: '1', textAlign: 'center', fontSize: 18 }}>{selectedRating.text} <br /> {selectedRating.rating}
                    </h5>
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

                                        onRatingClick(`Piece of cake!`, `😅`, 1)
                                    }}
                                >




                                    <h5

                                        style={{ ...styles.ratingsText, fontSize: 18, marginTop: 0 }}>Piece of cake!<br /> 😅</h5>


                                </motion.div>



                                <motion.div

                                    onClick={() => {

                                        onRatingClick(`Feeling the burn!`, `😅😅`, 2)
                                    }}
                                    variants={ratingItem} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                                    style={styles.ratingsDiv}>
                                    <h5 style={{ ...styles.ratingsText, fontSize: 18, marginTop: 0 }}>Feeling the burn!<br />  😅😅</h5>


                                </motion.div>
                                <motion.div

                                    onClick={() => {

                                        onRatingClick(`Sweating buckets!`, `😅😅😅`, 3)
                                    }}
                                    variants={ratingItem} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                                    style={styles.ratingsDiv}>
                                    <h5 style={{ ...styles.ratingsText, fontSize: 18, marginTop: 0 }}>Sweating buckets!<br />  😅😅😅</h5>


                                </motion.div>
                                <motion.div

                                    onClick={() => {

                                        onRatingClick(`Gasping for air!`, `😅😅😅😅`, 4)
                                    }}
                                    variants={ratingItem} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                                    style={styles.ratingsDiv}>
                                    <h5 style={{ ...styles.ratingsText, fontSize: 18, marginTop: 0 }}>Gasping for air!<br />  😅😅😅😅</h5>
                                   

                                </motion.div>
                                <motion.div

                                    onClick={() => {

                                        onRatingClick(`Total workout apocalypse!`, `😅😅😅😅😅`, 5)
                                    }}
                                    variants={ratingItem} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                                    style={styles.ratingsDiv}>

                                    <h5 style={{ ...styles.ratingsText, fontSize: 17, marginTop: 0 }}>Total workout apocalypse!<br />  😅😅😅😅😅</h5>
                                 

                                </motion.div>




                            </motion.div>


                        </>


                    }


                </AnimatePresence>






            </div>


        </motion.div>
    )
}

export default RatingsDropdown