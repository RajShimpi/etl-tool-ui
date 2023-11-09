import React, { useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './LeftSidebar.css'


function FolderDropdown({ folder, onToggleFolder, onToggleFile }) {
  const folderStyle = {
    listStyleType: 'none',
    marginLeft: '10px',
    cursor: 'pointer',
  };

  const insidefileStyle = {
    marginLeft: '20px',
    cursor: 'pointer',
  };

  const handleFileToggle = (file) => {
    onToggleFile(file);
  };

  const fileStyle = {
    display: "flex",
    flexDirection: "column",
    marginLeft: "40px"
  }

  return (
    <>
      <div>
        <div className={`folder ${folder.isOpen ? 'open' : ''}`} style={folderStyle} onClick={onToggleFolder}>
          {folder.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />} {folder.folderName}
        </div> 
        {folder.isOpen && (
          <div>
            <div>
              <div className={`folder  ${folder.openFiles.file1 ? 'open' : ''}`} style={insidefileStyle} onClick={() => handleFileToggle('file1')}>
                {folder.openFiles.file1 ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />} {folder.insidefilename}
              </div>
              {folder.openFiles.file1 && (
                <div className="dropdown-content" style={fileStyle}>
                  <a href="#" onClick={() => handleFileToggle('')}>
                    <InsertDriveFileIcon fontSize='small' /> {folder.filename}
                  </a>
                  <a href="#" onClick={() => handleFileToggle('')}>
                    <InsertDriveFileIcon fontSize='small' />{folder.filename}
                  </a>
                  <a href="#" onClick={() => handleFileToggle('')}>
                    <InsertDriveFileIcon fontSize='small' />{folder.filename}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function FolderContainer() {
  const [folders, setFolders] = useState([
    createFolder('Folder1', 'File1', 'InsideFile1'), // Add more folders
    createFolder('Folder2', 'File2', 'InsideFile2'),
    createFolder('Folder3', 'File2', 'InsideFile3'),
    createFolder('Folder4', 'File2', 'InsideFile4'),
    createFolder('Folder5', 'File2', 'InsideFile5'),
    createFolder('Folder6', 'File2', 'InsideFile6'),
    createFolder('Folder7', 'File2', 'InsideFile7'),
    createFolder('Folder8', 'File2', 'InsideFile8'),
    createFolder('Folder9', 'File2', 'InsideFile9'),
    createFolder('Folder10', 'File2', 'InsideFile10'),
  ]);

  const toggleFolder = (index) => {
    const updatedFolders = [...folders];
    updatedFolders[index].isOpen = !updatedFolders[index].isOpen;
    setFolders(updatedFolders);
  };

  const toggleFile = (folderIndex, file) => {
    const updatedFolders = [...folders];
    updatedFolders[folderIndex].openFiles[file] = !updatedFolders[folderIndex].openFiles[file];
    setFolders(updatedFolders);
  };
  const style = {
    // height: "500px",
    // paddingTop: "10px",
    // border: '1px solid black',
    overflow: "hidden"
  }
  return (
    <div>
      
      <div style={style}>
        {folders.map((folder, index) => (
          <FolderDropdown
            key={index}
            folder={folder}
            onToggleFolder={() => toggleFolder(index)}
            onToggleFile={(file) => toggleFile(index, file)}
          />
        ))}
      </div>
    </div>
  );
}

function createFolder(folderName, filename, insidefilename) {
  return {
    folderName,
    filename,
    insidefilename,
    isOpen: false,
    openFiles: { file1: false, file2: false, file3: false },
  };
}

export default FolderContainer;