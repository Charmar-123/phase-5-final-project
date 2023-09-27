import React, { useContext } from 'react'
import WorkoutCard from './WorkoutCard'
import { UserContext } from './UserContext.js'

const Workouts = () => {

  const { workouts = [] } = useContext(UserContext);

  // Create an array to group workouts into pairs
  
  const communityWorkouts = workouts.filter((workout) => workout.admin === false)
  const workoutsInPairs = [];
  for (let i = 0; i < communityWorkouts.length; i += 2) {
    const pair = communityWorkouts.slice(i, i + 2);
    workoutsInPairs.push(pair);
  }

  return (
    <div style={{height: '150vh',background: "linear-gradient(180deg, rgba(199,210,255,1) 0%, rgba(255,195,208,1) 67%)"}}>
      <h1 style={{fontSize: 70, padding: 20, marginTop: 0}}>Browse through the community workouts and join the ones that interest you!</h1>
      {workoutsInPairs.map((pair, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 50px' }}>
          {pair.map((workout) => (
            <WorkoutCard
            user={false}
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Workouts
