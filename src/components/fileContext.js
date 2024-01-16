// import React, { useEffect, useState, useRef } from "react";
// import FolderOpenIcon from "@mui/icons-material/FolderOpen";
// import FolderIcon from "@mui/icons-material/Folder";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import ContextMenu from "../ContextMenu";
// import Modal from "../../modules/components/modal-popup";
// import { AddUpdateDeleteFileAndFolder } from "../PopupComponent";
// import Folder from "../../modules/masters/popup/add-folder";
// import AddFile from "../../modules/masters/popup/add-file";
// import Edit from "../../modules/masters/popup/edit-file";
// import Delete from "../../modules/masters/popup/delete";
// import axios from "../../modules/services/axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

// const RecursiveFolder = ({ items, onRightCallback, refreshData }) => {
//   const [showNested, setShowNested] = useState({});
//   const [contextMenuPosition, setContextMenuPosition] = useState(null);
//   const [isContextMenuOpen, setContextMenuOpen] = useState({});
//   const [isShow, setShow] = useState({});
//   const [type, setType] = useState("AddFolder");
//   const containerRef = useRef(null);

//   const navigate = useNavigate(); // Use useNavigate directly within the component

//   const handleContextMenu = (event, item) => {
//     event.preventDefault();
//     event.stopPropagation();
//     setContextMenuPosition({ top: event.clientY, left: event.clientX });

//     onRightCallback(item);
//   };

//   const closeContextMenu = (e, item) => {
//     e.stopPropagation();
//     if (item) {
//       onRightCallback(item, true);
//     } else {
//       setContextMenuPosition(null);
//       setContextMenuOpen({});
//     }
//   };

//   const handleDocumentClick = (event) => {
//     event.stopPropagation();
//     if (
//       containerRef.current &&
//       !containerRef.current.contains(event.target) &&
//       !event.target.closest(".contextMenu") &&
//       !event.target.closest(".modal")
//     ) {
//       closeContextMenu(event);
//     }
//   };

//   const toggleNested = (e, name) => {
//     e.stopPropagation();
//     if (!e.target.closest(".contextMenu") && !e.target.closest(".modal"))
//       setShowNested({ ...showNested, [name]: !showNested[name] });
//   };

//   useEffect(() => {
//     const close = (e) => {
//       if (e.keyCode === 27) {
//         closeContextMenu(e);
//       }
//     };
//     window.addEventListener("keydown", close);
//     document.addEventListener("click", handleDocumentClick);
//     return () => {
//       document.removeEventListener("click", handleDocumentClick);
//       window.removeEventListener("keydown", close);
//     };
//   }, []);

//   const callback = (item, type) => {
//     setShow({ ...isShow, [item.file_name]: !isShow[item.file_name] });
//     setType(type);
//   };

//   const onhandelId = (item) => {
//     axios.getWithCallback(`job/${item.id}/file`, (data) => {
//       localStorage.setItem("jobDataId", data.id);
//       console.log("Navigating to OverviewFlow with jobDataId:", data.id);

//       // Use useNavigate to navigate to a different route
//       navigate("/overview-flow");
//     });
//   };

//   return (
//     <>
//       {!!items.length && (
//         <>
//           {items.map((subItem, index) => (
//             <div
//               className="folderstyle"
//               ref={containerRef}
//               key={subItem.file_name + "rootDiv" + index}
//             >
//               <div
//                 key={subItem.file_name + "contectDiv" + index}
//                 className={`open`}
//                 onClick={(e) => toggleNested(e, subItem.file_name)}
//                 onContextMenu={(e) => handleContextMenu(e, subItem)}
//               >
//                 {subItem.type === "File" && (
//                   <div onClick={() => onhandelId(subItem)}>
//                     <InsertDriveFileIcon
//                       key={subItem.file_name + "fileIcon" + index}
//                       fontSize="small"
//                     />
//                     <>{subItem.file_name}</>
//                   </div>
//                 )}

//                 {subItem.type === "Folder" && subItem.children && (
//                   <>
//                     {contextMenuPosition && subItem.isRightClick && (
//                       <div style={{ display: !subItem.isRightClick && "none" }}>
//                         <ContextMenu
//                           onClose={(e) => closeContextMenu(e, subItem)}
//                           project_id={subItem.project_id}
//                           parent_id={subItem.parent_id}
//                           id={subItem.id}
//                           item={subItem}
//                           position={contextMenuPosition}
//                           callback={callback}
//                         />
//                       </div>
//                     )}
//                     {
//                       <Modal
//                         modalTitle={type}
//                         handleClose={() => {
//                           setShow({});
//                         }}
//                         show={!!isShow[subItem.file_name]}
//                         maxWidth="75%"
//                       >
//                         <AddUpdateDeleteFileAndFolder
//                           title={type}
//                           item={subItem}
//                           type={type}
//                           onClose={(e, isRefreshNeeded) => {
//                             closeContextMenu(e);
//                             setShow({});
//                             if (isRefreshNeeded) refreshData();
//                           }}
//                         />
//                       </Modal>
//                     }
//                     {showNested[subItem.file_name] ? (
//                       <FolderOpenIcon
//                         key={subItem.file_name + "openIcon" + index}
//                         fontSize="small"
//                       />
//                     ) : (
//                       <FolderIcon
//                         key={subItem.file_name + "closeIcon" + index}
//                         fontSize="small"
//                       />
//                     )}
//                     <>{subItem.file_name}</>
//                     <div
//                       style={{
//                         display: !showNested[subItem.file_name] && "none",
//                       }}
//                     >
//                       {subItem.children && (
//                         <RecursiveFolder
//                           items={subItem.children}
//                           onRightCallback={onRightCallback}
//                           refreshData={refreshData}
//                         />
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </>
//       )}
//     </>
//   );
// };

// export default RecursiveFolder;
import React, { createContext, useContext, useState } from "react";

const FileIdContext = createContext();


export const FileIdProvider = ({ children }) => {
  const [fileId, setFileId] = useState(null);

  const setFileIdValue = (id) => {
    setFileId(id);
  };

  return (
    <FileIdContext.Provider value={{ fileId, setFileId: setFileIdValue }}>
      {children}
    </FileIdContext.Provider>
  );
};

export const useFileId = () => {
  const context = useContext(FileIdContext);
  if (!context) {
    throw new Error("useFileId must be used within a FileIdProvider");
  }
  return context;
};
// ... (previous code)

// export const FileIdProvider = ({ children }) => {
//   const [fileId, setFileId] = useState(null);

//   const setFileIdValue = (id) => {
//     setFileId(id);
//   };

//   return (
//     <FileIdContext.Provider value={{ fileId, setFileId: setFileIdValue }}>
//       {children}
//     </FileIdContext.Provider>
//   );
// };

// ... (remaining code)
