import React, { useEffect, useState, useRef } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './project.css';
import axios from '../../modules/services/axios';

function FolderDropdown({
  item,
  textColor,
  project_id,
  onToggleFolder
}) {

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // const toggleFiles = (index) => {
  //   const updatedFile = [...item];
  //   updatedFile[index].isOpen = !updatedFile[index].isOpen;
  //   setIsOpen(updatedFile);
  // };
  // const toggleFile = () => {
  //   setIsOpen(!isOpen);
  // }
  
  return (
    <>
      <div className='folderstyle' ref={containerRef}>

        <div
          style={{ textColor }}
          onClick={onToggleFolder}
          className={`${isOpen ? '' : 'open'}`}

        >
          {item.type === 'Folder' && (
            item.isOpen ? <FolderOpenIcon fontSize='small' /> : <FolderIcon fontSize='small' />
          )}
          {item.type === 'File' && <InsertDriveFileIcon fontSize='small' />}
          {item.file_name}
        </div>
        {item.isOpen && item.type === 'Folder' && (
          <FolderContainer parentId={item.id} projectId={project_id} />
        )}
      </div>
    </>
  );
}
function FolderContainer({ parentId, projectId, textColor }) {
  const [folder, setFolder] = useState([]);
  const [openContextMenuForItemId, setOpenContextMenuForItemId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    let url = parentId ? 'project-files/get-folder-hierarchy?projectId=' + projectId + '&parentId=' + parentId : 'project-files/get-folder-hierarchy?projectId=' + projectId
    axios.getWithCallback(url, (data) => {

      setFolder(data);
      console.log(data);
    });
  }, [parentId, projectId]);


  const toggleFolder = (index) => {
    const updatedFolder = [...folder];
    updatedFolder[index].isOpen = !updatedFolder[index].isOpen;
    setFolder(updatedFolder);
  };

  const handleContextMenu = (item) => {
    console.log('Right-clicked on:', item);
    console.log('Project ID:', item.project_id);
    console.log('Parent ID:', item.parent_id);
    console.log('Id:', item.id);
    console.log('File Name:', item.file_name);
    setOpenContextMenuForItemId(item.id);
  };

  return (
    <div className="folder-container">

      {folder.map((folderItem, index) => (
        <div className={`${isOpen ? 'open' : ''}`}>
          <FolderDropdown
            key={index}
            item={folderItem}
            project_id={folderItem.project_id}
            parent_id={folderItem.parent_id}
            id={folderItem.id}
            onContextMenu={(item) => handleContextMenu(item)}
            openContextMenuForItemId={openContextMenuForItemId}
            textColor={textColor}
            onToggleFolder={() => toggleFolder(index)}
          // onToggleFolder={ toggleFolder}
          />

        </div>
      ))}

    </div>
  );
}


export default FolderContainer;