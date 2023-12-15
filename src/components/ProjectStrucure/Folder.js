import React, { useEffect, useState, useRef } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import ContextMenu from '../ContextMenu';
import axios from '../../modules/services/axios';

const FolderDropdown = ({
  files,
  onToggleFiles,
  onOpenFolder,
  onCloseFolder,
  textColor,
  handleItemToggle,
  projectId,
  parentId,
  id,
  handleFileToggles,
}) => {
  const [contextMenu, setContextMenu] = useState(false);
  const folderRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (folderRef.current && !folderRef.current.contains(event.target)) {
        setContextMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleFileToggle = () => {
    if (files.type === 'Folder') {
      onToggleFiles(files);
      if (files.isOpen) {
        onCloseFolder(files);
        console.log('close');
      } else {
        onOpenFolder(files);
        console.log('open');
      }
    } else if (files.type === 'File') {
      onToggleFiles(files);
      if (files.isOpen) {
        onCloseFolder(files);
        console.log('close');
      } else {
        onOpenFolder(files);
        console.log('open');
      }
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(true);
  };

  return (
    <div ref={folderRef} style={{ listStyleType: 'none', cursor: 'pointer', marginLeft: '20px' }}>
      {files.parentId !== null && (
        <div
          className={` ${files.isOpen ? 'open' : ''}`}
          style={{ textColor }}
          onClick={handleFileToggle}
          onContextMenu={handleContextMenu}
        >
          {files.type === 'Folder' ? (
            files.isOpen ? (
              <FolderOpenIcon fontSize='small' />
            ) : (
              <FolderIcon fontSize='small' />
            )
          ) : (
            <InsertDriveFileIcon fontSize='small' />
          )}{' '}
          {files.file_name}
          {contextMenu && (
            <ContextMenu
              projectId={projectId}
              parentId={parentId}
              id={id}
              textColor={textColor}
              onClose={() => setContextMenu(false)}
            />
          )}
          {files.isOpen && files.type === 'Folder' && (
            <Folders parentId={files.id} projectId={projectId} handleItemToggle={handleItemToggle} handleFileToggles={handleFileToggles} />
          )}
        </div>
      )}
    </div>
  );
};

// Import necessary dependencies and components
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import FolderDropdown from './FolderDropdown'; // Make sure to replace with the correct path

// Your Folders component
function Folders({ parentId, projectId, textColor, id, handleItemToggle, handleFileToggles }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`project-files/get-folder-hierarchy?projectId=${projectId}&parentId=${parentId}`);
        const initialFiles = response.data.map(file => ({ ...file, isOpen: false }));
        setFiles(initialFiles);
        console.log(initialFiles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [parentId, projectId]);

  const toggleFiles = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].isOpen = !updatedFiles[index].isOpen;
    setFiles(updatedFiles);
  };

  const handleOpenFolder = (clickedFolder) => {
    console.log('Opened Folder:', clickedFolder.file_name);
    handleItemToggle(clickedFolder);
  };

  const handleCloseFolder = (clickedFolder) => {
    console.log('Closed Folder:', clickedFolder.file_name);
    handleItemToggle(clickedFolder);
  };

  return (
    <div>
      <div>
        {files.map((file, index) =>
          file && file.parent_id !== null ? (
            <FolderDropdown
              key={index}
              files={file}
              isOpen={file.isOpen}
              onToggleFiles={() => toggleFiles(index)}
              onToggleFile={(clickedFile) => console.log('Toggled File:', clickedFile.file_name)}
              onOpenFolder={() => handleOpenFolder(file)}
              onCloseFolder={() => handleCloseFolder(file)}
              textColor={textColor}
              projectId={projectId}
              parentId={parentId}
              id={id}
              handleItemToggle={handleItemToggle}
              handleFileToggles={handleFileToggles}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default Folders;
