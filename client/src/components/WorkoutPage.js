import React, { useState } from 'react'
import WorkoutCard from './WorkoutCard'
import MinimizedWorkoutCard from './MinimizedWorkoutCard'
import { AnimatePresence, Reorder, motion } from 'framer-motion'
import Grid from './Grid'



const WorkoutPage = () => {

    // const container = {
    //     hidden: {

    //     },
    //     show: {
    //     }
    // }

    // const item = {
    //     hidden: {

    //     },
    //     show: {

    //     }
    // }





    const [items, setItems] = useState(["test 1", "test 2", "test 3", "test 4", "test 5",])
    const [listView, setListView] = useState(true)
    return (

        <div style={{ padding: 20 }}>
            <button onClick={() => setListView(true)}>list</button>
            <button onClick={() => setListView(false)}>grid</button>

            <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: 0 }}>Check out your {"NAME"} workout!</h1>

            <h1 style={{ fontFamily: 'CardFont', fontWeight: '950', paddingTop: 4, fontSize: 60, marginTop: -50 }}>Exercises:</h1>






            {listView ?
                <AnimatePresence mode='wait'>
                    <motion.div
                        key="listView"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: 'flex' }}>

                   

                            <Reorder.Group
                                style={{ listStyle: "none", display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }

                                }
                                axis="y" values={items} onReorder={setItems}>
                                {items.map((item) => (
                                    <Reorder.Item key={item} value={item}>
                                        <MinimizedWorkoutCard name={item} />
                                    </Reorder.Item>
                                ))}

                            </Reorder.Group>
                            <div style={{ position: 'fixed', marginLeft: 500}}>
                                <WorkoutCard />
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
                        <Grid />
                    </motion.div>

                </AnimatePresence>





            }










        </div>


    )
}

export default WorkoutPage