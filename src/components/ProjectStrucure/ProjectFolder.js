import React, { useState, useEffect } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import axios from '../../modules/services/axios.js';

function FolderDropdown({ item, onToggleFolder, onToggleFile, textColor }) {
  const handleItemToggle = () => {
    if (item.type === 'file') {
      onToggleFile(item.file_name);
    } else {
      onToggleFolder(item);
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    logProjectData(item); // Log project data on right-click
  };

  const logProjectData = (project) => {
    console.log('Right-clicked on Project:', project);
  };

  return (
    <div className="folderstyle" onContextMenu={handleContextMenu}>
      <div className={` ${item.isOpen ? 'open' : ''}`} style={{ textColor }} onClick={handleItemToggle}>
        {item.type === 'Folder' && (
          item.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />
        )}
        {item.type === 'File' && <InsertDriveFileIcon fontSize='small' />}
        {item.file_name}
      </div>
      {item.isOpen && item.items && (
        <div className="insideItemStyle">
          {item.items.map((subItem, index) => (
            <FolderDropdown
              key={index}
              item={subItem}
              onToggleFolder={() => onToggleFolder(subItem)}
              onToggleFile={() => onToggleFile(subItem.file_name)}
              textColor={textColor}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FolderContainer() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.getWithCallback('project-files/', (data) => {
      setProjects(data);
    });
  }, []);

  const toggleFolder = (project) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      const targetProject = updatedProjects.find((p) => p.id === project.id);
      targetProject.isOpen = !targetProject.isOpen;
      return updatedProjects;
    });
  };

  return (
    <div>
      <div>
        {projects.map((project, index) => (
          <FolderDropdown
            key={index}
            item={project}
            onToggleFolder={() => toggleFolder(project)}
            textColor="black"
          />
        ))}
      </div>
    </div>
  );
}

export default FolderContainer;
