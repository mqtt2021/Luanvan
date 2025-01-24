import './App.scss';
import Header from './Header';
import React, { useEffect, useState, useContext } from 'react'   
import { ToastContainer } from 'react-toastify';
import AppRoutes from './AppRoutes';
import Login from './Login';
import { UserContext } from './usercontext';
import { use } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import Register from './Register';
function App() {   

  const { user , loginContext, token, setToken, loginTotalLogin, logoutTotalLogin, LoginTotal, accessRouteRegister, setaccessRouteRegister } = useContext(UserContext);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
  
    const emailSessionStorage = sessionStorage.getItem('email');
    const tokenSessionStorage = sessionStorage.getItem('token');
    const accessRegister = sessionStorage.getItem('accessRegister');
    setaccessRouteRegister(accessRegister)   
    if(emailSessionStorage) {
      loginContext(emailSessionStorage,tokenSessionStorage)
      setToken(tokenSessionStorage)
    }

    if(location.pathname === '/'){
      setaccessRouteRegister(false)
    }


  },[location]) 

  console.log('App',accessRouteRegister)  
  
  return (
   
      <div className='Container'>
            <div className="App-container">
                  {user && user.auth ? <Header/> : ''}
                  {user && user.auth ? <AppRoutes /> : ''}
                  {(user && user.auth) || accessRouteRegister ? '' : <Login/>}
                  {accessRouteRegister ? <Register/> : ''}
                    
            </div>   
            <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable    
                  pauseOnHover
                  theme="light"
            />
      </div> 
    
  );
}

export default App;
