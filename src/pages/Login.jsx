
import React, {useState, useContext, useEffect} from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { LoggedContext } from '../context';
import { useNavigate, useLocation} from 'react-router-dom';


const Login = ({}) => {

   const location = useLocation()
   console.log(location.pathname)

   const {isLoggedIn, setIsLoggedIn, isLoading,} = useContext(LoggedContext)
   
   localStorage.setItem('logged', 'true')
   const login = event => {
      event.preventDefault()
      setIsLoggedIn(true)

   }



   const navigate = useNavigate()
   useEffect(() => {
      if (isLoggedIn) {
        navigate('/posts', { replace: true }); 
      }
    }, [navigate, isLoggedIn]);
 


  return (
    <div className='container'>
      <h1 className='h1-title'>Login</h1>
      <form onSubmit={login}>
         <MyInput type="text" placeholder='name' />
         <MyInput type="password" placeholder='password'/>
         <MyButton>Log in</MyButton>
      </form>
    </div>
  );

} 

export default Login;
