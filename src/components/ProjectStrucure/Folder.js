import React, { useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';

function FolderDropdown({ folder, onToggleFolder, onToggleFile }) {
    const folderStyle = {
        listStyleType: 'none',
        marginLeft: '35px',
        cursor: 'pointer',
        color: 'white'
    };

    const insidefileStyle = {
        marginLeft: '70px',
        cursor: 'pointer',
        color: 'white'
    };

    const handleFileToggle = (file) => {
        onToggleFile(file);
    };

    return (
        <div>
            <div className={` ${folder.isOpen ? 'open' : ''}`} style={folderStyle} onClick={onToggleFolder}>
                {folder.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />} {folder.folderName}
            </div>
            {folder.isOpen && (
                <div>
                    {folder.files.map((file, index) => (
                        <div key={index} className={`folder ${file.isOpen ? 'open' : ''}`} style={insidefileStyle} onClick={() => handleFileToggle(file)}>
                            <InsertDriveFileIcon style={{ fontSize: '20px' }} />  {file.fileName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Folder() {
    const [folders, setFolders] = useState([
        createFolder('SubFolder 1', [
            { fileName: 'File 1' },
            { fileName: 'File 2' },
            { fileName: 'File 2' },
            { fileName: 'File 2' },
            { fileName: 'File 2' }
        ]),
        createFolder('SubFolder 2', [
            { fileName: 'File 3' },
            { fileName: 'File 4' }
        ]),
        // Add more folders as needed
    ],);

    const toggleFolder = (index) => {
        const updatedFolders = [...folders];
        updatedFolders[index].isOpen = !updatedFolders[index].isOpen;
        setFolders(updatedFolders);
    };

    const toggleFile = (folderIndex, clickedFile) => {
        const updatedFolders = [...folders];
        updatedFolders[folderIndex].files = updatedFolders[folderIndex].files.map(file => {
            if (file === clickedFile) {
                return { ...file, isOpen: !file.isOpen };
            }
            return file;
        });
        setFolders(updatedFolders);
    };

    const style = {
        overflow: "hidden"
    };

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

function createFolder(folderName, files = []) {
    return {
        folderName,
        files,
        isOpen: false,
    };
}

export default Folder;
