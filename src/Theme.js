import React, { useState } from 'react';

const Theme = () => {
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
      backgroundColor: '#0000000',
      textColor: '#ffffff',
    },
    {
      name: 'yellow',
      backgroundColor: '#fcf803',
      textColor: '#000000',
    },
    {
      name: 'red',
      backgroundColor: '#ff0ff0',
      textColor: '#ffffff',
    },
    {
      name: 'green',
      backgroundColor: '#34f205',
      textColor: '#000000',
    },
  ];

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleThemeChange = (index) => {
    setCurrentThemeIndex(index);
    // setIsDropdownOpen(false); // Close the dropdown after selecting a theme
  };

  const selectedTheme = themes[currentThemeIndex];

  return (
    <>
    <div
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
                {/* {theme.name} */}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Theme;
