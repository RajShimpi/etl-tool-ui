import React, { useState } from 'react';
import './LeftSidebar.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ top: "150px" }}>
      <div className="logo_details" style={{ textAlign: "center" }}>
        <DensityMediumIcon className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`} id="btn" style={{ color: "white" }} onClick={toggleSidebar}></DensityMediumIcon>
      </div>
      <ul className="nav-list">
        <li>
          <a href="#">
            <FolderOpenIcon className="bx bx-grid-alt "   ></FolderOpenIcon>
            <span className="link_name" style={{ marginLeft: '5px' }} >Project 1</span>
          </a>
          <span className="tooltip">Project 1</span>
        </li>
        <li>
          <a href="#">
            <FolderOpenIcon className="bx bx-grid-alt "   ></FolderOpenIcon>
            <span className="link_name" style={{ marginLeft: '5px' }} >Project 2</span>
          </a>
          <span className="tooltip" style={{ marginLeft: '5px' }} >Project 2</span>
        </li>
        <li>
          <a href="#">
            <FolderOpenIcon className="bx bx-grid-alt "   ></FolderOpenIcon>
            <span class="link_name" style={{ marginLeft: '5px' }}>Project 3</span>
          </a>
          <span class="tooltip">Project </span>
        </li>
        <li>
          <a href="#">
            <FolderOpenIcon className="bx bx-grid-alt "   ></FolderOpenIcon>
            <span class="link_name" style={{ marginLeft: '5px' }}>Project 4</span>
          </a>
          <span class="tooltip">Project 4</span>
        </li>
        <li>
          <a href="#">
            <FolderOpenIcon className="bx bx-grid-alt "   ></FolderOpenIcon>
            <span class="link_name" style={{ marginLeft: '5px' }}>Project 5</span>
          </a>
          <span class="tooltip">Project </span>
        </li>
        <li>
          <a href="#">
            <FolderOpenIcon className="bx bx-grid-alt "  ></FolderOpenIcon>
            <span class="link_name" style={{ marginLeft: '5px' }}>Project 6</span>
          </a>
          <span class="tooltip">Project 6</span>
        </li>
        <li>
          <a href="#">
            <FolderOpenIcon className="bx bx-grid-alt "   ></FolderOpenIcon>
            <span class="link_name" style={{ marginLeft: '5px' }}>Project 7</span>
          </a>
          <span class="tooltip">Project 7</span>
        </li>
      </ul>
    </div>
  );
}

export default LeftSidebar;
