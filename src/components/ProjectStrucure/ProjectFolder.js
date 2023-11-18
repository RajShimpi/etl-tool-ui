import React, { useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import Folder from './Folder';

function FolderDropdown({ folder, onToggleFolder,}) {
    const folderStyle = {
        listStyleType: 'none',
        marginLeft: '10px',
        cursor: 'pointer',
        color:'white'
    };

    // const insidefileStyle = {
    //     marginLeft: '20px',
    //     cursor: 'pointer',
    //     color:'white'
    // };

    // const handleFileToggle = (file) => {
    //     onToggleFile(file);
    // };

    return (
        <>
            <div>
                <div className={`folder ${folder.isOpen ? 'open' : ''}`} style={folderStyle} onClick={onToggleFolder}>
                    {folder.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />} {folder.folderName}
                </div>
                {folder.isOpen && (
                    <Folder />
                )}
            </div>
        </>
    );
}

function FolderContainer() {
    const [folders, setFolders] = useState([
        createFolder('Folder 1'), // Add more folders
        createFolder('Folder 2'),
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