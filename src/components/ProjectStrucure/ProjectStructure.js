import React, { useState, useEffect } from 'react';
import './project.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderDropdown from './ProjectFolder';
import ContextMenu from '../ContextMenu';

function ProjectStructure({ textColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [contextMenuIndex, setContextMenuIndex] = useState(null);

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
    setContextMenuIndex(null);
    const updatedFolders = [...folders];
    updatedFolders[index].isOpen = !updatedFolders[index].isOpen;
    setFolders(updatedFolders);
  };

  const handleContextMenu = (event, index) => {
    event.preventDefault();
    setContextMenuIndex(index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuIndex !== null && !event.target.closest('.contextMenu')) {
        setContextMenuIndex(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenuIndex]);

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo_details" style={{ textColor }}>
          <div className="logo_name">Project Structure</div>
          <DensityMediumIcon
            className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`}
            id="btn"
            onClick={toggleSidebar}
          />
        </div>
        <ul className="nav-list">
          {folders.map((folder, index) => (
            <div key={index} style={{ textColor }}>
              <li onContextMenu={(event) => handleContextMenu(event, index)}>
                <div className='proicon' onClick={() => toggleFolder(index)}>
                  <FolderOpenIcon className="bx bx-grid-alt" />
                  <span className="link_name">
                    {folder.projectName}
                  </span>
                </div>
                {contextMenuIndex === index && (
                  <ContextMenu onToggleFolder={() => toggleFolder(index)} popType="right" />
                )}
                {folder.isOpen && (
                  <div className={`openf1 ${isOpen ? 'open' : ''}`}>
                    <FolderDropdown
                      folder={folder}
                      onToggleFolder={() => toggleFolder(index)}
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
