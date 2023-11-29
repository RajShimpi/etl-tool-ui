import React from 'react';
import './MainComponete.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ContextMenu = ({ onToggleFolder, popType }) => {
    const handleContextMenuClick = (event) => {
        event.preventDefault();
    };   

    return (
        <div className={`contextMenu ${popType === 'right' ? 'right' : ''}`} onContextMenu={handleContextMenuClick}>
            <div className="menu-item" onClick={onToggleFolder}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <AddIcon style={{ fontSize: 'medium', marginRight: '5px', marginTop: '3px' }} />
                    Add
                </div>
            </div>
            <div className="menu-item" onClick={onToggleFolder}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <EditIcon style={{ fontSize: 'medium', marginRight: '5px', marginTop: '3px' }} />
                    Edit
                </div>
            </div>
            <div className="menu-item" onClick={onToggleFolder}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <DeleteIcon style={{ fontSize: 'medium', marginRight: '5px', marginTop: '3px' }} />
                    Delete
                </div>
            </div>
        </div>
    );
};

export default ContextMenu;
