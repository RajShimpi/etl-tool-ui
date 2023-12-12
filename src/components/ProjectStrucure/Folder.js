import React, { useEffect, useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import ContextMenu from '../ContextMenu';
import axios from '../../modules/services/axios';

function FolderDropdown({
    files,
    onToggleFiles,
    onToggleFile,
    textColor,
    closeContextMenu,
    setContextMenu,
}) {
    const folderStyle = {
        listStyleType: 'none',
        cursor: 'pointer',
        marginLeft: '20px',
    };

    const insidefileStyle = {
        marginLeft: '40px',
        cursor: 'pointer',
    };

    const handleContextMenu = (event, type, projectId, parentId) => {
        event.preventDefault();

        closeContextMenu(() => {
            console.log("Opening new context menu...");
            setContextMenu({
                type,
                position: { top: event.clientY, left: event.clientX + 10 },
                project: { id: projectId, parent_id: parentId },
            });
        });
    };

    const handleFileToggle = (file) => {
        onToggleFile(file);
    };

    return (
        <div style={folderStyle}>
            <div
                className={`${files.isOpen ? 'open' : ''}`}
                style={textColor}
                onClick={() => onToggleFiles(files)}
                onContextMenu={(e) => handleContextMenu(e, 'right', files.id, files.parent_id)}
            >
                {files.type === 'Folder' ? (
                    files.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />
                ) : (
                    <InsertDriveFileIcon fontSize='small' />
                )}{' '}
                {files.file_name}

            </div>
            {files.isOpen && (
                <div style={insidefileStyle}>
                    {files.files.map((file, index) => (
                        <div
                            key={index}
                            className={`folder ${file.isOpen ? 'open' : ''}`}
                            style={textColor}
                            onClick={() => handleFileToggle(file)}
                            onContextMenu={(e) => handleContextMenu(e, 'right', file.project_id, file.parent_id)}
                        >
                            {file.type === 'Folder' ? (
                                file.isOpen ? <FolderOpenIcon style={{ fontSize: '20px' }} /> : <FolderIcon style={{ fontSize: '20px' }} />
                            ) : (
                                <InsertDriveFileIcon style={{ fontSize: '20px' }} />
                            )}{' '}
                            {file.file_name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Folders() {
    const [files, setFiles] = useState([]);
    const [contextMenu, setContextMenu] = useState(null);

    useEffect(() => {
        axios.getWithCallback('project-files/', (data) => {
            setFiles(data);
        });
    }, []);

    const toggleFiles = (index) => {
        const updatedFiles = [...files];
        updatedFiles[index].isOpen = !updatedFiles[index].isOpen;
        setFiles(updatedFiles);
    };

    const toggleFile = (filesIndex, clickedFile) => {
        const updatedFiles = [...files];
        updatedFiles[filesIndex].files = updatedFiles[filesIndex].files.map((file) => {
            if (file === clickedFile) {
                return { ...file, isOpen: !file.isOpen };
            }
            return file;
        });
        setFiles(updatedFiles);
    };

    const closeContextMenu = (callback) => {
        setContextMenu(null);
        if (callback) {
            callback();
        }
    };

    const style = {
        overflow: 'hidden',
    };

    return (
        <div>
            <div style={style}>
                {files.map((files, index) => (
                    <FolderDropdown
                        key={index}
                        files={files}
                        onToggleFiles={() => toggleFiles(index)}
                        onToggleFile={(file) => toggleFile(index, file)}
                        closeContextMenu={closeContextMenu}
                        setContextMenu={setContextMenu}
                    />
                ))}
            </div>
            {contextMenu && (
                <ContextMenu
                    onToggleFiles={(files) => toggleFile(files.indexOf(files))}
                    popType={contextMenu.type}
                    project_id={contextMenu.project.id}
                    parent_id={contextMenu.project.parent_id}
                    onClose={() => closeContextMenu()}
                />
            )}
        </div>
    );
}

export default Folders;