// import Dashboard from './modules/dashboard/dashboard';
import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import LoginUser from './modules/user/login-user';
import { ToastContainer, toast } from 'react-toastify';

import Dashboard from './modules/dashboard/dashboard';
// import logo from './logo.svg';
import Login from './modules/user/login';
import ProtectedRoute from './modules/user/protected-route';

const App = () => {
  
  return (
    <>
        <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="/login"  element={<Login />} />
        <Route  path='/*' element={(
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>)}  />
      </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
