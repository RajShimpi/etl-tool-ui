import React, { useEffect, useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import ContextMenu from '../ContextMenu';
import axios from '../../modules/services/axios';

function FolderDropdown({
    project,
    onToggleFolder,
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
                className={` ${project.isOpen ? 'open' : ''}`}
                style={textColor}
                onClick={() => onToggleFolder(project)}
                onContextMenu={(e) => handleContextMenu(e, 'right', project.id, project.parent_id)}
            >
                {project.type === 'Folder' ? (
                    project.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />
                ) : (
                    <InsertDriveFileIcon fontSize='small' />
                )}{' '}
                {project.file_name}
            </div>
            {project.isOpen && (
                <div style={insidefileStyle}>
                    {project.files.map((file, index) => (
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
    const [projects, setProjects] = useState([]);
    const [contextMenu, setContextMenu] = useState(null);

    useEffect(() => {
        axios.getWithCallback('project-files/', (data) => {
            setProjects(data);
        });
    }, []);

    const toggleFolder = (index) => {
        const updatedProjects = [...projects];
        updatedProjects[index].isOpen = !updatedProjects[index].isOpen;
        setProjects(updatedProjects);
    };

    const toggleFile = (folderIndex, clickedFile) => {
        const updatedProjects = [...projects];
        updatedProjects[folderIndex].files = updatedProjects[folderIndex].files.map((file) => {
            if (file === clickedFile) {
                return { ...file, isOpen: !file.isOpen };
            }
            return file;
        });
        setProjects(updatedProjects);
    };

    const closeContextMenu = (callback) => {
        console.log("Closing context menu...");
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
                {projects.map((project, index) => (
                    <FolderDropdown
                        key={index}
                        project={project}
                        onToggleFolder={() => toggleFolder(index)}
                        onToggleFile={(file) => toggleFile(index, file)}
                        closeContextMenu={closeContextMenu}
                        setContextMenu={setContextMenu}
                    />
                ))}
            </div>
            {contextMenu && (
                <ContextMenu
                    onToggleFolder={(project) => toggleFolder(projects.indexOf(project))}
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