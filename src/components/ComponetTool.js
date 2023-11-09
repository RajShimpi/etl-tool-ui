import React, { useState } from 'react';
import './ComponetTool.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ComponetTool() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const [components, setComponents] = useState([
        { name: "Component 1", isCollapseOpen: false },
        { name: "Component 2", isCollapseOpen: false },
        { name: "Component 3", isCollapseOpen: false },
        { name: "Component 4", isCollapseOpen: false },
        { name: "Component 5", isCollapseOpen: false }
        // ... Add more components
    ]);

    const handleDragStart = (event, item) => {
        event.dataTransfer.setData('text/plain', item);
    };

    const handleCollapseToggle = (index) => {
        const updatedComponents = [...components];
        updatedComponents[index].isCollapseOpen = !updatedComponents[index].isCollapseOpen;
        setComponents(updatedComponents);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="logo_details">
                <div className="logo_name">Component Tool</div>
                <DensityMediumIcon className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`} id="btn" style={{ color: "white" }} onClick={toggleSidebar}></DensityMediumIcon>
            </div>
            <ul className="nav-list">
                {components.map((component, index) => (
                    <div
                        key={index}
                        className='component'
                        draggable
                        style={{ padding: '1px', margin: "2px" }}
                        onDragStart={(e) => handleDragStart(e, component.name)}>
                        <li>
                            <div className="comIcon">
                                <a href="#">
                                <FolderOpenIcon className="bx bx-grid-alt componetIcon" style={{marginLeft: '100px'}} ></FolderOpenIcon>
                                    <span className="link_name" style={{ marginLeft: '5px' }}><div variant="contained" onClick={() => handleCollapseToggle(index)}>
                                        Componets {component.isCollapseOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                    </div></span>
                                </a>
                            </div>
                            <Collapse in={component.isCollapseOpen}>
                                <div >
                                    <h3 >Add</h3>                   {/* Add more content here */}
                                    <h3 >Edit</h3>                   {/* Add more content here */}
                                    <h3 >Delete</h3>
                                    <h3 >Kill</h3>
                                    <h3 >Save</h3>
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
