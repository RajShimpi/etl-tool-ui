import React, { useEffect, useRef, useState } from "react";
import ComponetTool from "./ComponentTool/ComponetTool";
import ProjectStructure from "./ProjectStrucure/ProjectStructure";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowUp';
import "./MainComponent.css";
import OverviewFlow from "../modules/dashboard/drag-drop/components/flow";
import { useJobData } from "./JobDataContext";
import axios from "../modules/services/axios";

const MainComponent = () => {
  const [isProjectStructureOpen, setIsProjectStructureOpen] = useState(false);
  const [isComponetToolOpen, setIsComponetToolOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const savaDataRef = useRef(null);
  const { jobDataId, jobFolder } = useJobData();
  const [disabled, setDisabled] = useState(false)
  const [jobData, setJobData] = useState([])
  const [fileType, setFileType] = useState([])


  useEffect(() => {
    if (jobDataId) {
      setJobData(jobDataId);
    }
    if (jobFolder) {
      setFileType(jobFolder)
    }
  }, [jobDataId]);

  useEffect(() => {
    if (jobData) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [jobData]);

  useEffect(() => {
    if (fileType) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [fileType]);

  const publish = () => {
    const jobid =({
      jobId:jobData.id
    })
    axios.postWithCallback(`job/publish-job/${jobData.id}`,jobid)
  }

  const saveDataFunction = () => {
    if (savaDataRef.current && typeof savaDataRef.current.savaDataFunction === 'function') {
      savaDataRef.current.savaDataFunction();
    }
  };

  const OpenJobParam = () => {
    if (savaDataRef.current && typeof savaDataRef.current.OpenJobParam === 'function') {
      savaDataRef.current.OpenJobParam();
    }
  };

  const themes = [
    { backgroundColor: "#ececec", textColor: "#000000" },
    { backgroundColor: "#000000", textColor: "#ffffff" },
    { backgroundColor: "#DDDDDD", textColor: "#000000" },
    { backgroundColor: "#ffffff", textColor: "#000000" },
    { backgroundColor: "#91C8E4", textColor: "#000000" },
    { backgroundColor: "#748DA6", textColor: "#000000" },
    { backgroundColor: "#3C8DAD", textColor: "#ffffff" },
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

  const componetsWidth = () => {
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
      <div className="d-flex" >
        <div className="d-flex" style={{ height: "50%" }}>
          <button className="btn btn-primary" onClick={saveDataFunction} disabled={disabled}>Save</button>
          <button className="btn btn-secondary" onClick={OpenJobParam} disabled={disabled}>Job Params</button>
          <button className="btn btn-primary" onClick={publish} disabled={disabled}>Publish</button>
        </div>
        <div className="dropdown">
          <div className="dropbtn" onClick={handleDropdownToggle}>
            Select Theme <KeyboardArrowDownIcon />
          </div>
          {isDropdownOpen && (
            <div className="dropdown-content pcolr">
              {themes.map((theme, index) => (
                <button className="btncolr" key={index} onClick={() => handleThemeChange(index)} style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="main-container" style={{ backgroundColor: themes[currentThemeIndex].backgroundColor, color: themes[currentThemeIndex].textColor }}>
        <div className="d-flex justify-content-between main">
          <div className={` ${isProjectStructureOpen ? "open" : ""}`}>
            <ProjectStructure toggleSidebar={handleProjectStructureToggle} textColor={themes[currentThemeIndex].textColor} />
          </div>
          <div style={{ width: componetsWidth() }}>
            <OverviewFlow textColor={themes[currentThemeIndex].textColor} ref={savaDataRef} />
          </div>
          <div className={` ${isComponetToolOpen ? "open" : ""}`}>
            <ComponetTool toggleSidebar={handleComponetToolToggle} textColor={themes[currentThemeIndex].textColor} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;