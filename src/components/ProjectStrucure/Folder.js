// import React, { useEffect, useState, useRef } from 'react';
// import FolderOpenIcon from '@mui/icons-material/FolderOpen';
// import FolderIcon from '@mui/icons-material/Folder';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import './project.css';
// import ContextMenu from '../ContextMenu';
// import axios from '../../modules/services/axios';

// const FolderDropdown = ({
//   files,
//   onToggleFiles,
//   onToggleFolder,
//   onOpenFolder,
//   onCloseFolder,  
//   textColor,
//   projectId,
//   parentId,
//   id,
// }) => {
//   const [contextMenu, setContextMenu] = useState(false);
//   const [subFiles, setSubFiles] = useState(files);  
//   const [isOpen, setIsOpen] = useState(false);
//   const folderRef = useRef(null);


//   useEffect(() => {
//     setSubFiles(files)
//   }, [files]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (folderRef.current && !folderRef.current.contains(event.target)) {
//         setContextMenu(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   const handleFileToggle = () => {
//     if (subFiles.type === 'Folder') {
//       onToggleFolder(subFiles);
//       if (subFiles.isOpen) {
//         onCloseFolder(subFiles);
//       } else {
//         handleOpenFolder(subFiles);
//       }
//     }
//   };

//   const handleContextMenu = (event) => {
//     event.preventDefault();
//     setContextMenu(true);
//   };

//   const handleOpenFolder = (folder) => {
//     console.log('Opened Folder:', folder.file_name);
//     axios.getWithCallback('project-files/get-folder-hierarchy?projectId=' + folder.project_id + '&parentId=' + folder.id, (data) => {
//       setSubFiles(data);
//     });
//     setIsOpen(true);
//   };

//   return (
//     <div ref={folderRef} style={{ listStyleType: 'none', cursor: 'pointer', marginLeft: '20px' }}>
//       {subFiles.parentId !== null && (
//         <div
//           className={` ${subFiles.isOpen ? 'open' : ''}`}
//           style={{ textColor }}
//           onClick={handleFileToggle}
//           onContextMenu={handleContextMenu}
//         >
//           {subFiles.type === 'Folder' ? (
//             subFiles.isOpen ? (
//               <FolderOpenIcon fontSize='small' />
//             ) : (
//               <FolderIcon fontSize='small' />
//             )
//           ) : (
//             <InsertDriveFileIcon fontSize='small' />
//           )}{' '}
//           {subFiles.file_name}
//           {contextMenu && (
//             <ContextMenu
//               projectId={projectId}
//               parentId={parentId}
//               id={id}
//               textColor={textColor}
//               onClose={() => setContextMenu(false)}
//             />
//           )}
//           {subFiles.isOpen && subFiles.type === 'Folder' && (
//             <div style={{ marginLeft: '40px', cursor: 'pointer' }}>
//               {subFiles.map((subItem, index) => (
//                 <FolderDropdown
//                   key={index}
//                   files={subItem}
//                   onToggleFiles={onToggleFiles}
//                   onToggleFolder={onToggleFolder}
//                   onOpenFolder={() => handleOpenFolder(subItem)}
//                   onCloseFolder={onCloseFolder}
//                   textColor={textColor}
//                   projectId={projectId}
//                   parentId={parentId}
//                   id={id}
//                 />
//                 // subItem.isOpen && subItem.type === 'Folder' && <Folders key={index} parentId={subItem.id} projectId={projectId} />
//               ))}
//             </div>
//           )}
//           {/* {files.type === 'File' && <InsertDriveFileIcon fontSize='small' />} */}
//         </div>
//       )}
//     </div>
//   );
// };

// Import necessary dependencies and components
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import FolderDropdown from './FolderDropdown'; // Make sure to replace with the correct path



// function Folders({ parentId, projectId, textColor, id }) {
//   const [files, setFiles] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     axios.getWithCallback('project-files/get-folder-hierarchy?projectId=' + projectId + '&parentId=' + parentId, (data) => {
//       setFiles(data);
//     });
//   }, [parentId, projectId]);

//   const toggleFiles = (index) => {
//     const updatedFiles = [...files];
//     updatedFiles[index].isOpen = !updatedFiles[index].isOpen;
//     setFiles(updatedFiles);
//   };

//   const handleOpenFolder = (folder) => {
//     console.log('Opened Folder:', folder.file_name);
//     // axios.getWithCallback('project-files/get-folder-hierarchy?projectId=' + folder.project_id + '&parentId=' + folder.id, (data) => {
//     //   setFiles(data);
//     // });
//     setIsOpen(true);
//   };

//   const handleCloseFolder = (folder) => {
//     console.log('Closed Folder:', folder.file_name);
//     setIsOpen(!isOpen);
//   };

//   const toggleFolder = (clickedFolder) => {
//     setFiles((prevFolder) =>
//       prevFolder.map((folder) =>
//         folder === clickedFolder ? { ...folder, isOpen: !folder.isOpen } : folder
//       )
//     );
//   };

//   useEffect(() => {
//     console.log(files);
//   }, [files])

//   return (
//     <div>
//       {files.map((file, index) =>
//       <div className={`${file.isOpen ? 'open' : ''}`}>
        
//           {file && file.parent_id !== null ? (
//             <FolderDropdown
//               key={index}
//               files={file}
//               onToggleFiles={() => toggleFiles(index)}
//               onToggleFolder={() => toggleFolder(file)}
//               onOpenFolder={handleOpenFolder}
//               onCloseFolder={handleCloseFolder}
//               textColor={textColor}
//             />
//           ) : null}
        
//       </div>)}
//     </div>
//   );
// }

// export default Folders;
