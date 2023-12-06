import React, { useState, useEffect } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import axios from '../../modules/services/axios.js';

function FolderDropdown({ folder, onToggleFolder, onToggleFile, textColor }) {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/project-files`)
      .then(response => {
        setApiData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [folder.id]);

  const handleItemToggle = (item) => {
    if (item.type === 'file') {
      onToggleFile(item.file_name);
    } else {
      onToggleFolder(item);
    }
  };

  return (
    <div className="folderstyle">
      <div className={` ${folder.isOpen ? 'open' : ''}`} style={{ textColor }} onClick={() => handleItemToggle(folder)}>
        {folder.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />} {folder.file_name}
      </div>
      {folder.isOpen && (
        <div className="insideItemStyle">
          {apiData.map((item, index) => (
            <div key={index} className={`folder ${item.isOpen ? 'open' : ''}`} style={{ textColor }} onClick={() => handleItemToggle(item)}>
              {item.type === 'file' ? (
                <>
                  <div className={`Folder ${item.isOpen ? '' : ''}`}>
                    <InsertDriveFileIcon style={{ fontSize: '20px' }} />
                    {item.file_name}
                  </div>
                </>
              ) : (
                <FolderDropdown
                  folder={item}
                  onToggleFolder={() => handleItemToggle(item)}
                  onToggleFile={() => onToggleFile(item.file_name)}
                  textColor={textColor}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FolderContainer() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/project-files')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const toggleFolder = (project) => {
    setProjects(prevProjects => {
      const updatedProjects = [...prevProjects];
      const targetProject = updatedProjects.find(p => p.id === project.id);
      targetProject.isOpen = !targetProject.isOpen;
      return updatedProjects;
    });
  };

  const toggleFile = (file) => {
    console.log('Toggle File:', file);
  };

  return (
    <div>
      <div>
        {projects.map((project, index) => (
          <FolderDropdown
            key={index}
            folder={project}
            onToggleFolder={() => toggleFolder(project)}
            onToggleFile={() => toggleFile(project)}
            textColor="black"
          />
        ))}
      </div>
    </div>
  );
}

export default FolderContainer;
