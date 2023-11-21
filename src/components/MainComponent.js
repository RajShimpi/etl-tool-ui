import React, { useState } from "react";
import ComponetTool from "./ComponentTool/ComponetTool";
import ProjectStructure from "./ProjectStrucure/ProjectStructure";
import Photo from "./Photo";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowUp';

import "./MainComponete.css";

const MainComponent = () => {
  const [isProjectStructureOpen, setIsProjectStructureOpen] = useState(false);
  const [isComponetToolOpen, setIsComponetToolOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const themes = [
    {
      // name: "blue",
      backgroundColor: "#4842f5",
      textColor: "#ffffff",
    },
    {
      // name: "light",
      backgroundColor: "#ffffff",
      textColor: "#000000",
    },
    {
      // name: "dark",
      backgroundColor: "#1f1f1f",
      textColor: "#ffffff",

    },
    {
      // name: "yellow",
      backgroundColor: "#fcf803",
      textColor: "#000000",
    },
    {
      // name: "red",
      backgroundColor: "#ff0000",
      textColor: "#ffffff",
    },
    {
      // name: "green",
      backgroundColor: "#34f205",
      textColor: "#000000",
    },
    
  ];

  const handleProjectStructureToggle = () => {
    setIsProjectStructureOpen(!isProjectStructureOpen);
  };

  const handleComponetToolToggle = () => {
    setIsComponetToolOpen(!isComponetToolOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleThemeChange = (index) => {
    setCurrentThemeIndex(index);
    // setIsDropdownOpen(false); // Close the dropdown after selecting a theme
  };

  const calculatePhotoWidth = () => {
    if (isProjectStructureOpen && isComponetToolOpen) {
      return "70vw";
    } else if (isProjectStructureOpen || isComponetToolOpen) {
      return "85vw";
    } else {
      return "100vw";
    }
  };

  return (
    <>
      <div className="dropdown">
        <div className="dropbtn" style={{cursor:'pointer'}} onClick={handleDropdownToggle}>
          Select Theme <KeyboardArrowDownIcon /> 
        </div>
        {isDropdownOpen && (
          <div className="dropdown-content pcolr">
            {themes.map((theme, index) => (
              <button className="btncolr"
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

      <div
        className="main-container"
        style={{
          backgroundColor: themes[currentThemeIndex].backgroundColor,
          color: themes[currentThemeIndex].textColor,
        }}
      >
        <div className="d-flex justify-content-between main">
          <div className={` ${isProjectStructureOpen ? "open" : ""}`}>
            <ProjectStructure
              toggleSidebar={handleProjectStructureToggle}
              textColor={themes[currentThemeIndex].textColor}
            />
          </div>
          <div  style={{ width: calculatePhotoWidth() }}>
            <Photo/>
          </div>
          <div className={` ${isComponetToolOpen ? "open" : ""}`}>
            <ComponetTool
              toggleSidebar={handleComponetToolToggle}
              textColor={themes[currentThemeIndex].textColor}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;
