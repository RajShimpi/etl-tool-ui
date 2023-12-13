import React, { useEffect, useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import ContextMenu from '../ContextMenu';
import axios from '../../modules/services/axios';

// import React, { useState } from 'react';
// import FolderOpenIcon from '@mui/icons-material/FolderOpen';
// import FolderIcon from '@mui/icons-material/Folder';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import './project.css';
// import ContextMenu from '../ContextMenu';

const FolderDropdown = ({
  files,
  onToggleFiles,
  onToggleFile,
  onOpenFolder,
  onCloseFolder,
  textColor,
  closeContextMenu,
  setContextMenu,
}) => {
  const folderStyle = {
    listStyleType: 'none',
    cursor: 'pointer',
    marginLeft: '20px',
  };

  const insidefileStyle = {
    marginLeft: '40px',
    cursor: 'pointer',
  };

  const handleContextMenu = (event, type, projectId, parentId, file_name, id) => {
    event.preventDefault();

    closeContextMenu(() => {
      setContextMenu({
        type,
        position: { top: event.clientY, left: event.clientX + 10 },
        project: { project_id: projectId, parent_id: parentId, id: id },
      });
    });
  };

  const handleFileToggle = () => {
    if (files.type === 'Folder') {
      onToggleFiles(files);
      if (files.isOpen) {
        onCloseFolder(files);
      } else {
        onOpenFolder(files);
      }
    } else {
      onToggleFile(files);
      if (files.file_name === 'file_nameget' && files.parent.file_name === 'file_namepull') {
        // Open the "file_nameget" folder
        onOpenFolder(files);
      } else if (files.file_name === 'file_namepull') {
        // Close the parent "file_namepull" folder
        onCloseFolder(files.parent);
      }
    }
  };

  return (
    <div style={folderStyle}>
      {files.parentId !== null && (
        <div
          className={` ${files.isOpen ? 'open' : ''}`}
          style={{ textColor }}
          onClick={handleFileToggle}
          onContextMenu={(e) =>
            handleContextMenu(e, 'right', files.projectId, files.parentId, files.file_name, files.id)
          }
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
          {files.isOpen  && files.files && (
            <div style={insidefileStyle}>
              {files.files.map((subItem, index) => (
                <FolderDropdown
                  key={index}
                  files={subItem}
                  onToggleFiles={onToggleFiles}
                  onToggleFile={onToggleFile}
                  onOpenFolder={onOpenFolder}
                  onCloseFolder={onCloseFolder}
                  textColor={textColor}
                  closeContextMenu={closeContextMenu}
                  setContextMenu={setContextMenu}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
 


function Folders({ parentId, projectId }) {
    const [files, setFiles] = useState([]);
    const [contextMenu, setContextMenu] = useState(null);

    useEffect(() => {
        axios.getWithCallback('project-files/get-folder-hierarchy?projectId=' + projectId + '&parentId='+parentId, (data) => {
            setFiles(data);
        });
    }, [parentId,projectId]);


    const toggleFiles = (index) => {
        const updatedFiles = [...files];
        updatedFiles[index].isOpen = !updatedFiles[index].isOpen;
        setFiles(updatedFiles);
    };

    const handleOpenFolder = (folder) => {
        console.log('Opened Folder:', folder.file_name);
    };

    const handleCloseFolder = (folder) => {
        console.log('Closed Folder:', folder.file_name);
    };

    return (
        <div>
            <div>
                {files.map((file, index) =>
                    file && file.parent_id !== null ? (
                        <FolderDropdown
                            key={index}
                            files={file}
                            onToggleFiles={() => toggleFiles(index)}
                            onToggleFile={(clickedFile) => console.log('Toggled File:', clickedFile.file_name)}
                            onOpenFolder={handleOpenFolder}
                            onCloseFolder={handleCloseFolder}
                            textColor="black"
                            closeContextMenu={() => setContextMenu(null)}
                            setContextMenu={setContextMenu}
                        />
                    ) : null
                )}
            </div>
            {contextMenu && (
                <ContextMenu
                    onToggleFiles={() => console.log('Toggled Files')}
                    popType={contextMenu.type}
                    project_id={contextMenu.project.id}
                    parent_id={contextMenu.project.parent_id}
                    id={contextMenu.project.id}
                    onClose={() => setContextMenu(null)}
                />
            )}
        </div>
    );
}

export default Folders;
