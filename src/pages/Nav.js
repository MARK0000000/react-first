import React, {useContext, useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../styles/Nav.css'
import MyButton from '../components/UI/button/MyButton'
import { LoggedContext } from '../context';
export const Nav = () => {
   const navigate = useNavigate();
   const {isLoggedIn, setIsLoggedIn,} = useContext(LoggedContext)


   const logout = () => {
      setIsLoggedIn(false)
      localStorage.removeItem('logged')

   }

   useEffect(() => {
      if (!isLoggedIn) {
        navigate('/login', { replace: true }); 
      }
   }, [navigate, isLoggedIn]);


  return (
    <>
      <nav className='nav'>
        <ul className='ul'>
          <li>
            <MyButton onClick={() => navigate('posts', { replace: false })}>
              Posts
            </MyButton>
          </li>
          <li>
            <MyButton onClick={() => navigate('about', { replace: false })}>
              About
            </MyButton>
          </li>
          <li>
            <MyButton onClick={() => navigate(-1 , { replace: false })}>   
               Back
            </MyButton>
          </li>
          <li>
            <MyButton onClick={() => navigate(+1 , { replace: false })}>
               Forward
            </MyButton>
          </li>
          <li>
            <MyButton onClick={logout}>
               Out
            </MyButton>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};