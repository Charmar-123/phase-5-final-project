import React, { useState, useEffect } from 'react'
import gymHomeVideo from '../assets/videos/gym-home-video.mp4'
import { Typography } from '@mui/material'
import IntroAnimation from './IntroAnimation'




const Home = () => {

  const [showSplash, setShowSplash] = useState(true)



  return (
    <div>
      <div
      style={{margin:0}}>
        <IntroAnimation />
        <video
          autoPlay
          muted
          style={{ width: '100%', margin: 0 }}
          loop
        >
          <source src={gymHomeVideo} />
        </video>

      </div>

      <div

        style={{ background: "linear-gradient(180deg, rgba(255,0,35,1) 10%, rgba(255,126,154,1) 67%)", fontSize: 30}}>
        <h1
        style={{margin:0}}>The best way to organize workouts with your friends!</h1>
        <h1>
          Create your own workouts and add the exercises!
        </h1>
        <h1>
          Or join others in the community on their workouts!
        </h1>
      </div>


    </div>
  )
}

export default Home