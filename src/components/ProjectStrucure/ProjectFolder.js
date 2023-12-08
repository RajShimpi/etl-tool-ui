import React, { useEffect, useState, useRef } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import ContextMenu from '../ContextMenu';
import axios from '../../modules/services/axios';

function FolderDropdown({
  item,
  onToggleFolder,
  onToggleFile,
  textColor,
  project_id,
  parent_id,
  onContextMenu,
  openContextMenuForItemId,
}) {
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const dropdownRef = useRef(null);

  const handleItemToggle = () => {
    if (item.type === 'file') {
      onToggleFile(item.file_name);
    } else {
      onToggleFolder(item, project_id, parent_id);
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenuPosition({ top: event.clientY, left: event.clientX });
    onContextMenu(item, project_id, parent_id);
  };

  const closeContextMenu = () => {
    setContextMenuPosition(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest('.contextMenu')
      ) {
        closeContextMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef, closeContextMenu]);

  return (
    <div className="folderstyle"style={{ color: textColor }} onContextMenu={handleContextMenu} ref={dropdownRef}>
      <div
        className={` ${item.isOpen ? 'open' : ''}`}
        style={{ color: textColor }}
        onDoubleClick={handleItemToggle}
      >
        {item.type === 'Folder' && (
          item.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />
        )}
        {item.type === 'File' && <InsertDriveFileIcon fontSize='small' />}
        {item.file_name}
      </div>
      {contextMenuPosition && openContextMenuForItemId === item.id && (
        <ContextMenu
          onClose={closeContextMenu}
          project_id={project_id}
          parent_id={parent_id}
          textColor={textColor}
          position={contextMenuPosition}
        />
      )}
      {item.isOpen && item.items && (
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

function FolderContainer() {
  const [projects, setProjects] = useState([]);
  const [openContextMenuForItemId, setOpenContextMenuForItemId] = useState(null);

  useEffect(() => {
    axios.getWithCallback('project-files/', (data) => {
      setProjects(data);
    });
  }, []);

  const toggleFolder = (clickedProject) => {
    console.log('Toggled Folder:', clickedProject);
  };

  const handleToggleFile = (fileName) => {
    console.log('Toggled File:', fileName);
  };

  const handleContextMenu = (item, project_id, parent_id) => {
    console.log('Right-clicked on:', item);
    console.log('Project ID:', project_id);
    console.log('Parent ID:', parent_id);
    setOpenContextMenuForItemId(null);
    setOpenContextMenuForItemId(item.id);
  };

  return (
    <div>
      {projects.map((project, index) => (
        <FolderDropdown
          key={index}
          item={project}
          onToggleFolder={(clickedProject) => toggleFolder(clickedProject)}
          onToggleFile={(fileName) => handleToggleFile(fileName)}
          textColor="black"
          project_id={project.project_id}
          parent_id={project.parent_id}
          onContextMenu={(item, project_id, parent_id) =>
            handleContextMenu(item, project_id, parent_id)
          }
          openContextMenuForItemId={openContextMenuForItemId}
        />
      ))}
    </div>
  );
}

export default FolderContainer;
