import React, { useState, useEffect } from 'react'
import gymHomeVideo from '../assets/videos/gym-home-video.mp4'
import TestLogo from './TestLogo'




const Home = () => {

  const [showSplash, setShowSplash] = useState(true)

  

  return (
    <div>


      

      <video
        autoPlay
        muted 
        style={{ width: '100%' }}
        loop
      >
        <source src={gymHomeVideo} />
      </video>
      {showSplash ? <TestLogo setShowSplash={setShowSplash}/> : null }
    </div>
  )
}

export default Home