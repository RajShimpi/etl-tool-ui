import React, { useEffect, useRef, useState } from "react";
import ComponetTool from "./ComponentTool/ComponetTool";
import ProjectStructure from "./ProjectStrucure/ProjectStructure";
import "./MainComponent.css";
import OverviewFlow from "../modules/dashboard/drag-drop/components/flow";
import { useJobData } from "./JobDataContext";
import axios from "../modules/services/axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SaveIcon from '@mui/icons-material/Save';
import BackupIcon from '@mui/icons-material/Backup';
import DescriptionIcon from '@mui/icons-material/Description';
const MainComponent = () => {
  const [isProjectStructureOpen, setIsProjectStructureOpen] = useState(false);
  const [isComponetToolOpen, setIsComponetToolOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const savaDataRef = useRef(null);
  const { jobDataId } = useJobData();
  const [disabled, setDisabled] = useState(true)
  const [jobData, setJobData] = useState()
  const [jobid, setJobid] = useState([])
  const [filePath, setFilePath] = useState([])

  useEffect(() => {
    if (jobDataId) {
      setJobData(jobDataId);
      setJobid(jobDataId.id)
    } else {
      setJobData(null)
      setFilePath([])
    }
  }, [jobDataId]);

  useEffect(() => {
    if (jobDataId) {
      axios.getWithCallback(
        `project-files/${jobDataId.Projects_Files.id}/path`,
        (data) => {
          const pathSegments = data.split("/");
          pathSegments.splice(0, 2);
          const lastSegment = pathSegments.pop().replace(".json", "");
          const shortenedPath = pathSegments.length > 5
            ? [...pathSegments.slice(0, 5), `... ${lastSegment}`]
            : [...pathSegments, lastSegment];
          setFilePath(shortenedPath);
        }
      );
    }
  }, [filePath, jobDataId])

  useEffect(() => {
    setDisabled(jobData !== undefined && jobData !== null ? false : true);
  }, [jobDataId]);

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
  const publish = () => {
    if (savaDataRef.current && typeof savaDataRef.current.OpenJobParam === 'function') {
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
      <div >
        <nav class="navbar navbar-expand-lg " style={{ backgroundColor: 'rgb(0 101 158)', color: '#fff' }}>
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  {filePath.length > 0 && (
                    <div className="mx-1 w-xs" title="filePath">
                      {filePath.map((segment, index) => (
                        <React.Fragment key={index}>
                          {segment}
                          {index < filePath.length - 1 && (
                            <ArrowForwardIosIcon style={{ fontSize: "15px" ,marginBottom:'3px'}} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </li>
              </ul>
              <div style={{ marginRight: '35%' }}>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <button className="btn  btn-secondary mx-1 w-xs d-flex" style={{backgroundColor:"#3f85c1" , border:"none"}}  type="button"  onClick={saveDataFunction} disabled={disabled}><div style={{ marginTop: '1px' }}><SaveIcon style={{ fontSize: "20px"  }} /></div><div style={{ fontSize: "15px", marginLeft: '5px', marginBottom: '3px' }}> Save</div></button>
                  </li>
                  <li class="nav-item">
                    <button className="btn mx-1 w-xs btn-secondary d-flex" onClick={OpenJobParam} disabled={disabled}><div style={{ marginTop: '1px' }}><DescriptionIcon style={{ fontSize: "20px" }} /></div><div style={{ fontSize: "15px", marginLeft: '5px', marginBottom: '3px' }}> Job Params</div></button>
                  </li>
                  <li class="nav-item">
                    <button className="btn mx-1 w-xs btn-success d-flex" onClick={publish} disabled={disabled}><div style={{ marginTop: '1px' }}><BackupIcon style={{ fontSize: "20px" }} /></div><div style={{ fontSize: "15px", marginLeft: '5px', marginBottom: '3px' }}>Publish</div></button>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
                <li class="nav-item dropdown"  >
                 <a  class="nav-link " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'black', backgroundColor:"transparent", borderRadius:"4px"}}>
                  <img src="assets/images/work_up_protocol/colorpick.png" width={30}  alt=" of the image" />       
                  </a>
                 
                  <ul class="dropdown-menu" style={{marginLeft:"-94px"  }} aria-labelledby="navbarDropdown">
                    {themes.map((theme, index) => (
                        <button className="btncolr" key={index} onClick={() => handleThemeChange(index)} style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }} >
                        </button>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="main-container" style={{ backgroundColor: themes[currentThemeIndex].backgroundColor, color: themes[currentThemeIndex].textColor, }}>
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