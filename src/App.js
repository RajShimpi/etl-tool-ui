import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from './modules/dashboard/dashboard';
import Login from './modules/user/login';
import ProtectedRoute from './modules/user/protected-route';
import './App.css';

const App = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const themes = [
    {
      name: 'light',
      backgroundColor: '#ffffff',
      textColor: '#000000',
    },
    {
      name: 'dark',
      backgroundColor: '#1f1f1f',
      textColor: '#ffffff',
    },
    {
      name: 'yellow',
      backgroundColor: '#fcf803',
      textColor: '#000000',
    },
    {
      name: 'red',
      backgroundColor: '#ff0000',
      textColor: '#ffffff',
    },
    {
      name: 'green',
      backgroundColor: '#34f205',
      textColor: '#000000',
    },
  ];

 
  // const handleThemeChange = (index) => {
  //   setCurrentThemeIndex(index);
  //   // setIsDropdownOpen(false); // Close the dropdown after selecting a theme
  // };

  const selectedTheme = themes[currentThemeIndex];

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
