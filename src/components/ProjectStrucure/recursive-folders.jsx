import React, { useEffect, useState, useRef } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContextMenu from '../ContextMenu';
import Modal from '../../modules/components/modal-popup';
import Folder from "../../modules/masters/popup/add-folder";

const RecursiveFolder = ({ items, refreshData }) => {
    // const [items, setItems] = useState([]);

    // useEffect(() => {
    //     if(data) {
    //         setItems(data.map(x => { return { ...x, isRightClick: false }}));
    //     }
    // }, [data])

    useEffect(() => {
        console.log(items);
    }, [items])
    
    const [showNested, setShowNested] = useState({});
    const [contextMenuPosition, setContextMenuPosition] = useState(null);
    const [isContextMenuOpen, setContextMenuOpen] = useState({});
    const [isShow, setShow] = useState({});
    // const [openContextMenuForItemId, setOpenContextMenuForItemId] = useState(null);
    const containerRef = useRef(null);


    const handleContextMenu = (event, item) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenuPosition({ top: event.clientY, left: event.clientX });
        // setOpenContextMenuForItemId(item.id);
        setContextMenuOpen({ [item.file_name]: !isContextMenuOpen[item.file_name] });
       
    };

    const closeContextMenu = () => {
        
        setContextMenuPosition(null);
        setContextMenuOpen({});
        
    };

    const handleDocumentClick = (event) => {
        event.stopPropagation();
        if (containerRef.current && !containerRef.current.contains(event.target)) {
        closeContextMenu();
        }
    };
    const toggleNested = (e, name) => {
        e.stopPropagation();
        setShowNested({ ...showNested, [name]: !showNested[name] });
        // closeContextMenu();
      };

      useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
          document.removeEventListener('click', handleDocumentClick);
        };
      }, []);

      const callback = (item) => {
        // e.stopPropagation();
        setShow({ ...isShow, [item.file_name]: !isShow[item.file_name] });
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
                                        {contextMenuPosition && isContextMenuOpen[subItem.file_name] && (
                                            <div style={{ display: !isContextMenuOpen[subItem.file_name] && "none" }}>
                                            <ContextMenu
                                                onClose={closeContextMenu}
                                                project_id={subItem.project_id}
                                                parent_id={subItem.parent_id}
                                                id={subItem.id}
                                                item={subItem}                                              
                                                position={contextMenuPosition}
                                                callback={callback}                                               
                                            />
                                            </div>
                                            )}
                                            {isContextMenuOpen[subItem.file_name] && (
                                                <Modal modalTitle={"Add Folder"} handleClose={() => { setShow({})}}  show={!!isShow[subItem.file_name]} maxWidth="75%">
                                                    <Folder project_id={subItem.project_id} id={subItem.id} onClose={closeContextMenu} />;
                                                </Modal>
                                            )}
                                       {showNested[subItem.file_name] ? <FolderOpenIcon key={subItem.file_name + "openIcon" + index }  fontSize='small' />
                                        : <FolderIcon key={subItem.file_name + "closeIcon" + index } fontSize='small' />}
                                        <>{subItem.file_name}</>
                                        <div style={{ display: !showNested[subItem.file_name] && "none" }}>
                                            {subItem.children && <RecursiveFolder items={subItem.children} refreshData={refreshData} />}
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