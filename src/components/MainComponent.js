import React, { useState } from "react";
import ComponetTool from "./ComponentTool/ComponetTool";
import ProjectStructure from "./ProjectStrucure/ProjectStructure";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowUp';
import "./MainComponent.css";
import OverviewFlow from "../modules/dashboard/drag-drop/components/flow";
import { FileIdProvider } from "./fileContext";
import { JobDataProvider } from "./JobDataContext";

const MainComponent = ({onFileClickCallback}) => {
  const [isProjectStructureOpen, setIsProjectStructureOpen] = useState(false);
  const [isComponetToolOpen, setIsComponetToolOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const themes = [
    {
      // name: "dark",
      backgroundColor: "#000000",
      textColor: "#ffffff",

    },
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
    {
      // name: "yellow",
      backgroundColor: "#dd07f5",
      textColor: "#ffffff",
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
  const handleFileClick = (file_id) => {
    // Handle file_id in ProjectStructure
    console.log("File ID clicked in maincomponet:", file_id);
    // Add your logic here to handle the file_id
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
              <button className="btncolr"
                key={index}
                onClick={() => handleThemeChange(index)}
                style={{
                  backgroundColor: theme.backgroundColor,
                  color: theme.textColor,
                }}
              />
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
              onFileClickCallback={handleFileClick} 
            />
          </div>
          <div style={{ width: calculatePhotoWidth() }}>
          {/* <JobDataProvider> */}
            <OverviewFlow
             textColor={themes[currentThemeIndex].textColor}
              />
              {/* </JobDataProvider> */}
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
