import React, {useState} from 'react'
import { svg } from './logo/LogoSvg'
import { AnimatePresence, motion } from "framer-motion";
const IntroAnimation = () => {


    const [showLogo, setShowLogo] = useState(true)

    const style = {
        container: {
            backgroundColor: "#ffc117",
            width: "400px",
            height: "300px",
            display: "flex",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "30px",
            alignItems: 'center',
            justifyContent: 'center',

        },

        item: {
            width: "180px",
            overflow: "visible",
            stroke: "#000000",
            strokeWidth: 2,
            strokeLinejoin: "round",
            strokeLinecap: "round",
            marginRight: '90',

        }

    }

    const icon = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            fill: "rgba(255, 255, 255, 0)"
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            fill: "#ffc117"
        }
    };



    return (



        <motion.div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AnimatePresence>
                {showLogo && <motion.div style={{
                    ...style.container,

                }}


                    initial={{ scale: 0 }}
                    animate={{
                        scale: 1, width: '100vw', height: '100vh'
                    }}
                    onAnimationComplete={() => setShowLogo(false)}
                    exit={{ opacity: 0 }}
                    transition={{
                        scale: {
                            duration: 3,
                            type: "spring",
                        },
                        width: {
                            delay: 4
                        },
                        height: {
                            delay: 4.2
                        },
                        opacity: {
                            duration: 1
                        }

                    }}

                >
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        style={style.item}
                    >
                        <motion.path
                            d={svg}
                            variants={icon}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                default: { duration: 5, ease: "easeInOut" },
                                fill: { duration: 3, ease: [1, 0, 0.8, 1] }
                            }}

                        />
                    </motion.svg>
                </motion.div>}
            </AnimatePresence>

        </motion.div >




    )
}

export default IntroAnimation