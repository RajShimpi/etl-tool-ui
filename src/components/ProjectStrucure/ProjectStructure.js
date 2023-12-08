// ProjectStructure.js
import React, { useState, useEffect } from 'react';
import './project.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import axios from '../../modules/services/axios';
import FolderContainer from './ProjectFolder';

function ProjectStructure({ textColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [contextMenuIndex, setContextMenuIndex] = useState(null);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios.getWithCallback('projects/', (data) => {
      setApiData(data);
    });
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleFolder = (index) => {
    setContextMenuIndex(null);
    const updatedApiData = [...apiData];
    updatedApiData[index].isOpen = !updatedApiData[index].isOpen;
    setApiData(updatedApiData);
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
        <div className="logo_details" style={{ color: textColor }}>
          <div className="logo_name">Project Structure</div>
          <DensityMediumIcon
            className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`}
            id="btn"
            onClick={toggleSidebar}
          />
        </div>
        <ul className="nav-list">
          {apiData.map((project, index) => (
            <div key={index}>
              <li onContextMenu={(event) => handleContextMenu(event, index)}>
                <div className='proicon' onClick={() => toggleFolder(index)}>
                  <FolderOpenIcon className="bx bx-grid-alt" />
                  <span className="link_name">
                    {project.project_name}
                  </span>
                </div>
                {project.isOpen && (
                  <div className={`openf1 ${isOpen ? 'open' : ''}`}>
                    <FolderContainer
                      initialProjects={project.items}
                      project_id={project.project_id}
                      parent_id={project.parent_id}
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
