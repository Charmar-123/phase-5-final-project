import React, { useState, useEffect } from 'react'
import gymHomeVideo from '../assets/videos/gym-home-video.mp4'
import { Typography } from '@mui/material'
import IntroAnimation from './IntroAnimation'




const Home = () => {

  const [showSplash, setShowSplash] = useState(true)



  return (
    <div>


      {/* {showSplash ? <TestLogo setShowSplash={setShowSplash} /> : null} */}

     

    
      <IntroAnimation />
        <video
          autoPlay
          muted
          style={{ width: '100%', borderBottom: 5 }}
          loop
        >
          <source src={gymHomeVideo} />
        </video>

      

      <Typography variant='h3'>
        Find The Workout That Fits Your Time And Level!
      </Typography>

    </div>
  )
}

export default Home