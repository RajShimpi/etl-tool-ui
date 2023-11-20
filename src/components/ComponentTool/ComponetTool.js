import React, { useState } from 'react';
import './ComponetTool.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ComponetTool({textColor}) {
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
        <div className={`componet-tool ${isOpen ? 'open' : ''} right-sidebar`}>
            <div className="logo_details" style={{textColor}}>
                <div className="logo_name">Component Tool</div>
                <DensityMediumIcon className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`} id="btn" onClick={toggleSidebar}></DensityMediumIcon>
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
                            <div  >
                                <div href="#" className="comIcon" style={{ display: "flex", border: "none" }}>
                                    <FolderOpenIcon className="bx bx-grid-alt" />
                                    <span className="link_name" style={{ marginLeft: '5px' }}><div variant="contained" className='comp' onClick={() => handleCollapseToggle(index)}>
                                        Componets {component.isCollapseOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </div></span>
                                </div>
                            </div>
                            <Collapse in={component.isCollapseOpen}>
                                <div className='openf1' >
                                    <div className='tool' >Add</div>
                                    <div className='tool' >Edit</div>
                                    <div className='tool' >Delete</div>
                                    <div className='tool' >Kill</div>
                                    <div className='tool' >Save</div>
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