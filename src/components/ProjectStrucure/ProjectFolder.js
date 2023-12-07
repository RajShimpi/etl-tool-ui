import React, { useState, useEffect } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import axios from '../../modules/services/axios.js';

function FolderDropdown({ item, onToggleFolder, onToggleFile, textColor, onContextMenu }) {
  const handleItemToggle = () => {
    if (item.type === 'file') {
      onToggleFile(item.file_name);
    } else {
      onToggleFolder(item);
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    onContextMenu(item);
  };

  return (
    <div className="folderstyle">
      <div
        className={` ${item.isOpen ? 'open' : ''}`}
        style={{ textColor }}
        onClick={handleItemToggle}
        onContextMenu={handleContextMenu}
      >
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
              onContextMenu={onContextMenu}
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

  const handleContextMenu = (item) => {
    console.log('Right-clicked on:', item);
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
            onContextMenu={handleContextMenu}
          />
        ))}
      </div>
    </div>
  );
}

export default FolderContainer;
