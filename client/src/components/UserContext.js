import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const addWorkout = (newWorkout) => {

        const newWorkouts = [...loggedInUser.workouts, newWorkout]

        setLoggedInUser({ ...loggedInUser, workouts: newWorkouts })
    }

    //   code addExercise
    const addExercise = (newExercise, workout_id) => {

        const updatedLoggedInUser = {...loggedInUser}
        const newExercises = [...loggedInUser.workouts[parseInt(workout_id)].exercises, newExercise]
        updatedLoggedInUser.workouts[parseInt(workout_id)].exercises = newExercises
        setLoggedInUser(updatedLoggedInUser)
    }

    // code delete workout
    const deleteWorkout = (id) => {
        const filteredWorkouts = loggedInUser.workouts.filter(workout => workout.id !== parseInt(id))
        console.log(filteredWorkouts);
    
        setLoggedInUser({ ...loggedInUser, workouts: filteredWorkouts })
    }
    const contextValue = {
        loggedInUser,
        setLoggedInUser,
        addWorkout,
        addExercise,
        deleteWorkout
    };

    useEffect(() => {
        fetch('/authorized_user')
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