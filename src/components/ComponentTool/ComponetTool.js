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
  const [components, setComponents] = useState([]);

  useEffect(() => {
        axios.getWithCallback('step-type/', (data) => {setApiData(data);
            const groupedData = groupDataBy(data, 'group');
            const newComponents = Object.keys(groupedData).map((group) => ({
                name: group,
                isCollapseOpen: false,
                data: groupedData[group],
            }));
            setComponents(newComponents);
            data.forEach(item => {
              console.log("ID:", item.id, "Name:", item.name);
            });

        });
}, []);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCollapseToggle = (index) => {
    setComponents((prevComponents) =>
      prevComponents.map((component, i) =>
        i === index ? { ...component, isCollapseOpen: !component.isCollapseOpen } : component
      )
    );
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
                  <Sidebar apiData={component.data} />
                </div>
              </Collapse>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

function groupDataBy(data, property) {
  return data.reduce((acc, item) => {
    const key = item[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

export default ComponentTool;
