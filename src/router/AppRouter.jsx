import React, {useContext} from 'react';
import '../styles/Reset.css';
import '../styles/App.css';
import { Routes, Route} from 'react-router-dom';
import {Nav} from '../pages/Nav';
import { privateRoute} from '../router/index';
import { LoggedContext } from '../context';
import Login from '../pages/Login';
import Posts from '../pages/Posts';
import IsLogged from './Islogged'
function AppRouter() {
   const {isLoggedIn, isLoading} = useContext(LoggedContext)
   
   if (isLoading) {
      return <div>Loading</div>
   }
   return (
      <Routes>
         <Route path='*' element={<IsLogged/>}/>
         <Route path="/" element={<Nav />}>
            <Route index element={<Posts/>}/>
            {isLoggedIn ? (
               privateRoute.map((route) => (
                  <Route index path={route.path} element={route.element} key={route.path} />
               ))
            ) : (
               <Route index path='/login' element={<Login/>}/>

            )
            }
         </Route>
      </Routes>
   )
}

export default AppRouter;