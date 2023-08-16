import React, { useState, useEffect } from 'react'
import gymHomeVideo from '../assets/videos/gym-home-video.mp4'
import TestLogo from './TestLogo'
import { Typography } from '@mui/material'




const Home = () => {

  const [showSplash, setShowSplash] = useState(true)



  return (
    <div>


      {showSplash ? <TestLogo setShowSplash={setShowSplash} /> : null}


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