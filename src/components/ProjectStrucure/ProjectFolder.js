import React, { useEffect, useState, useRef } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import ContextMenu from '../ContextMenu';
import axios from '../../modules/services/axios';
import Folders from './Folder';

function FolderDropdown({
  item,
  onToggleFolder,
  onToggleFile,
  textColor,
  project_id,
  parent_id,
  id,
  onContextMenu,
  openContextMenuForItemId,
}) {
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [isContextMenuOpen, setContextMenuOpen] = useState(false);
  const containerRef = useRef(null);

  const handleItemToggle = () => {
    if (item.type === 'Folder') {
      onToggleFolder(item);
    } else if (item.type === 'File') {
      onToggleFile(item);
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenuPosition({ top: event.clientY, left: event.clientX });
    onContextMenu(item, project_id, parent_id, id);
    setContextMenuOpen(true);
  };

  const closeContextMenu = () => {
    setContextMenuPosition(null);
    setContextMenuOpen(false);
  };

  const handleDocumentClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      closeContextMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className='folderstyle' ref={containerRef}>
      <div
        className={` ${item.isOpen ? 'open' : ''}`}
        style={{ textColor }}
        onClick={() => handleItemToggle(item)}
        onContextMenu={handleContextMenu}
      >
        {item.type === 'Folder' && (
          item.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />
        )}
        {item.type === 'File' && <InsertDriveFileIcon fontSize='small' />}
        {item.file_name}
        {contextMenuPosition && openContextMenuForItemId === item.id && isContextMenuOpen && (
          <ContextMenu
            onClose={closeContextMenu}
            project_id={project_id}
            parent_id={parent_id}
            id={id}
            textColor={textColor}
            position={contextMenuPosition}
          />
        )}
        {item.isOpen && item.type === 'Folder' && <Folders parentId={item.id} projectId={project_id} />}
      </div>
       {item.type === 'Folder' && item.isOpen && item.items && (
        <div className="insideItemStyle">
          {item.items.map((subItem, index) => (
            <FolderDropdown
              key={index}
              item={subItem}
              onToggleFolder={onToggleFolder}
              onToggleFile={onToggleFile}
              textColor={textColor}
              project_id={project_id}
              parent_id={parent_id}
              onContextMenu={onContextMenu}
              openContextMenuForItemId={openContextMenuForItemId}
            />
          ))}
        </div>
      )} 
    </div>
  );
}

function FolderContainer({parentId,projectId}) {
  const [folder, setFolder] = useState([]);
  const [openContextMenuForItemId, setOpenContextMenuForItemId] = useState(null);

  useEffect(() => {
    let url = parentId ? 'project-files/get-folder-hierarchy?projectId=' + projectId + '&parentId='+parentId : 'project-files/get-folder-hierarchy?projectId=' + projectId 
    axios.getWithCallback(url, (data) => {

      setFolder(data);
      console.log(data);
    });
  }, [parentId,projectId]);

  const toggleFolder = (clickedFolder) => {
    setFolder((prevFolder) =>
      prevFolder.map((folder) =>
        folder === clickedFolder ? { ...folder, isOpen: !folder.isOpen } : folder
      )
    );
  };
  

  let toggleFile = (clickedFile) => {
    console.log('Toggled File:', clickedFile.file_name);
  };

  let handleContextMenu = (item, project_id, parent_id,id) => {
    console.log('Right-clicked on:', item);
    console.log('Project ID:', project_id);
    console.log('Parent ID:', parent_id);
    console.log('Id:', id);
    console.log('File Name:', item.file_name);
    setOpenContextMenuForItemId(item.id);
  };

  return (
    <div>
      {folder.map((folder, index) => (
        <FolderDropdown
          key={index}
          item={folder}
          onToggleFolder={() => toggleFolder(folder)}
          onToggleFile={() => toggleFile(folder)}
          project_id={folder.project_id}
          parent_id={folder.parent_id}
          id={folder.id}
          onContextMenu={(item, project_id, parent_id,id) =>
            handleContextMenu(item, project_id, parent_id,id)
          }
          openContextMenuForItemId={openContextMenuForItemId}
        />
      ))}
      {/* <Folders items={projects} onToggleFile={toggleFile} textColor="black" /> */}
    </div>
  );
}

export default FolderContainer;