import React, { useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import Folders from './Folder.js'

function FolderDropdown({ folder, onToggleFolder, onToggleFile,textColor }) {
    const folderStyle = {
        listStyleType: 'none',
        marginLeft: '20px',
        cursor: 'pointer',
        // color: 'white'
    };

    const insideItemStyle = {
        marginLeft: '20px',
        cursor: 'pointer',
        // color: 'white'
    };

    const handleItemToggle = (item) => {
        if (item.type === 'file') {
            onToggleFile(item);
        } else {
            onToggleFolder(item);
        }
    };

    return (
        <div  style={folderStyle}>
            <div className={` ${folder.isOpen ? 'open' : ''}`} style={{textColor}} onClick={() => handleItemToggle(folder)}>
                {folder.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />} {folder.folderName}
            </div>
            {folder.isOpen && (
                <div style={insideItemStyle} >
                    {folder.items.map((item, index) => (
                        <div key={index} className={`folder ${item.isOpen ? 'open' : ''}`} style={{textColor}} onClick={() => handleItemToggle(item)}>
                            {item.type === 'file' ? (
                                <>
                                    <InsertDriveFileIcon style={{ fontSize: '20px' }} /> {item.fileName}
                                </>
                            ) : (
                                <FolderDropdown
                                    folder={item}
                                    onToggleFolder={() => handleItemToggle(item)}
                                    onToggleFile={(file) => onToggleFile(file)}
                                />
                            )}
                        </div>
                    ))}
                    <Folders />
                </div>
                
            )}
        </div>
    );
}

function FolderContainer() {
    const [folders, setFolders] = useState([
        createFolder('Folder 1', ['File 1', 'File 2', 'File 3']),
        createFolder('Folder 2', ['File 4', 'File 5']),
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

function createFolder(folderName, files = []) {
    return {
        folderName,
        items: files.map(file => ({ type: 'file', fileName: file, isOpen: false })),
        isOpen: false,
    };
}

export default FolderContainer;
