import { useState, createContext, useContext } from "react";


const AuthContext=createContext(null)

export const AuthProvider =({children}) =>
{
  const [user,setUser]=useState(null);
  const [role,setRole]=useState(null);
  const login =(role,user) =>
  {
    setUser(user)
    setRole(role)
  }
  const logout =() =>
  {
    setUser(null)
    setRole(null)
  }
  return <AuthContext.Provider value ={{user,role,login,logout}}>{children}</AuthContext.Provider>
}

export const useAuth =() =>
{
    return useContext(AuthContext)
}