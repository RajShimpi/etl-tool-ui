import React, { useState } from "react";
import ComponetTool from "./ComponentTool/ComponetTool";
import ProjectStructure from "./ProjectStrucure/ProjectStructure";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowUp';
import "./MainComponent.css";
import OverviewFlow from "../modules/dashboard/drag-drop/components/flow";

const MainComponent = () => {
  const [isProjectStructureOpen, setIsProjectStructureOpen] = useState(false);
  const [isComponetToolOpen, setIsComponetToolOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const themes = [
    {backgroundColor: "#ececec", textColor: "#000000"},
    {backgroundColor: "#000000", textColor: "#ffffff"},
    {backgroundColor: "#DDDDDD", textColor: "#000000"},
    {backgroundColor: "#ffffff", textColor: "#000000"},
    {backgroundColor: "#91C8E4", textColor: "#000000"},
    {backgroundColor: "#748DA6", textColor: "#000000"},
    {backgroundColor: "#3C8DAD", textColor: "#ffffff"},
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
    // setIsDropdownOpen(false);
  };

  const calculatePhotoWidth = () => {
    if (isProjectStructureOpen && isComponetToolOpen) {
      return "70%";
    } else if (isProjectStructureOpen || isComponetToolOpen) {
      return "85%";
    } else {
      return "100%";
    }
  };

  return (
    <>
      <div className="dropdown">
        <div className="dropbtn" onClick={handleDropdownToggle}>
          Select Theme <KeyboardArrowDownIcon />
        </div>
        {isDropdownOpen && (
          <div className="dropdown-content pcolr">
            {themes.map((theme, index) => (
              <button className="btncolr" key={index} onClick={() => handleThemeChange(index)} style={{backgroundColor: theme.backgroundColor, color: theme.textColor}}/>
            ))}
          </div>
        )}
      </div>
      <div className="main-container"style={{backgroundColor: themes[currentThemeIndex].backgroundColor, color: themes[currentThemeIndex].textColor}}>
        <div className="d-flex justify-content-between main">
          <div className={` ${isProjectStructureOpen ? "open" : ""}`}>
            <ProjectStructure toggleSidebar={handleProjectStructureToggle} textColor={themes[currentThemeIndex].textColor}/>
          </div>
          <div style={{ width: calculatePhotoWidth() }}>
            <OverviewFlow textColor={themes[currentThemeIndex].textColor}/>
          </div>
          <div className={` ${isComponetToolOpen ? "open" : ""}`}>
            <ComponetTool toggleSidebar={handleComponetToolToggle} textColor={themes[currentThemeIndex].textColor}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;