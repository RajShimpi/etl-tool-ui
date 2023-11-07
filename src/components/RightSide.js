import React, { useState } from 'react';
import './LeftSidebar.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const elementStyle = {
    color: "white",
    transition: 'background-color 0.3s',
    padding: '10px',
    cursor: 'pointer',
  };

  const [components, setComponents] = useState([
    "Component 1",
    "Component 2",
    "Component 3",
    "Component 4",
    "Component 5",
    "Component 6",
    "Component 7",
    "Component 8",
    "Component 9",
    "Component 10",
  ]);

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData('text/plain', item);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ top: "150px", position: "fixed", textAlign: "right" }}>
      <div className="logo_details" style={{ textAlign: "center" }}>
        <DensityMediumIcon className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`} id="btn" style={{ color: "white" }} onClick={toggleSidebar}></DensityMediumIcon>
      </div>
      <ul className="nav-list">
        {components.map((component, index) => (
          <div
            key={index}
            className='component'
            draggable
            style={{ padding: '1px', margin: "2px" }}
            onDragStart={(e) => handleDragStart(e, component)}>
            <li>
              <a href="#">
                <FolderOpenIcon className="bx bx-grid-alt " style={{ elementStyle }}></FolderOpenIcon>
                <span className="link_name" style={{ marginLeft: '5px' }}>{component}</span>
              </a>
              <span className="tooltip">{component}</span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default LeftSidebar;
