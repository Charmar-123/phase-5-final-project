import React from 'react';
import { motion } from 'framer-motion';


const AutoTypeInput = ({
  paddingLeft,
  text = 'Test Word', delay, border = true, fontSize = 35 }) => {

  const variants = {
    hidden: { opacity: 0 },

    visible: (i = 1) =>
    ({
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,

      }
    })

  }

  const child = {
    visible: {
      opacity: 1,
      x: 0,

      transition: {
        type: "none",


      }
    },
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        type: "none",

      }
    }
  }

  return (

 
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
    
  
        style={{
          background: 'white',
          overflow: "hidden", display: 'inline-block', border: border ? "solid" : "none",
          borderRadius: border && 9, width: border && 300,
          minHeight: border && 50, paddingLeft: paddingLeft,
        }}
      >
        {Array.from(text).map((letter, index) =>
        (<motion.span
          key={index}
          variants={child}
          style={{
            fontSize: fontSize, fontFamily: 'CardFont', fontWeight: '800', display: 'inline-block', // Force the text to wrap
          }}

        >
          {letter === " " ? "\u00a0" : letter}
        </motion.span>)

        )}

      </motion.div>

    

  )
};

export default AutoTypeInput;
