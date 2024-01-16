import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from './modules/dashboard/dashboard';
import Login from './modules/user/login';
import ProtectedRoute from './modules/user/protected-route';
import './App.css';
import { FileIdProvider } from './components/fileContext';

const App = () => {

 
  // const handleThemeChange = (index) => {
  //   setCurrentThemeIndex(index);
  //   // setIsDropdownOpen(false); // Close the dropdown after selecting a theme
  // };

  // const selectedTheme = themes[currentThemeIndex]; 

  return (
    <>
    {/* <div
        className="dropdown mt-200"
        style={{
          backgroundColor: selectedTheme.backgroundColor,
          color: selectedTheme.textColor,    
        }}
      >
        <button className="dropbtn" onClick={handleDropdownToggle}>
          Select Theme
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            {themes.map((theme, index) => (
              <button
                key={index}
                onClick={() => handleThemeChange(index)}
                style={{
                  backgroundColor: theme.backgroundColor,
                  color: theme.textColor,
                }}
              >
                {theme.name}
              </button>
            ))}
          </div>
        )}
      </div> */}
    
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>        
            }
          />    
        </Routes>
      </BrowserRouter>
     
    </>
  );           
};

export default App;
