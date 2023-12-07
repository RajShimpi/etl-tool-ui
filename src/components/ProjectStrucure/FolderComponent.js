import React from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';

function FolderComponent({ item, onToggleFolder, onRightClick, textColor }) {
  const handleItemToggle = () => {
    if (item.type === 'file') {
    } else {
      onToggleFolder(item);
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    onRightClick(item);
  };

  return (
    <div className="folderstyle" onContextMenu={handleContextMenu}>
      <div className={` ${item.isOpen ? 'open' : ''}`} style={{ textColor }} onClick={handleItemToggle}>
        {item.type === 'Folder' && (
          item.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />
        )}
        {item.type === 'File' && <InsertDriveFileIcon fontSize='small' />}
        {item.file_name}
      </div>
      {item.isOpen && item.items && (
        <div className="insideItemStyle">
          {item.items.map((subItem, index) => (
            <FolderComponent
              key={index}
              item={subItem}
              onToggleFolder={() => onToggleFolder(subItem)}
              onRightClick={onRightClick}
              textColor={textColor}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FolderComponent;
