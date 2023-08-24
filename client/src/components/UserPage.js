import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext.js'
import { useNavigate } from 'react-router-dom';
const UserPage = () => {

    const navigate = useNavigate();
    const { setLoggedInUser } = useContext(UserContext);
    const handleLogOut = () => {
        fetch('/logout', {
          method: 'DELETE'
        })
          .then(res => {
            if (res.ok) {
                setLoggedInUser([])
              navigate('/')
            }
          })
      }
  return (
    <div>
        <button onClick={() => handleLogOut()}>Logout</button>
    </div>
  )
}

export default UserPage