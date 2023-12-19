import React, { useEffect, useState, useRef } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import axios from '../../modules/services/axios';
import ContextMenu from '../ContextMenu';

function FolderDropdown({
  item,
  textColor,
  project_id,
  id,
  onToggleFolder,
  openContextMenuId,
  onContextMenuOpen,
  onContextMenuClose,
}) {
  const [isOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const closeContextMenu = (event) => {
      if (!containerRef.current) {
        onContextMenuClose();
      }
    };

    document.addEventListener('click', closeContextMenu);

    return () => {
      document.removeEventListener('click', closeContextMenu);
    };
  }, [onContextMenuClose]);

  return (
    <>
      <div className='folderstyle' ref={containerRef}>
        <div
          style={{ textColor }}
          onClick={onToggleFolder}
          onContextMenu={(e) => {
            e.preventDefault();
            onContextMenuOpen(id);
          }}
          className={`${isOpen ? '' : 'open'}  `}
        >
          {item.type === 'Folder' && (
            item.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />
          )}
          {item.type === 'File' && <InsertDriveFileIcon fontSize='small' />}
          {item.file_name}
          {openContextMenuId === id && (
            <ContextMenu onClose={onContextMenuClose} project_id={project_id} id={id} textColor={textColor} />
          )}
        </div>
        {item.isOpen && item.type === 'Folder' && (
          <FolderContainer parentId={item.id} projectId={project_id} textColor={textColor} />
        )}
      </div>
    </>
  );
}

function FolderContainer({ parentId, projectId, textColor }) {
  const [folder, setFolder] = useState([]);
  const [contextMenuOpenItemId, setContextMenuOpenItemId] = useState(null);

  useEffect(() => {
    let url = parentId
      ? `project-files/get-folder-hierarchy?projectId=${projectId}&parentId=${parentId}`
      : `project-files/get-folder-hierarchy?projectId=${projectId}`;
    axios.getWithCallback(url, (data) => {
      setFolder(data);
      console.log(data);
    });
  }, [parentId, projectId]);

  const toggleFolder = (index) => {
    const updatedFolder = [...folder];
    updatedFolder[index].isOpen = !updatedFolder[index].isOpen;
    setFolder(updatedFolder);
  };

  const handleContextMenuOpen = (itemId) => {
    setContextMenuOpenItemId(itemId);
  };

  const handleContextMenuClose = () => {
    setContextMenuOpenItemId(null);
  };

  return (
    <div className="folder-container">
      {folder.map((folderItem, index) => (
        <div className={`${folderItem.isOpen ? 'open' : ''}`} key={index}>
          <FolderDropdown
            item={folderItem}
            project_id={folderItem.project_id}
            parent_id={folderItem.parent_id}
            id={folderItem.id}
            onContextMenuOpen={handleContextMenuOpen}
            onContextMenuClose={handleContextMenuClose}
            openContextMenuId={contextMenuOpenItemId}
            textColor={textColor}
            onToggleFolder={() => toggleFolder(index)}
          />
        </div>
      ))}
    </div>
  );
}

export default FolderContainer;
