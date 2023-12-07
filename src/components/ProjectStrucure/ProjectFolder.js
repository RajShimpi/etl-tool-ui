import React, { useState, useEffect } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import axios from '../../modules/services/axios.js';

function FolderDropdown({
  item,
  onToggleFolder,
  onToggleFile,
  textColor,
  onContextMenu,
  project_id, parent_id
}) {
  const handleItemToggle = () => {
    if (item.type === 'file') {
      onToggleFile(item.file_name);
    } else {
      onToggleFolder(item,project_id, parent_id);
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    onContextMenu(item, project_id, parent_id);
    console.log('Props in FolderDropdown:', item.project_id, item.parent_id);
  };

  return (
    <div className="folderstyle">
      <div
        className={` ${item.isOpen ? 'open' : ''}`}
        style={{ textColor }}
        onClick={() => {
          handleItemToggle();
        }}
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
              onToggleFolder={onToggleFolder}
              onToggleFile={onToggleFile}
              textColor={textColor}
              onContextMenu={onContextMenu}
              project_id={project_id}
            parent_id={ parent_id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FolderContainer({ projectList, parent_id, project_id }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.getWithCallback('project-files/', (data) => {
      setProjects(data);
    });
  }, []);

  const toggleFolder = (clickedProject) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === clickedProject.id) {
          return { ...project, isOpen: !project.isOpen };
        } else {
          return project;
        }
      });
    });
  };

  const handleContextMenu = (item) => {
    console.log('Right-clicked on:', item);
    console.log('Project ID:', item.project_id);
    console.log('Parent ID:', item.parent_id);
  };

  return (
    <div>
      <div>
        {projects.map((project, index) => (
          <FolderDropdown
            key={index}
            item={project}
            onToggleFolder={(clickedProject) => toggleFolder(clickedProject, project_id, parent_id)}
            onToggleFile={(fileName) => console.log('Toggled File:', fileName)}
            textColor="black"
            onContextMenu={(clickedItem) => handleContextMenu(clickedItem, project_id, parent_id)}
            project_id={project_id}
            parent_id={parent_id}
          />
        ))}
      </div>
    </div>
  );
}

export default FolderContainer;