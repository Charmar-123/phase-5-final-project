import React, { useState, useContext, useEffect } from 'react'
import MinimizedWorkoutCard from './MinimizedWorkoutCard'
import { AnimatePresence, motion } from 'framer-motion'
import { UserContext } from './UserContext.js'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material'
import ViewExerciseCard from './ViewExerciseCard'
import ViewGrid from './ViewGrid'
const ViewWorkout = () => {
    const { loggedInUser, workouts, addWorkout } = useContext(UserContext)
    const { workoutId } = useParams();
    const [errors, setErrors] = useState([]);
    const [workoutExercises, setWorkoutExercises] = useState([])
    const [allowJoin, setAllowJoin] = useState(true)
    const navigate = useNavigate();
    const [selectedExercise, setSelectedExercise] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const workoutName = workouts.length > 0 ? workouts.find(workout => workout.id === parseInt(workoutId)).name : "";



    
    useEffect(() => {
        const selectedWorkout = workouts.find(workout => workout.id === parseInt(workoutId));

        if (loggedInUser && selectedWorkout) {
            const targetExercises = selectedWorkout.exercises.sort((a, b) => a.order - b.order);
            setWorkoutExercises(targetExercises);
            setSelectedExercise(targetExercises[0]);
        } else {

            setWorkoutExercises([]);
            setSelectedExercise(null);
        }

        let isWorkoutInLoggedInUser = false; 

        if (loggedInUser) {
            isWorkoutInLoggedInUser = loggedInUser.workouts.some(
                workout => workout.id === parseInt(workoutId)
            );
        }
    
        setAllowJoin(!isWorkoutInLoggedInUser);
    
    }, [loggedInUser, workoutId])






    const [listView, setListView] = useState(true)
    const handleJoinWorkout = () => {
        setIsLoading(true)
        fetch(`/api/participants`, {
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
                        setIsLoading(false)
                    })
                } else {
                    res.json().then(json => {
                        setErrors(json.errors)
                        setIsLoading(false)
                    })
                }
            })
    }

    return (

        <div style={{ padding: 20, height: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: 0 }}>Check out The {workoutName} workout!</h1>
                <div>
                    <Button variant="outlined" color="warning" onClick={() => setListView(true)}>list</Button>
                    <Button variant="outlined" color="warning" onClick={() => setListView(false)}>grid</Button>
                </div>
            </div>



            <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: -50 }}>Exercises:</h1>
            {/* Conditional render */}
            {allowJoin &&
            <Button
                disabled={isLoading ? true : false}
                variant='contained'
                onClick={() => {
                    handleJoinWorkout()
                }}
            >
                {isLoading ? <CircularProgress/> : 'Join'}
                </Button>}




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
                        {selectedExercise ? <div style={{
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
                        style={{ marginTop: 20 }}
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