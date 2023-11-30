import React, { useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';

function FolderDropdown({ folder, onToggleFolder, onToggleFile, textColor }) {

    const handleFileToggle = (file) => {
        onToggleFile(file);
    };  

    return (
        <div className='folderStyle'>
            <div className={` ${folder.isOpen ? 'open' : ''}`} style={textColor} onClick={onToggleFolder}>
                {folder.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />} {folder.folderName}
            </div>
            {folder.isOpen && (
                <div className='insidefileStyle'>
                    {folder.files.map((file, index) => (
                        <div key={index} className={`folder ${file.isOpen ? 'open' : ''}`} style={textColor} onClick={() => handleFileToggle(file)}>
                            <InsertDriveFileIcon style={{ fontSize: '20px' }} />  {file.fileName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Folders() {
    const [folders, setFolders] = useState([
        createFolder('SubFolder 1', [
            { fileName: 'File 1' },
            { fileName: 'File 2' },
            { fileName: 'File 3' },
            { fileName: 'File 4' },
            { fileName: 'File 5' }
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
;

    return (
        <div>
            <div >
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

export default Folders;
