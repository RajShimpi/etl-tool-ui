import React, { useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import Folders from './Folder.js';

function FolderDropdown({ folder, onToggleFolder, onToggleFile, textColor }) {
    const handleItemToggle = (item) => {
        if (item.type === 'file') {
            onToggleFile(item.fileName);
        } else {
            onToggleFolder(item);
        }
    };

    return (
        <div className="folderstyle">
            <div className={` ${folder.isOpen ? 'open' : ''}`} style={{ textColor }} onClick={() => handleItemToggle(folder)}>
                {folder.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />} {folder.folderName}
            </div>
            {folder.isOpen && (
                <div className="insideItemStyle">
                    {folder.items.map((item, index) => (
                        <div key={index} className={`folder ${item.isOpen ? 'open' : ''}`} style={{ textColor }} onClick={() => handleItemToggle(item)}>
                            {item.type === 'file' ? (
                                <>
                                    <div className={`Folder ${item.isOpen ? '' : ''}`}><InsertDriveFileIcon style={{ fontSize: '20px' }} />{item.fileName}</div>
                                </>
                            ) : (
                                <FolderDropdown
                                    folder={item}
                                    onToggleFolder={() => handleItemToggle(item)}
                                    onToggleFile={() => onToggleFile(item.fileName)}
                                    textColor={textColor}
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

    const toggleFolder = (folder) => {
        const updatedFolders = [...folders];
        const targetFolder = updatedFolders.find(f => f.folderName === folder.folderName);
        targetFolder.isOpen = !targetFolder.isOpen;
        setFolders(updatedFolders);
    };

    const toggleFile = (file) => {
        setFolders(prevFolders => {
            const updatedFolders = [...prevFolders];
            updatedFolders.forEach(folder => {
                folder.items.forEach(item => {
                    if (item.fileName === file) {
                        item.isOpen = !item.isOpen;
                    }
                });
            });
            return updatedFolders;
        });
    };

    return (
        <div>
            <div>
                {folders.map((folder, index) => (
                    <FolderDropdown
                        key={index}
                        folder={folder}
                        onToggleFolder={() => toggleFolder(folder)}
                        onToggleFile={() => toggleFile(folder)}
                        textColor="black"
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
