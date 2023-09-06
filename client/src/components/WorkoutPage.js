import React, { useState, useContext, useEffect } from 'react'
import ExerciseCard from './ExerciseCard'
import MinimizedWorkoutCard from './MinimizedWorkoutCard'
import { AnimatePresence, Reorder, motion } from 'framer-motion'
import Grid from './Grid'
import { UserContext } from './UserContext.js'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
const WorkoutPage = () => {
    const { loggedInUser, updateExercise } = useContext(UserContext)
    const { userId, workoutId } = useParams();
    const [errors, setErrors] = useState([]);
    const [workoutExercises, setWorkoutExercises] = useState([])
    const navigate = useNavigate();
    const [selectedExercise, setSelectedExercise] = useState([])
    // const workoutExercises = loggedInUser.workouts
    //     .find(workout => workout.id === parseInt(workoutId))
    //     .exercises.sort((a, b) => a.order - b.order);

    useEffect(() => {
        const targetExercises = loggedInUser.workouts
        .find(workout => workout.id === parseInt(workoutId))
        .exercises.sort((a, b) => a.order - b.order)
        setWorkoutExercises(targetExercises)
        setSelectedExercise(targetExercises[0])
    }, [loggedInUser])



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
            <button onClick={() => setListView(true)}>list</button>
            <button onClick={() => setListView(false)}>grid</button>

            <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: 0 }}>Check out your {"NAME"} workout!</h1>

            <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: -50 }}>Exercises:</h1>
            <button
                onClick={() => navigate(`/users/${userId}/workouts/${workoutId}/exercises/new`)}
            >Add Exercise</button>




            {listView ?
                <AnimatePresence mode='wait'>
                    <motion.div
                        key="listView"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: 'flex', marginTop: 100 }}>



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
                        <div style={{ position: 'fixed', marginLeft: 500, marginTop: -150 }}>
                            {/* set selected card */}
                            <ExerciseCard selectedExercise={selectedExercise} />
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
                        <Grid items={workoutExercises} updateExerciseOrder={updateExerciseOrder} workoutExercises={workoutExercises} />
                    </motion.div>

                </AnimatePresence>
            }
        </div>
    )
}

export default WorkoutPage