import React from 'react'
import { Navigate } from 'react-router-dom';

const Login = () => {
  const isAuthenticated =false;
  if(isAuthenticated){
    return <Navigate to="/"/>
  }
  return (
    <div>Login</div>
  )
}

export default Login