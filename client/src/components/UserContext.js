import React, { createContext, useState,useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const addWorkout = (newWorkout) => {

        const newWorkouts = [...loggedInUser.workouts, newWorkout]
    
        setLoggedInUser({ ...loggedInUser, workouts: newWorkouts })
      }
    const addExercise = (newExercise,workout_id) => {

        // const newExercises = [...loggedInUser.workouts.workout_id.exercises, newExercise]
    
        // setLoggedInUser({ ...loggedInUser.workouts.workout_id, newExercises })
        // console.log(loggedInUser.workouts);
      }

    const contextValue = {
        loggedInUser,
        setLoggedInUser,
        addWorkout,
        addExercise
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