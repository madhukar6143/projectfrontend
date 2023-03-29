import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth'

function RequiredAuth({role,children}) {
    const auth =useAuth()
   if(auth.role)
   {
    if(auth.role==="admin")
    return children;
    if (auth.role  === role) {
        return children;
      } 
      else
      {
        // return children;
        return <Navigate to="/login" />;
      }
    }
    else {
       return <Navigate to="/login" />;
        // return children;
      }
   
}

export default RequiredAuth
