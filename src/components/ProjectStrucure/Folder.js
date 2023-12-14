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
  onToggleFile,
  onOpenFolder,
  onCloseFolder,
  textColor,
  projectId,
  parentId,
  id,
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
      } else {
        onOpenFolder(files);
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
          {files.isOpen && files.type === 'Folder' && files.files && (
            <div style={{ marginLeft: '40px', cursor: 'pointer' }}>
              {files.files.map((subItem, index) => (
                <FolderDropdown
                  key={index}
                  files={subItem}
                  onToggleFiles={onToggleFiles}
                  onToggleFile={onToggleFile}
                  onOpenFolder={onOpenFolder}
                  onCloseFolder={onCloseFolder}
                  textColor={textColor}
                  projectId={projectId}
                  parentId={parentId}
                  id={id}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};




function Folders({ parentId, projectId, textColor, id }) {
  const [files, setFiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios.getWithCallback('project-files/get-folder-hierarchy?projectId=' + projectId + '&parentId=' + parentId, (data) => {
      setFiles(data);
    });
  }, [parentId, projectId]);

  const toggleFiles = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].isOpen = !updatedFiles[index].isOpen;
    setFiles(updatedFiles);
  };

  const handleOpenFolder = (folder) => {
    console.log('Opened Folder:', folder.file_name);
    setIsOpen(true);
  };

  const handleCloseFolder = (folder) => {
    console.log('Closed Folder:', folder.file_name);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`${isOpen ? 'open' : ''}`}>
        {files.map((file, index) =>
          file && file.parent_id !== null ? (
            <FolderDropdown
              key={index}
              files={file}
              onToggleFiles={() => toggleFiles(index)}
              onToggleFile={(clickedFile) => console.log('Toggled File:', clickedFile.file_name)}
              onOpenFolder={handleOpenFolder}
              onCloseFolder={handleCloseFolder}
              textColor={textColor}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default Folders;