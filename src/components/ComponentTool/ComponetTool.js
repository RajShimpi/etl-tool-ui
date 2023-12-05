// ComponetTool.js
import React, { useState } from 'react';
import './ComponetTool.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Sidebar from '../../modules/dashboard/drag-drop/components/sidebar/sidebar';

function ComponetTool({ textColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [components, setComponents] = useState([
    { name: "Input/Output", isCollapseOpen: false },
    { name: "Process", isCollapseOpen: false },
    { name: "Control", isCollapseOpen: false },
    // { name: "Component 4", isCollapseOpen: false },
    // { name: "Component 5", isCollapseOpen: false }, // Add more components
  ]);

  const handleCollapseToggle = (index) => {
    const updatedComponents = [...components];
    updatedComponents[index].isCollapseOpen = !updatedComponents[index].isCollapseOpen;
    setComponents(updatedComponents);
  };

  return (
    <div className={`componet-tool ${isOpen ? 'open' : ''} right-sidebar`}>
      <div className="logo_details" style={{ textColor }}>
        <div className="logo_name">Component Tool</div>
        <DensityMediumIcon
          className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`}
          id="btn"
          onClick={toggleSidebar}
        ></DensityMediumIcon>
      </div>
      <ul className="nav-list">
        {components.map((component, index) => (
          <div key={index} className='component' draggable>
            <li>
              <div>
                <div href="#" className="comIcon">
                  <FolderOpenIcon className="bx bx-grid-alt" />
                  <span className="link_name" style={{ marginLeft: '5px' }}>
                    <div
                      variant="contained"
                      className='comp'
                      onClick={() => handleCollapseToggle(index)}
                    >
                      {component.name} {component.isCollapseOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      
                    </div>
                  </span>
                </div>
              </div>
              <Collapse in={component.isCollapseOpen}>
                <div className='tools'>
                  <Sidebar />
                </div>
              </Collapse>
            </li>
            
            
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ComponetTool;
