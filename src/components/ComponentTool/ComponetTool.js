import React, { useEffect, useState } from 'react';
import './ComponetTool.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Collapse from '@mui/material/Collapse';
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Sidebar from '../../modules/dashboard/drag-drop/components/sidebar/sidebar';
import axios from '../../modules/services/axios';
import { TiPin } from "react-icons/ti";
import { RiUnpinFill } from "react-icons/ri";

function ComponentTool({ textColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [components, setComponents] = useState([]);
  const [fix, setFix] = useState(true);
  const [isPinned, setIsPinned] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios.getWithCallback('step-type/', (data) => {
      setApiData(data);
      const groupedData = groupDataBy(data, 'group');
      const newComponents = Object.keys(groupedData).map((group) => ({
        name: group,
        isCollapseOpen: false,
        data: groupedData[group],
      }));
      setComponents(newComponents);
  });
  }, []);

  const handleCollapseToggle = (index) => {
    setComponents((prevComponents) =>
      prevComponents.map((component, i) =>
        i === index ? { ...component, isCollapseOpen: !component.isCollapseOpen } : component
      )
    );
  };

  const handleSidebarHover = () => {
    setIsOpen(true);
    if (fix) {
      setFix(true)
    } else {
      setFix(false)
    }
  };

  const handleSidebarLeave = (e) => {
    if (!fix) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className={`component-tool ${isOpen ? 'open' : ''} right-sidebar`}
      onMouseEnter={handleSidebarHover}
      onMouseLeave={handleSidebarLeave}
    >
      <div className='logo_details' style={{ textColor }}>
        <div className='logo_name me-2'>Component Tool</div>
        {isOpen && (isPinned ? (
          <RiUnpinFill size={22} className="pushPinIcon" onClick={() => { setIsPinned(!isPinned); setFix(!fix); }} />
        ) : (
          <TiPin size={22} className="pushPinIcon" onClick={() => { setIsPinned(!isPinned); setFix(!fix); }} />
        ))}
        <DensityMediumIcon
          className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`}
          id='btn'
          onClick={toggleSidebar}
        ></DensityMediumIcon>
      </div>
      <ul className='nav-list'>
        {components.map((component, index) => (
          <div key={index} className='component' draggable>
            <li>
              <div>
                <div href='#' className='comIcon'>
                  {components.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='medium' />}
                  <span className='link_name' style={{ marginLeft: '5px' }}>
                    <div
                      variant='contained'
                      className='comp'
                      onClick={() => handleCollapseToggle(index)}
                    >
                      {component.name} {component.isCollapseOpen ? <KeyboardArrowUpIcon fontSize='small' /> : <KeyboardArrowDownIcon fontSize='small' />}
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
