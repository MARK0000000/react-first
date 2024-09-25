import React, {useEffect, useContext} from 'react';
import { Navigate, useNavigate} from 'react-router-dom';
import { LoggedContext } from '../context';

const IsLogged = () => {
   const {isLoggedIn, isLoading} = useContext(LoggedContext)
   const navigate = useNavigate()
   console.log(isLoggedIn)
   useEffect(()=> {
      if(!isLoggedIn) {
         return navigate('/login', { replace: true });
      } 
   }, [isLoggedIn, navigate, isLoading])

  return (

    <div>
         <Navigate to='/posts'/>
    </div>
  );

} 

export default IsLogged;

