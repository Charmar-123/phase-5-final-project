import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [workouts, setWorkouts] = useState([])


    useEffect(() => {
        fetch('/api/workouts')
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setWorkouts(data)
            })
    }, [loggedInUser])

    // workout Code
    const addWorkout = (newWorkout) => {

        const newWorkouts = [...loggedInUser.workouts, newWorkout]

        setLoggedInUser({ ...loggedInUser, workouts: newWorkouts })
    }

    const deleteWorkout = (id) => {
        const filteredWorkouts = loggedInUser.workouts.filter(workout => workout.id !== parseInt(id))
        // console.log(filteredWorkouts);

        setLoggedInUser({ ...loggedInUser, workouts: filteredWorkouts })
    }
    const updateWorkout = (updatedWorkout) => {


        const updatedWorkouts = loggedInUser.workouts.map((workout => {
            if (workout.id === updatedWorkout.id) {
                return updatedWorkout
            } else {
                return workout
            }
        }))

        setLoggedInUser({
            ...loggedInUser, workouts: updatedWorkouts
        })

    }
    // exercise code
    const addExercise = (newExercise, workout_id) => {
        // console.log(loggedInUser.workouts.find((workout) =>  workout.id === parseInt(workout_id)
        // ).exercises);
        const updatedLoggedInUser = { ...loggedInUser }
        const newExercises = [...loggedInUser.workouts.find((workout) => workout.id === parseInt(workout_id)).exercises, newExercise]
        // console.log(newExercises);
        updatedLoggedInUser.workouts.find((workout) => workout.id === parseInt(workout_id)).exercises = newExercises
        setLoggedInUser(updatedLoggedInUser)
    }

    const updateExercise = (updatedExercise, workout_id) => {

        const updatedLoggedInUser = { ...loggedInUser };

        const targetWorkout = updatedLoggedInUser.workouts.find((workout) => workout.id === parseInt(workout_id));

        if (targetWorkout) {
            const updatedExercises = targetWorkout.exercises.map((exercise) => {
                if (exercise.id === updatedExercise.id) {
                    return updatedExercise;
                } else {
                    return exercise;
                }
            });

            targetWorkout.exercises = updatedExercises;
            // console.log(updatedLoggedInUser);
            setLoggedInUser(updatedLoggedInUser);
        } else {
            // console.error(`Workout with ID ${workout_id} not found.`);
        }
    };



    const deleteExercise = (exerciseId, workoutId) => {

        const updatedLoggedInUser = { ...loggedInUser }
        const filteredExercises = updatedLoggedInUser.workouts.find((workout) => workout.id === parseInt(workoutId)).exercises.filter(exercise => exercise.id !== parseInt(exerciseId))
        updatedLoggedInUser.workouts.find((workout) => workout.id === parseInt(workoutId)).exercises = filteredExercises
        setLoggedInUser(updatedLoggedInUser)

    }



    const contextValue = {
        loggedInUser,
        setLoggedInUser,
        // Exercise functions 
        addExercise,
        updateExercise,
        // updateWorkoutExercises,
        deleteExercise,
        // Workout functions
        addWorkout,
        deleteWorkout,
        updateWorkout,

        workouts,
    };

    useEffect(() => {
        fetch('/api/authorized_user')
            .then(res => {
                if (res.ok) {
                    res.json().then(user => {
                        setLoggedInUser(user)
                    })
                }
            })

    }, [])



    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };