import React, { useState } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import './project.css';

function FolderDropdown({ item, onToggleFile, textColor }) {
    const handleFileToggle = () => {
        onToggleFile(item);
        console.log(item.fileName);
    };

    return (
        <div className="folderStyle" style={{ color: textColor }}>
            {item.type === 'Folder' && (
                <div className={`${item.isOpen ? 'open' : ''}`} onClick={handleFileToggle}>
                    {item.isOpen ? <FolderOpenIcon fontSize="small" /> : <FolderIcon fontSize="small" />}
                    {item.fileName}
                </div>
            )}
            {item.type === 'File' && (
                <div className={`file ${item.isOpen ? 'open' : ''}`} onClick={handleFileToggle}>
                    <InsertDriveFileIcon style={{ fontSize: '20px' }} /> {item.fileName} 
                </div>
            )}
        </div>
    );
}
function Folders({ items, onToggleFile, textColor }) {
    const [stateItems, setItems] = useState(items);

    const toggleFile = (clickedItem) => {
        const updatedItems = stateItems.map((item) =>
            item === clickedItem ? { ...item, isOpen: !item.isOpen } : item
        );
        setItems(updatedItems);
    };

    return (
        <div>
            {stateItems.map((item, index) => (
                <FolderDropdown
                    key={index}
                    item={item}
                    onToggleFile={() => toggleFile(item)}
                    textColor={textColor}
                />
            ))}
        </div>
    );
}

export default Folders;
