import React, { useEffect, useState, useRef } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContextMenu from '../ContextMenu';
import Modal from '../../modules/components/modal-popup';
import { AddUpdateDeleteFileAndFolder } from "../PopupComponent";
import Folder from "../../modules/masters/popup/add-folder";
import AddFile from "../../modules/masters/popup/add-file";
import Edit from "../../modules/masters/popup/edit-file";
import Delete from "../../modules/masters/popup/delete";

const RecursiveFolder = ({ items, onRightCallback, refreshData }) => {
    // const [items, setItems] = useState([]);

    // useEffect(() => {
    //     if(data) {
    //         setItems(data.map(x => { return { ...x, isRightClick: false }}));
    //     }
    // }, [data])

    useEffect(() => {
        // console.log(items);
    }, [items])
    
    const [showNested, setShowNested] = useState({});
    const [contextMenuPosition, setContextMenuPosition] = useState(null);
    const [isContextMenuOpen, setContextMenuOpen] = useState({});
    const [isShow, setShow] = useState({});
    const [type, setType] = useState("AddFolder");
    // const [openContextMenuForItemId, setOpenContextMenuForItemId] = useState(null);
    const containerRef = useRef(null);


    const handleContextMenu = (event, item) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenuPosition({ top: event.clientY, left: event.clientX });
        // setOpenContextMenuForItemId(item.id);
        // setContextMenuOpen({ [item.file_name]: !isContextMenuOpen[item.file_name] });
        // nestedCallback(item);
        onRightCallback(item);
    };

    const closeContextMenu = (e, item) => {
        e.stopPropagation();
        if(item) {
            onRightCallback(item, true);
        } else {
        setContextMenuPosition(null);
        setContextMenuOpen({});
        }
        
    };

    const handleDocumentClick = (event) => {
        event.stopPropagation();
        if (containerRef.current && !containerRef.current.contains(event.target) && !event.target.closest('.contextMenu') &&
        !event.target.closest('.modal')) {
        closeContextMenu(event);
        }
    };
    const toggleNested = (e, name) => {
        e.stopPropagation();
        if(!e.target.closest('.contextMenu') && !e.target.closest('.modal'))
            setShowNested({ ...showNested, [name]: !showNested[name] });
        
      };

      useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                closeContextMenu(e);
            }
        }
        window.addEventListener('keydown', close) 
        document.addEventListener('click', handleDocumentClick);
        return () => {
          document.removeEventListener('click', handleDocumentClick);
          window.removeEventListener('keydown', close)
        };
      }, []);

    //   const nestCallback = (item) => {
    //     setContextMenuOpen({});
    //   }

        //   useEffect(() => {
        //     const handleClickOutside = (event) => {
        //       if (
        //         !event.target.closest('.contextMenu') &&
        //         !event.target.closest('.modal')
        //       ) {
        //         closeContextMenu();
        //       }
        //     };
        
        //     document.addEventListener('click', handleClickOutside);
        
        //     return () => {
        //       document.removeEventListener('click', handleClickOutside);
        //     };
        //   }, [isShow]);
      
      const callback = (item, type) => {
        // e.stopPropagation();
        setShow({ ...isShow, [item.file_name]: !isShow[item.file_name] });
        setType(type);
    }

    
    return (
        <>
            {!!items.length && (
                <>
                    {items.map((subItem, index) => (
                        <div className='folderstyle' ref={containerRef} key={subItem.file_name + "rootDiv" + index }>
                            <div key= {subItem.file_name + "contectDiv" + index}  className={`open`}
                                    onClick={(e) => toggleNested(e,subItem.file_name)}
                                    onContextMenu={(e) => handleContextMenu(e, subItem)}
                            >
                                
                                {subItem.type === 'File' && 
                                <>
                                    <InsertDriveFileIcon key={subItem.file_name + "fileIcon" + index } fontSize='small' />
                                    <>{subItem.file_name}</>
                                </>
                                }

                                {subItem.type === 'Folder' && subItem.children && (
                                    <>
                                        {contextMenuPosition 
                                        // && isContextMenuOpen[subItem.file_name] 
                                        && subItem.isRightClick
                                        && (
                                            <div style={{ display: !subItem.isRightClick && "none" }}>
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
                                                <Modal modalTitle={type} handleClose={() => { setShow({})}}  show={!!isShow[subItem.file_name]} maxWidth="75%">
                                                   {/* {(() => {    switch (type) {
                                                            case "AddFolder": */}
                                                        <AddUpdateDeleteFileAndFolder title={type} item={subItem} type={type} onClose={(e, isRefreshNeeded) => {closeContextMenu(e); setShow({}); if(isRefreshNeeded) refreshData(); } } />                                                           
                                                            {/* // case "Add":
                                                            //     return <AddUpdateDeleteFileAndFolder item={subItem} type={type} onClose={(e) => closeContextMenu(e)} />                                                            
                                                            // case "Edit":
                                                            //     return <AddUpdateDeleteFileAndFolder item={subItem} type={type} onClose={(e) => closeContextMenu(e)} />                                                            
                                                            // case "Delete":
                                                            //     return <AddUpdateDeleteFileAndFolder item={subItem} type={type} onClose={(e) => closeContextMenu(e)} />                                                            
                                                            // default:
                                                            //     return <AddUpdateDeleteFileAndFolder item={subItem} type={type} onClose={(e) => closeContextMenu(e)} />  }})
                                                            //     ()} */}
                                                    
                                                </Modal>
                                            }
                                       {showNested[subItem.file_name] ? <FolderOpenIcon key={subItem.file_name + "openIcon" + index }  fontSize='small' />
                                        : <FolderIcon key={subItem.file_name + "closeIcon" + index } fontSize='small' />}
                                        <>{subItem.file_name}</>
                                        <div style={{ display: !showNested[subItem.file_name] && "none" }}>
                                            {subItem.children && <RecursiveFolder items={subItem.children}  onRightCallback={onRightCallback} refreshData={refreshData} />}
                                        </div>
                                    </>
                                )} 
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default RecursiveFolder;