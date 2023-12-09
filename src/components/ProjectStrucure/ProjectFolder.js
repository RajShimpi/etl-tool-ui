import React, { useEffect, useState } from 'react';
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
  onContextMenu,
  openContextMenuForItemId,
}) {
  const [contextMenuPosition, setContextMenuPosition] = useState(null);

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
    onContextMenu(item, project_id, parent_id);
  };

  const closeContextMenu = () => {
    setContextMenuPosition(null);
  };

  return (
    <div className="folderstyle" style={{  textColor }} onContextMenu={handleContextMenu}>
      <div
        className={` ${item.isOpen ? 'open' : ''}`}
        style={{  textColor }}
        onClick={handleItemToggle}
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

function FolderContainer() {
  const [projects, setProjects] = useState([]);
  const [openContextMenuForItemId, setOpenContextMenuForItemId] = useState(null);

  useEffect(() => {
      axios.getWithCallback('project-files/', (data) => {
          setProjects(data);
          console.log(data);
      });
  }, []);

  const toggleFolder = (clickedFolder) => {
      setProjects((prevProjects) =>
          prevProjects.map((project) =>
              project === clickedFolder ? { ...project, isOpen: !project.isOpen } : project
          )
      );
  };

  const toggleFile = (clickedFile) => {
      console.log('Toggled File:', clickedFile.fileName);
  };

  const handleContextMenu = (item, project_id, parent_id) => {
      console.log('Right-clicked on:', item);
      console.log('Project ID:', project_id);
      console.log('Parent ID:', parent_id);
      console.log('File Name:', item.fileName); 
      setOpenContextMenuForItemId(item.id);
  };

  return (
      <div>
          {projects.map((project, index) => (
              <FolderDropdown
                  key={index}
                  item={project}
                  onToggleFolder={() => toggleFolder(project)}
                  onToggleFile={() => toggleFile(project)}
                  textColor="black"
                  project_id={project.project_id}
                  parent_id={project.parent_id}
                  onContextMenu={(item, project_id, parent_id) =>
                      handleContextMenu(item, project_id, parent_id)
                  }
                  openContextMenuForItemId={openContextMenuForItemId}
              />
          ))}
          <Folders items={projects} onToggleFile={toggleFile} textColor="black" />
      </div>
  );
}

export default FolderContainer;