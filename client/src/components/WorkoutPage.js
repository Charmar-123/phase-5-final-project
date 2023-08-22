import React, { useState } from 'react'
import WorkoutCard from './WorkoutCard'
import MinimizedWorkoutCard from './MinimizedWorkoutCard'
import { AnimatePresence, Reorder, motion } from 'framer-motion'



const WorkoutPage = () => {

    const container = {
        hidden: {

        },
        show: {
        }
    }

    const item = {
        hidden: {

        },
        show: {

        }
    }





    const [items, setItems] = useState(["test 1","test 2","test 3","test 4","test 5",])
    const [listView, setListView] = useState(false)
    return (

        <div style={{ padding: 20 }}>
            <button onClick={() => setListView(true)}>list</button>
            <button onClick={() => setListView(false)}>grid</button>

            <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: 0 }}>Check out your {"NAME"} workout!</h1>

            <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: 0 }}>Exercises:</h1>

            {/* Full card div */}
            {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', justifyContent: 'center', alignItems: 'center' }}>

                <WorkoutCard />
                <WorkoutCard />
                <WorkoutCard />
                <WorkoutCard />

            </div> */}

            {/* minimized card div */}
            <div>

                    <Reorder.Group 
                    style={listView ? {listStyle: "none", display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }
                : {listStyle: "none", display: 'flex', flexWrap: 'wrap', gap: '60px', justifyContent: 'center', alignItems: 'center' }
                }
                    axis="y" values={items} onReorder={setItems}>
                        {items.map((item) => (
                            <Reorder.Item key={item} value={item}>
                                {listView ? <MinimizedWorkoutCard name={item}/> : <WorkoutCard name={item}/>}
                            </Reorder.Item>
                        ))}

                    </Reorder.Group> 
               {listView ? <div style={{ position: 'fixed', marginLeft: 500 }}>
                    <WorkoutCard />
                </div> : null}

            </div>

        </div>


    )
}

export default WorkoutPage