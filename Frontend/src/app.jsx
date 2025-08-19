import React from 'react';
import { Router,Route, Routes } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import DashboardHome from './pages/DashboardHome';
import { ToastContainer } from 'react-toastify';
// import ProtectedRoute from './routesCheck/ProtectedRoute';
// import ProtectedRoute from './routesCheck/ProtectedRoute';
import AuthRedirectRoute from './routesCheck/AuthRedirectRoute';

const app = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<AuthRedirectRoute><Home></Home></AuthRedirectRoute>}></Route>
        <Route path="/login-home" element={
                     
                        <DashboardHome></DashboardHome>
                    
        } />
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/reset-password' element={<ResetPassword></ResetPassword>}></Route>
        <Route path='/verify-email' element={<VerifyEmail></VerifyEmail>}></Route>
      </Routes>
      
    </div>
  )
}

export default app;


