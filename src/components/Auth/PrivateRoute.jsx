import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

   const { token } = useSelector(state => state.tokenUser);

   if (token === null) {
      return <Navigate to={'/login'} />
   }
   else {
      return children;
   }

   return (<div></div>)
}

export default PrivateRoute