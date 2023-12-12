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

    const handleContextMenu = (event, type, projectId, parentId, file_name) => {
        event.preventDefault();

        closeContextMenu(() => {
            console.log(projectId, file_name);
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
        <div style={{ listStyleType: 'none', cursor: 'pointer', marginLeft: '20px' }}>
        {/* Check if parentId is not null before rendering the content */}
        {files.parentId !== null && (
            <div
                className={` ${files.isOpen ? 'open' : ''}`}
                style={{ textColor }} 
                onClick={() => handleFileToggle()}
                onContextMenu={(e) => handleContextMenu(e, 'right')}
            >
                {files.type === 'Folder' ? (
                    files.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />
                ) : (
                    <InsertDriveFileIcon fontSize='small' />
                )}{' '}
                {files.file_name}
            </div>
        )}
    
        {files.isOpen && files.type === 'Folder' && files.files && (
            <div style={{ marginLeft: '20px' }}>
                {files.files.map((subItem, index) => (
                    <FolderDropdown
                        key={index}
                        item={subItem}
                        onToggleFiles={() => onToggleFiles(subItem)}
                        onToggleFile={() => onToggleFile(subItem)}
                        textColor={textColor}
                        closeContextMenu={closeContextMenu}
                        setContextMenu={setContextMenu}
                    />
                ))}
            </div>
        )}
    </div>
    
    );
}

function Folders({ parentId }) {
    const [files, setFiles] = useState([]);
    const [contextMenu, setContextMenu] = useState(null);

    useEffect(() => {
        axios.getWithCallback('project-files/' + parentId, (data) => {
            setFiles(data);
        });
    }, [parentId]);

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
                    // Check if parent_id is null before rendering FolderDropdown
                    (files.parent_id === null) && (
                        <FolderDropdown
                            key={index}
                            files={files}
                            onToggleFiles={() => toggleFiles(index)}
                            onToggleFile={(file) => toggleFile(index, file)}
                            closeContextMenu={closeContextMenu}
                            setContextMenu={setContextMenu}
                        />
                    )
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