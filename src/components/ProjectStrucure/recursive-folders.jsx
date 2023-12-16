import React, { useEffect, useState, useRef } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
const RecursiveFolder = ({ items }) => {
    // const [item, setItem] = useState([]);
    const [showNested, setShowNested] = useState({});

    // useEffect(() => {
    //     if(!!data?.length)
    //     setItem(data);
    //   }
    //   , [data]);
    const toggleNested = (e, name) => {
        e.stopPropagation();
        setShowNested({ ...showNested, [name]: !showNested[name] });
      };

    return (
        <>
            {!!items.length && (
                <>
                    {items.map((subItem, index) => (
                        <div className='folderstyle' key={subItem.file_name + "rootDiv" + index }>
                            <div key= {subItem.file_name + "contectDiv" + index}  className={`open`}
                                    onClick={(e) => toggleNested(e,subItem.file_name)}>
                                
                                {subItem.type === 'File' && 
                                <>
                                    <InsertDriveFileIcon key={subItem.file_name + "fileIcon" + index } fontSize='small' />
                                    <>{subItem.file_name}</>
                                </>
                                }

                                {subItem.type === 'Folder' && subItem.children && (
                                    <>
                                       {showNested[subItem.file_name] ? <FolderOpenIcon key={subItem.file_name + "openIcon" + index }  fontSize='small' />
                                        : <FolderIcon key={subItem.file_name + "closeIcon" + index } fontSize='small' />}
                                        <>{subItem.file_name}</>
                                        <div style={{ display: !showNested[subItem.file_name] && "none" }}>
                                            {subItem.children && <RecursiveFolder items={subItem.children} />}
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