// ComponentTool.js
import React, { useEffect, useState } from 'react';
import './ComponetTool.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Sidebar from '../../modules/dashboard/drag-drop/components/sidebar/sidebar';
import axios from '../../modules/services/axios';

function ComponentTool({ textColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiData, setApiData] = useState([]);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [components, setComponents] = useState([
    { name: "Input/Output", isCollapseOpen: false },
    { name: "Process", isCollapseOpen: false },
    { name: "Control", isCollapseOpen: false },
  ]);

  useEffect(() => {
    axios.getWithCallback('step-type/', (data) => {
      setApiData(data);
    });
  }, []);

  const handleCollapseToggle = (index) => {
    const updatedComponents = [...components];
    updatedComponents[index].isCollapseOpen = !updatedComponents[index].isCollapseOpen;
    setComponents(updatedComponents);
  };

  return (
    <div className={`component-tool ${isOpen ? 'open' : ''} right-sidebar`}>
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
                  <Sidebar apiData={apiData} />
                </div>
              </Collapse>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ComponentTool;
