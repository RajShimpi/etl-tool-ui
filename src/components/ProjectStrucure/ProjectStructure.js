import React, { useState, useEffect } from 'react';
import './project.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ContextMenu from '../ContextMenu';
import axios from '../../modules/services/axios';
import FolderContainer from './ProjectFolder'
function ProjectStructure({ textColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [contextMenuIndex, setContextMenuIndex] = useState(null);

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/projects/')
      .then(response => {
        setApiData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleFolder = (index) => {
    setContextMenuIndex(null);
    if (apiData && apiData[index]) {
      const updatedApiData = [...apiData];
      updatedApiData[index].isOpen = !updatedApiData[index].isOpen;
      setApiData(updatedApiData);
    }
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
          {apiData.map((project, index) => (
            <div key={index} style={{ textColor }}>
              <li onContextMenu={(event) => handleContextMenu(event, index)}>
                <div className='proicon' onClick={() => toggleFolder(index)}>
                  <FolderOpenIcon className="bx bx-grid-alt" />
                  <span className="link_name">
                    {project.project_name}
                  </span>
                </div>
                {contextMenuIndex === index && (
                  <ContextMenu onToggleFolder={() => toggleFolder(index)} popType="right" />
                )}
                {project.isOpen && (
                  <div className={`openf1 ${isOpen ? 'open' : ''}`}>
                    <FolderContainer projects={project.items} />
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
