import React, { useEffect, useRef, useState } from "react";
import ComponetTool from "./ComponentTool/ComponetTool";
import "./MainComponent.css";
import OverviewFlow from "../modules/dashboard/drag-drop/components/flow";
import { useData } from "./JobDataContext";
import axios from "../modules/services/axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SaveIcon from "@mui/icons-material/Save";
import BackupIcon from "@mui/icons-material/Backup";
import DescriptionIcon from "@mui/icons-material/Description";
import CustomButton from "../modules/components/custom-button";
import ProjectStructure from "./ProjectStrucure/ProjectStructure";

const MainComponent = () => {
  const [isProjectStructureOpen, setIsProjectStructureOpen] = useState(false);
  const [isComponetToolOpen, setIsComponetToolOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const savaDataRef = useRef(null);
  const { jobDataId } = useData();
  const [disabled, setDisabled] = useState(true);
  const [jobData, setJobData] = useState();
  const [filePath, setFilePath] = useState([]);

  const [btns, setBtns] = useState([]);

  useEffect(() => {
    if (jobDataId) {
      setJobData(jobDataId);
    } else {
      setJobData(null);
    }
  }, [jobDataId]);

  useEffect(() => {
    if (jobDataId) {
      setFilePath([]);
    }
  }, [jobDataId]);

  useEffect(() => {
    if (jobDataId) {
      axios.getWithCallback(`project-files/${jobDataId.Projects_Files.id}/path`, (data) => {
        const pathSegments = data.split("/");
        pathSegments.splice(0, 2);
        const lastSegment = pathSegments.pop().replace(".json", "");
        const shortenedPath =
          pathSegments.length > 5
            ? [...pathSegments.slice(0, 5), `... ${lastSegment}`]
            : [...pathSegments, lastSegment];
        setFilePath(shortenedPath);
      });
    }
  }, [filePath, jobDataId]);

  useEffect(() => {
    setDisabled(jobData !== undefined && jobData !== null ? false : true);
  }, [jobDataId]);

  const saveDataFunction = () => {
    if (savaDataRef.current && typeof savaDataRef.current.savaDataFunction === "function") {
      savaDataRef.current.savaDataFunction();
      return true;
    }
  };

  const OpenJobParam = () => {
    if (savaDataRef.current && typeof savaDataRef.current.OpenJobParam === "function") {
      savaDataRef.current.OpenJobParam();
    }
  };

  const publish = () => {
    saveDataFunction();
    if (savaDataRef.current && typeof savaDataRef.current.OpenJobParam === "function") {
      savaDataRef.current.publish();
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
    setIsDropdownOpen(false);
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

  useEffect(() => {
    const btn = [
      {
        name: "Save",
        icon: <SaveIcon style={{ fontSize: "20px" }} />,
        function: saveDataFunction,
        color: "info",
        disabled: disabled,
      },
      {
        name: "Job Params",
        icon: <DescriptionIcon style={{ fontSize: "20px" }} />,
        function: OpenJobParam,
        color: "secondary",
        disabled: disabled,
      },
      {
        name: "Publish",
        icon: <BackupIcon style={{ fontSize: "20px" }} />,
        function: publish,
        color: "success",
        disabled: disabled,
      },
    ];
    setBtns(btn);
  }, [disabled]);

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgb(0 101 158)", color: "#fff" }}>
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  {filePath.length > 0 && (
                    <div className="mx-1 w-xs" title="filePath">
                      {filePath.map((segment, index) => (
                        <React.Fragment key={index}>
                          {segment}
                          {index < filePath.length - 1 && (
                            <ArrowForwardIosIcon style={{ fontSize: "15px", marginBottom: "3px" }} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </li>
              </ul>
              <div style={{ marginRight: "40%" }}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <CustomButton button={btns} />
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown" 
                    style={{ backgroundColor: "rgb(0 101 158)", borderRadius: "4px" }}>
                  <a
                    className="nav-link"
                    href="#"    
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={isDropdownOpen}
                    onClick={handleDropdownToggle}
                  >
                    <img
                      title="theme"
                      src="assets/images/work_up_protocol/colorpick.png"
                      width={30}
                      alt="Theme Picker"
                    />
                  </a>
                  <ul
                    className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                    style={{ marginLeft: "-99px", left: "auto" }}
                    aria-labelledby="navbarDropdown"
                  >
                    {themes.map((theme, index) => (
                      <button
                        className="btncolr"
                        key={index}
                        onClick={() => handleThemeChange(index)}
                        style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
                      ></button>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div
          className="main-container"
          style={{ backgroundColor: themes[currentThemeIndex].backgroundColor, color: themes[currentThemeIndex].textColor }}
        >
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
      </div>
    </>
  );
};

export default MainComponent;