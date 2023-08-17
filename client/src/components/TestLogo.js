import React, { useState } from 'react'
import './logo/test.scss'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const TestLogo = ({setShowSplash}) => {
    return (
        <div >
            <div className="splash">
                <div className="splash_logo">
                  
                          <FitnessCenterIcon/>
                
          

                </div>
                <div className="splash_svg">
                    <svg width="100%" height="100%">
                        <rect width="100%" height="100%" />
                    </svg>
                </div>
                <div className="splash_minimize">
                    <svg width="100%" height="100%">
                        <rect width="100%" height="100%" />
                    </svg>
                </div>
            </div>
            <div className="text">
                <p>Welcome to GymBud! <br />
                    Where your journey to a <br /> healthier lifestyle begins! <br />Join our community and <br /> start working together <br /> towards your fitness goals <br />Today!</p>
                    <button onClick={() => setShowSplash(false)}>Continue</button>
            </div>
        </div>
    )
}

export default TestLogo