import React, { useEffect, useState, useRef } from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ContextMenu from "../ContextMenu";
import Modal from "../../modules/components/modal-popup";
import { AddUpdateDeleteFileAndFolder } from "../PopupComponent";
import axios from "../../modules/services/axios";
import { useJobData } from "../JobDataContext";
import "./project.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const RecursiveFolder = ({ items, onRightCallback, refreshData }) => {
  const [showNested, setShowNested] = useState({});
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [isContextMenuOpen, setContextMenuOpen] = useState({});
  const [isShow, setShow] = useState({});
  const [type, setType] = useState("AddFolder");
  const { setJobDataId,setJobFolder } = useJobData();
  const containerRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(false);

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenuPosition({ top: event.clientY, left: event.clientX });
    onRightCallback(item);
  };

  const closeContextMenu = (e, item) => {
    e.stopPropagation();
    if (item) {
      onRightCallback(item, true);
    } else {
      setContextMenuPosition(null);
      setContextMenuOpen({});
    }
  };

  const handleDocumentClick = (event) => {
    event.stopPropagation();
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) &&
      !event.target.closest(".contextMenu") &&
      !event.target.closest(".modal")
    ) {
      closeContextMenu(event);
    }
  };

  const toggleNested = (e, name) => {
    e.stopPropagation();
    if (!e.target.closest(".contextMenu") && !e.target.closest(".modal"))
      setShowNested({ ...showNested, [name]: !showNested[name] });
  };

  const handleMouseEnter = (name) => {
    if (clickedItem !== name) {
      setHoveredItem(name);
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClick = (name) => {
    setClickedItem(name);
  };

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        closeContextMenu(e);
      }
    };
    window.addEventListener("keydown", close);
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("keydown", close);
    };
  }, []);

  const callback = (item, type) => {
    setShow({ ...isShow, [item.file_name]: !isShow[item.file_name] });
    setType(type);
  };

  const onhandelFileId = (item) => {
    if(item.type=="File"){
    axios.getWithCallback(`job/${item.id}/file`, (data) => {
      setJobDataId(data,item);
    });}else{
      setJobDataId();
    }
  };

  return (
    <>
      {!!items.length && (
        <>
          {items.map((subItem, index) => (
            <div
              className={`folderstyle`}
              ref={containerRef}
              key={subItem.file_name + "rootDiv" + index}
              // onMouseEnter={() => handleMouseEnter(subItem.file_name)}
              // onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(subItem.file_name)}
            >
              <div
                key={subItem.file_name + "contectDiv" + index}
                className={`open`}
                onClick={(e) => toggleNested(e, subItem.file_name)}
                onContextMenu={(e) => handleContextMenu(e, subItem)}
              >
                {subItem.type === "File" && (
                  <div
                  // className={`file_name ${
                  //   hoveredItem === subItem.file_name ? "hovered" : ""
                  // } ${clickedItem === subItem.file_name ? "clicked" : ""}`}
                  // onMouseEnter={() => handleMouseEnter(subItem.file_name)}
                    ref={containerRef}
                    key={subItem.file_name + "rootDiv" + index}
                    onClick={() => onhandelFileId(subItem)}
                    style={{marginLeft:"25px"}}
                    
                  >
                    <InsertDriveFileIcon
                      key={subItem.file_name + "fileIcon" + index}
                      fontSize="small"
                      style={{marginRight:"5px", color:"rgb(99 102 120)"}}
                    />
                    <span style={{fontWeight: "600"}}>{subItem.file_name}</span>
                  </div>
                )}

                {subItem.type === "Folder" && subItem.children && (
                  <>
                    {contextMenuPosition && subItem.isRightClick && (
                      <div style={{ display: !subItem.isRightClick && "none"}}>
                        <ContextMenu
                          onClose={(e) => closeContextMenu(e, subItem)}
                          project_id={subItem.project_id}
                          parent_id={subItem.parent_id}
                          id={subItem.id}
                          item={subItem}
                          position={contextMenuPosition}
                          callback={callback}
                        />
                      </div>
                    )}
                    {
                      <Modal
                        modalTitle={type}
                        handleClose={() => {
                          setShow({});
                        }}
                        show={!!isShow[subItem.file_name]}
                        maxWidth="35%"
                      >
                        <AddUpdateDeleteFileAndFolder
                          title={type}
                          item={subItem}
                          type={type}
                          onClose={(e, isRefreshNeeded) => {
                            closeContextMenu(e);
                            setShow({});
                            if (isRefreshNeeded) refreshData();
                          }}
                        />
                      </Modal>
                    }
                    <div
                      style={{ height: "25px", display:"flex" }}
                      onClick={() => onhandelFileId(subItem)}
                      // className={`file_name ${
                      //   hoveredItem === subItem.file_name ? "hovered" : ""
                      // } ${clickedItem === subItem.file_name ? "clicked" : ""}`}
                      // onMouseEnter={() => handleMouseEnter(subItem.file_name)}
                      
                    >
                      <div className="arrow_Icons">
                      {showNested[subItem.file_name] ? <KeyboardArrowDownIcon  /> : <KeyboardArrowRightIcon />}</div>
                      {/* {showNested[subItem.file_name] ? (
                        <FolderOpenIcon
                          key={subItem.file_name + "openIcon" + index}
                          fontSize="small"
                        />
                      ) : ( */}
                        <FolderIcon
                          key={subItem.file_name + "closeIcon" + index}
                          fontSize="small"
                          style={{marginRight:"5px", marginTop:"4px",color:"rgb(255 190 0)"}}

                        />
                      {/* )} */}
                      <span style={{fontWeight: "600", marginTop:"3px",}}>{subItem.file_name}</span>
                    </div>
                    <div
                      style={{
                        display: !showNested[subItem.file_name] && "none",
                      }}
                    >
                      {subItem.children && (
                        <RecursiveFolder
                          items={subItem.children}
                          onRightCallback={onRightCallback}
                          refreshData={refreshData}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default RecursiveFolder;
