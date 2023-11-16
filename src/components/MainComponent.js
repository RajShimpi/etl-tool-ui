import React, { useState } from "react";
import ComponetTool from "./ComponentTool/ComponetTool";
import ProjectStructure from "./ProjectStrucure/ProjectStructure";
import Photo from "./Photo";
import "./MainComponete.css"

const MainComponent = () => {
  const [isProjectStructureOpen, setIsProjectStructureOpen] = useState(false);
  const [isComponetToolOpen, setIsComponetToolOpen] = useState(false);

  const handleProjectStructureToggle = () => {
    setIsProjectStructureOpen(!isProjectStructureOpen);
  };

  const handleComponetToolToggle = () => {
    setIsComponetToolOpen(!isComponetToolOpen);
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
    <div className="d-flex justify-content-between main" >
      <div className={`p-2 ${isProjectStructureOpen ? 'open' : ''}`}>
        <ProjectStructure toggleSidebar={handleProjectStructureToggle} />
      </div>
      <div className={`p-2`} style={{ width: calculatePhotoWidth() }}>
        <Photo />
      </div>
      <div className={`p-2 ${isComponetToolOpen ? 'open' : ''}`}>
        <ComponetTool toggleSidebar={handleComponetToolToggle} />
      </div>
    </div>
  );
};

export default MainComponent;