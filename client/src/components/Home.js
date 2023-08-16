import React from 'react'
import gymHomeVideo from '../assets/videos/gym-home-video.mp4'
import Logo from './Logo'



const Home = () => {
  return (
    <div>


      <video
        style={{ width: '100%' }}
        autoPlay
        loop
      >
        <source src={gymHomeVideo} />
      </video>
    </div>
  )
}

export default Home