import React, {useEffect} from 'react';
import './styles/Reset.css';
import './styles/App.css';
import { BrowserRouter} from 'react-router-dom';
import { LoggedContext } from './context';
import { useState } from 'react';
import AppRouter from './router/AppRouter';

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [isLoading, setIsLoading] = useState(true)
   
   useEffect(() => {
      if(localStorage.getItem('logged')) {
         setIsLoggedIn(true)
      }
      setIsLoading(false)
   }, [])
   return (
      <LoggedContext.Provider value={{isLoggedIn, setIsLoggedIn, isLoading}}>
         <BrowserRouter>
         <AppRouter/>
      </BrowserRouter>
   </LoggedContext.Provider>
   )
}

export default App;