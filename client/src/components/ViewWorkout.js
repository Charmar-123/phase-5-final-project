import React, { useState, useContext, useEffect } from 'react'
import ExerciseCard from './ExerciseCard'
import MinimizedWorkoutCard from './MinimizedWorkoutCard'
import { AnimatePresence, Reorder, motion } from 'framer-motion'
import Grid from './Grid'
import { UserContext } from './UserContext.js'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material'
import ViewExerciseCard from './ViewExerciseCard'
import ViewGrid from './ViewGrid'
const ViewWorkout = () => {
    const { loggedInUser, workouts,addWorkout } = useContext(UserContext)
    const { userId, workoutId } = useParams();
    const [errors, setErrors] = useState([]);
    const [workoutExercises, setWorkoutExercises] = useState([])
    const navigate = useNavigate();
    const [selectedExercise, setSelectedExercise] = useState([])
    const workoutName = workouts
        .find(workout => workout.id === parseInt(workoutId))
        .name;

    useEffect(() => {
        const targetExercises = workouts
            .find(workout => workout.id === parseInt(workoutId))
            .exercises.sort((a, b) => a.order - b.order)
        setWorkoutExercises(targetExercises)
        setSelectedExercise(targetExercises[0])
    }, [loggedInUser])


    const [listView, setListView] = useState(true)
    const handleJoinWorkout = () => {
        fetch(`/participants`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                workout_id: workoutId,
                user_id: loggedInUser.id
            })
        })
            .then(res => {
                if (res.ok) {
                    res.json().then((workout) => {
                        addWorkout(workout)
                        navigate(`/users/${loggedInUser.id}`
                        )
                    })
                } else {
                    res.json().then(json => {
                        setErrors(json.errors)
                        console.log("Errors");
                    })
                }
            })
    }
 
    return (

        <div style={{ padding: 20, height: '100vh' }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: 0 }}>Check out The {workoutName} workout!</h1>
                <div>
                    <Button variant="outlined" color="warning" onClick={() => setListView(true)}>list</Button>
                    <Button variant="outlined" color="warning" onClick={() => setListView(false)}>grid</Button>
                </div>
            </div>



            <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: -50 }}>Exercises:</h1>
            <Button
                variant='contained'
                onClick={() => {
                    handleJoinWorkout()}}
            >Join</Button>




            {listView ?
                <AnimatePresence mode='wait'>
                    <motion.div
                        key="listView"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: 'flex', marginTop: 0, marginLeft: 200 }}>



                        <div
                            style={{ listStyle: "none", display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }

                            }
                            axis="y" values={workoutExercises}

                        >
                            {workoutExercises.map((item) => (
                                <div

                                    onDoubleClick={() => {
                                        setSelectedExercise(item)
                                    }}
                                    key={item.id} value={item}>
                                    <MinimizedWorkoutCard


                                        name={
                                            (item || { name: "Loading" }).name
                                        }

                                    />
                                </div>
                            ))}

                        </div>
                        {selectedExercise ?   <div style={{
                            position: 'fixed', marginLeft: 650, marginTop: -150,
                        }}>
                            
                          <ViewExerciseCard 
                          selectedExercise={selectedExercise} />
                        </div> :
                        
                        <h1>This workout has no exercises yet!</h1>}
                      


                    </motion.div>

                </AnimatePresence>

                :

                <AnimatePresence mode='wait'>
                    <motion.div
                        key="gridView"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{marginTop: 20}}
                        >
                        {/* pass in data */}

                        
                        <ViewGrid 
                        items={workoutExercises} 
                        workoutExercises={workoutExercises} />
                    </motion.div>

                </AnimatePresence>
            }
        </div>
    )
}

export default ViewWorkout