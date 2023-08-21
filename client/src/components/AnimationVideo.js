import React from 'react'
import { motion } from 'framer-motion'
import benchPress from '../assets/videos/bench-press.mp4'
const AnimationVideo = () => {
    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{
            type: 'none',
            delay: 3
        }}
        >
            <video
                style={{ width: 345, height: 194 }}
                autoPlay
                loop
                muted
            >
                <source src={benchPress} />
            </video>
        </motion.div>
    )
}

export default AnimationVideo