import React, { useState, useContext } from 'react'
import ExerciseCard from './ExerciseCard'
import MinimizedWorkoutCard from './MinimizedWorkoutCard'
import { AnimatePresence, Reorder, motion } from 'framer-motion'
import Grid from './Grid'
import { UserContext } from './UserContext.js'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
const WorkoutPage = () => {
    const { loggedInUser, addWorkout } = useContext(UserContext)
    const { userId, workoutId } = useParams();

    

    const workoutExercises = loggedInUser.workouts.find(workout => workout.id === parseInt(workoutId)).exercises
    const orderNumbers = workoutExercises.map((ex) => {
        return ex.order
    })
    const [items, setItems] = useState(orderNumbers)
    const [listView, setListView] = useState(true)

    console.log(workoutExercises);
    console.log(workoutExercises.find((workout) => workout.order === 1));
    return (

        <div style={{ padding: 20 }}>
            <button onClick={() => setListView(true)}>list</button>
            <button onClick={() => setListView(false)}>grid</button>

            <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: 0 }}>Check out your {"NAME"} workout!</h1>

            <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: -50 }}>Exercises:</h1>






            {listView ?
                <AnimatePresence mode='wait'>
                    <motion.div
                        key="listView"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: 'flex' }}>

                   

                            <Reorder.Group
                                style={{ listStyle: "none", display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }

                                }
                                axis="y" values={items} 
                                onReorder={setItems}
                                >
                                {orderNumbers.map((orderNumber) => (
                                    // Pass in data
                                    <Reorder.Item key={orderNumbers} value={orderNumbers}>
                                        <MinimizedWorkoutCard 
                                        name={workoutExercises.find((workout) => workout.order === orderNumber).name} 
                                        />
                                    </Reorder.Item>
                                ))}

                            </Reorder.Group>
                            <div style={{ position: 'fixed', marginLeft: 500}}>
                                {/* set selected card */}
                                <ExerciseCard />
                            </div>

                     
                    </motion.div>

                </AnimatePresence>

                :

                <AnimatePresence mode='wait'>
                    <motion.div
                        key="gridView"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}>
                            {/* pass in data */}
                        <Grid />
                    </motion.div>

                </AnimatePresence>





            }










        </div>


    )
}

export default WorkoutPage