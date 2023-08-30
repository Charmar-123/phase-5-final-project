import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null)


    // workout Code
    const addWorkout = (newWorkout) => {

        const newWorkouts = [...loggedInUser.workouts, newWorkout]

        setLoggedInUser({ ...loggedInUser, workouts: newWorkouts })
    }

    const deleteWorkout = (id) => {
        const filteredWorkouts = loggedInUser.workouts.filter(workout => workout.id !== parseInt(id))
        console.log(filteredWorkouts);

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

        const updatedLoggedInUser = { ...loggedInUser }
        const newExercises = [...loggedInUser.workouts[parseInt(workout_id)].exercises, newExercise]
        updatedLoggedInUser.workouts[parseInt(workout_id)].exercises = newExercises
        setLoggedInUser(updatedLoggedInUser)
    }



    const contextValue = {
        loggedInUser,
        setLoggedInUser,
        addWorkout,
        addExercise,
        deleteWorkout,
        updateWorkout
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