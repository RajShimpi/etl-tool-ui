import React, { useState } from 'react';
import './LeftSidebar.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderDropdown from './ProjectFolder';

function ProjecStructure() {
  const [isOpen, setIsOpen] = useState(false);
  const [folders, setFolders] = useState([
    { projectName: 'Project 1', isOpen: false}, // Add more folders as needed
    { projectName: 'Project 1', isOpen: false},
  ]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleFolder = (index) => {
    const updatedFolders = [...folders];
    updatedFolders[index].isOpen = !updatedFolders[index].isOpen;
    setFolders(updatedFolders);
  };

  const toggleFile = (folderIndex, file) => {
    const updatedFolders = [...folders];
    updatedFolders[folderIndex].openFiles[file] = !updatedFolders[folderIndex].openFiles[file];
    setFolders(updatedFolders);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''} projectStruc`} >
      <div className="logo_details">
        <div className="logo_name">Project Structer</div>
        <DensityMediumIcon className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`} id="btn" style={{ color: "white" }} onClick={toggleSidebar}></DensityMediumIcon>
      </div>
      <ul className="nav-list">
        {folders.map((folder, index) => (
          <div key={index}>
            <a href="#" onClick={() => toggleFolder(index)}>
              <FolderOpenIcon className="bx bx-grid-alt "></FolderOpenIcon>
              <span className="link_name" style={{ marginLeft: '5px' }} >{folder.projectName}</span>
            </a>
            {folder.isOpen && (
              <div className={`${isOpen ? 'open' : ''}`}>
                <FolderDropdown folder={folder} onToggleFolder={() => toggleFolder(index)} onToggleFile={(file) => toggleFile(index, file)} />
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ProjecStructure;
