import React, { useState, useContext, useEffect } from 'react'
import ExerciseCard from './ExerciseCard'
import MinimizedWorkoutCard from './MinimizedWorkoutCard'
import { AnimatePresence, Reorder, motion } from 'framer-motion'
import Grid from './Grid'
import { UserContext } from './UserContext.js'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material'
const WorkoutPage = () => {
    const { loggedInUser, updateExercise } = useContext(UserContext)
    const { userId, workoutId } = useParams();
    const [errors, setErrors] = useState([]);
    const [workoutExercises, setWorkoutExercises] = useState([])
    const navigate = useNavigate();
    const [selectedExercise, setSelectedExercise] = useState([])


    const workoutName = loggedInUser && loggedInUser.workouts
        ? loggedInUser.workouts.find(workout => workout.id === parseInt(workoutId)).name
        : "";

    useEffect(() => {
        if (loggedInUser && loggedInUser.workouts) {
            const targetExercises = loggedInUser.workouts
                .find(workout => workout.id === parseInt(workoutId))
                .exercises.sort((a, b) => a.order - b.order);
            setWorkoutExercises(targetExercises);
            setSelectedExercise(targetExercises[0]);
        }
    }, [loggedInUser]);



    // const [items, setItems] = useState(workoutExercises)
    const [listView, setListView] = useState(true)


    const updateExerciseOrder = (e) => {

        const updatedExercises = e.map((exercise, index) => {
            return { ...exercise, order: index + 1 };
        });
        setWorkoutExercises(updatedExercises)
        // console.log(updatedExercises)

        updatedExercises.forEach((exercise) => {
            fetch(`/exercises/${exercise.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(exercise)
            })
                .then(res => {
                    if (res.ok) {
                        res.json().then((exercise) => {
                            // console.log(exercise);
                            updateExercise(exercise, workoutId)

                        })
                    } else {
                        res.json().then(data => {
                            setErrors(data.errors)
                            console.log(data.errors);
                        })
                    }
                })
        })


    };

    return (

        <div style={{ padding: 20, height: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: 0 }}>Check out your {workoutName} workout!</h1>
                <div>
                    <Button variant="outlined" color="warning" onClick={() => setListView(true)}>list</Button>
                    <Button variant="outlined" color="warning" onClick={() => setListView(false)}>grid</Button>
                </div>
            </div>



            <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: -50 }}>Exercises:</h1>
            <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 20, marginTop: -50 }}>Drag and drop to reorder your exercises.</h1>
            {listView && <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 20, marginTop: -20 }}>Double click to view exercise.</h1>}
            <Button
                variant='contained'
                onClick={() => navigate(`/users/${userId}/workouts/${workoutId}/exercises/new`)}
            >Add Exercise</Button>




            {listView ?
                <AnimatePresence mode='wait'>
                    <motion.div
                        key="listView"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: 'flex', marginTop: 0, marginLeft: 200 }}>



                        <Reorder.Group
                            style={{ listStyle: "none", display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }

                            }
                            axis="y" values={workoutExercises}
                            // onReorder={(e) => console.log(e)}
                            onReorder={(e) => updateExerciseOrder(e)}
                        >
                            {workoutExercises.map((item) => (
                                // Pass in data
                                // console.log(item.order)
                                <Reorder.Item

                                    onDoubleClick={() => {
                                        // console.log(item);
                                        setSelectedExercise(item)
                                    }}
                                    key={item.id} value={item}>
                                    <MinimizedWorkoutCard
                                        name={
                                            (item || { name: "Loading" }).name
                                        }

                                    />
                                </Reorder.Item>
                            ))}

                        </Reorder.Group>
                        {selectedExercise ? <div style={{
                            position: 'fixed', marginLeft: 650, marginTop: -150,
                        }}>
                            <ExerciseCard selectedExercise={selectedExercise} />
                        </div> :

                            <h1>Click on the button above to start adding exercises!</h1>}



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
                        <Grid items={workoutExercises} updateExerciseOrder={updateExerciseOrder} />
                    </motion.div>

                </AnimatePresence>
            }
        </div>
    )
}

export default WorkoutPage