import React, { useState } from 'react';
import './project.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderDropdown from './ProjectFolder';


function ProjectStructure() {
  const [isOpen, setIsOpen] = useState(false);

  const [folders, setFolders] = useState([
    { projectName: 'Project 1', isOpen: false },
    { projectName: 'Project 2', isOpen: false },
    { projectName: 'Project 3', isOpen: false },
    { projectName: 'Project 4', isOpen: false },
    { projectName: 'Project 5', isOpen: false },
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
    <div>
      <div className={`sidebar ${isOpen ? 'open' : ''} `}>
        <div className="logo_details">
          <div className="logo_name">Project Structure</div>
          <DensityMediumIcon
            className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`}
            id="btn"
            onClick={toggleSidebar}
          />
        </div>
        <ul className="nav-list">
          {folders.map((folder, index) => (
            <div key={index}>
              <li>
                <a className='proicon' style={{ color: 'white' }} onClick={() => toggleFolder(index)}>
                  <FolderOpenIcon className="bx bx-grid-alt" />
                  <span className="link_name" style={{ marginLeft: '5px' }}>
                    {folder.projectName}
                  </span>
                </a>
                {folder.isOpen && (
                  <div className={`${isOpen ? 'open' : ''}`}>
                    <FolderDropdown
                      folder={folder}
                      onToggleFolder={() => toggleFolder(index)}
                      onToggleFile={(file) => toggleFile(index, file)}
                    />
                  </div>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectStructure;