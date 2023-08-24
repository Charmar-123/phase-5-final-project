import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
const [loggedInUser, setLoggedInUser] = useState(null)
  
    const contextValue = {
        loggedInUser,
        setLoggedInUser
    };
  
    
  
  
  
    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
  };
  
  export { UserContext, UserProvider };