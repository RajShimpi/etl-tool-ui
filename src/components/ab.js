import React, { useState } from 'react';
import './FolderDropdownMenu.css'; // Import your CSS file for styling

const Folder = ({ name, subfolders }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <button className={`dropdown-toggle ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        {name}
      </button>
      {isOpen && subfolders.length > 0 && (
        <ul className="dropdown-menu">
          {subfolders.map((subfolder) => (
            <Folder key={subfolder.name} name={subfolder.name} subfolders={subfolder.subfolders} />
          ))}
        </ul>
      )}
    </li>
  );
};

const FolderDropdownMenu = () => {
  const folders = [
    {
      name: 'Folder 1',
      subfolders: [
        {
          name: 'Subfolder 1.1',
          subfolders: [],
        },
        {
          name: 'Subfolder 1.2',
          subfolders: [],
        },
      ],
    },
    {
      name: 'Folder 2',
      subfolders: [],
    },
  ];

  return (
    <div className="dropdown">
      <button className="dropdown-toggle">File</button>
      <ul className="dropdown-menu">
        {folders.map((folder) => (
          <Folder key={folder.name} name={folder.name} subfolders={folder.subfolders} />
        ))}
      </ul>
    </div>
  );
};

export default FolderDropdownMenu;
