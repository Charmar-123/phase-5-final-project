import React, { useState, useEffect } from 'react'
import gymHomeVideo from '../assets/videos/gym-home-video.mp4'
import IntroAnimation from './IntroAnimation'


import onlineDisplayVideo from '../assets/videos/online-workout.mp4'
import onlineDisplayExercise from '../assets/videos/exercise-create-example.mp4'
import onlineDisplayWorkout from '../assets/videos/workout-create-example.mp4'

const Home = () => {

  return (
    <div style={{ background: "linear-gradient(180deg, rgba(255,0,35,1) 10%, rgba(255,126,154,1) 67%)" }}>
      <div
        style={{ margin: 0,paddingTop: 9 ,display: 'flex', justifyContent: 'center',  }}>
        <IntroAnimation />
        <video
          autoPlay
          muted
          style={{ width: '70%', margin: 0, border: "solid", borderRadius: 16 }}
          loop
        >
          <source src={gymHomeVideo} />
        </video>

      </div>

      <div

        style={{ fontSize: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
        <h1
          style={{ marginTop: 30 }}>The best way to organize workouts with your friends!</h1>

        <video
          autoPlay
          muted
          style={{ width: '40%', margin: 0, border: "solid", borderRadius: 16 }}
          loop
        >
          <source src={onlineDisplayVideo} />
        </video>
        <h1>
          Create your own workouts and add the exercises!
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <video
            autoPlay
            muted
            style={{ width: '40%', marginRight: 20, border: "solid", borderRadius: 16 }}
            loop
          >
            <source src={onlineDisplayWorkout} />
          </video>
          <video
            autoPlay
            muted
            style={{ width: '40%', margin: 0, border: "solid", borderRadius: 16 }}
            loop
          >
            <source src={onlineDisplayExercise} />
          </video>
        </div>

        <h1>
          Or join others in the community on their workouts!
        </h1>

      </div>


    </div>
  )
}

export default Home