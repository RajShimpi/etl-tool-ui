import React, { useEffect, useState, useRef } from 'react';
import './project.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import RecursiveFolder from './recursive-folders';
import axios from '../../modules/services/axios';
import ContextMenu from '../ContextMenu';
import Modal from '../../modules/components/modal-popup';
import { AddUpdateDeleteFileAndFolder } from '../PopupComponent';
import FolderIcon from '@mui/icons-material/Folder';
import { TiPin } from "react-icons/ti";
import { RiUnpinFill } from "react-icons/ri";
import { useData } from '../JobDataContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function ProjectStructure({ textColor, onFileClickCallback }) {

  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [type, setType] = useState("AddFolder");
  const [showNested, setShowNested] = useState({});
  const [isShow, setShow] = useState({});
  const [fix, setFix] = useState(true);
  const { projectID } = useData([])
  const containerRef = useRef(null);
  const { setJobDataId } = useData();

  const handleDocumentClick = (event) => {
    event.stopPropagation();
    if (containerRef.current && !containerRef.current.contains(event.target) && !event.target.closest('.contextMenu') &&
      !event.target.closest('.modal')) {
      closeContextMenu(event);
    }
  };

  useEffect(() => {
    getProjects();
    const close = (e) => {
      if (e.keyCode === 27) {
        closeContextMenu(e);
      }
    };
    window.addEventListener('keydown', close);
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('keydown', close);
    };
  }, [projectID]);

  const getProjects = () => {
    setProjects([]);
    if (projectID) {
      axios.getWithCallback(`projects/${projectID}`, (dt) => {
        // data.map((dt, inx) => {
        let url = 'project-files/get-folder-hierarchy?projectId=' + dt.id;
        axios.getWithCallback(url, (subdata) => {
          var treeData = treefy(subdata);
          dt.treeData = treeData;
          dt.isRightClick = false;
          dt.item = { file_name: dt.project_name, parent: null, parent_id: null, id: 0, project_id: dt.id }
          // setData((prevData) => [...prevData, { prjId : dt.id, heirarchy: treeData}]);
          setProjects((prevData) => [...prevData, dt])
        });
        // });
        // setProjects(data);
      });
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleNested = (e, name) => {
    e.stopPropagation();
    if (!e.target.closest('.contextMenu') && !e.target.closest('.modal'))
      setShowNested({ ...showNested, [name]: !showNested[name] });
  };

  const closeContextMenu = (e, item) => {
    e.stopPropagation();
    if (item) {
      onRightCallback(item, true);
    }
    setContextMenuPosition(null);
  };

  const treefy = (list) => {
    const map = list.reduce((m, li, i) => {
      m[li.id] = i;
      li.children = [];
      li.isRightClick = false;
      return m;
    }, {});
    return list.reduce((root, li) => {
      const arr = li.parent_id ? list[map[li.parent_id]].children : root;
      arr.push(li);
      return root;
    }, []);
  }

  const callback = (item, type) => {
    // e.stopPropagation();
    setShow({ ...isShow, [item.file_name]: !isShow[item.file_name] });
    setType(type);
  }

  // const toggleFile = (projectIndex, file) => {
  //   const updatedProject = [...project];
  //   updatedProject[projectIndex].openFiles[file] = !updatedProject[projectIndex].openFiles[file];
  //   setProject(updatedProject);
  // };

  // const getHeirarchy = (projectId) => {
  //     // var filterDt = data.find(x => x.prjId === projectId);
  //     // return filterDt.heirarchy;
  // }

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenuPosition({ top: event.clientY, left: event.clientX });
    // setOpenContextMenuForItemId(item.id);
    // setContextMenuOpen({ [item.file_name]: !isContextMenuOpen[item.file_name] });
    // nestedCallback(item);
    onRightCallback(item, true, true);
    setFix(false)
  };

  const onRightCallback = (item, isReset, isHeaderClick) => {
    projects.forEach((prj) => {

      if (isHeaderClick && prj.id === item.project_id) {
        prj.isRightClick = true;
      } else {
        prj.isRightClick = false;
      }
      let procesDt = processData(prj.treeData, item, isReset);
      prj["treeData"] = procesDt;
    });
    setProjects((prevData) => ([...prevData]));
  }

  const processData = (data, item, isReset) => {
    data.forEach((x, index) => {
      if (x.id === item.id && !isReset) {
        x.isRightClick = true;
        if (x.children?.length) {
          processData(x.children, item);
        }
      } else {
        x.isRightClick = false;
        if (x.children?.length) {
          processData(x.children, item, isReset);
        }
      }

    });
    return data;
  }

  const handleFileClick = (file_id) => {

    onFileClickCallback(file_id)
  };
  const [isPinned, setIsPinned] = useState(true);

  const handleSidebarHover = () => {
    setIsOpen(true);
    if (fix) {
      setFix(true)
    } else {
      setFix(false)
    }
  };

  const handleSidebarLeave = (e) => {
    if (!fix) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const onhandelFileId = () => {
    setJobDataId();
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`} onMouseEnter={handleSidebarHover} onMouseLeave={handleSidebarLeave}>
        <div className='logo_details' style={{ textColor }}>
          {isOpen && (isPinned ? (
            <abbr title='Pin' style={{ cursor: 'pointer' }}>
              <RiUnpinFill size={22} className="pushPinIcon" onClick={() => { setIsPinned(!isPinned); setFix(!fix); }} />
            </abbr>
          ) : (
            <abbr title='UnPin' style={{ cursor: 'pointer' }}>
              <TiPin size={22} className="pushPinIcon" onClick={() => { setIsPinned(!isPinned); setFix(!fix); }} />
            </abbr>
          ))}
          <div className='logo_name ms-2'>Project Structure</div>
          <DensityMediumIcon className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`} id='btn' onClick={() => { toggleSidebar(); setIsPinned(!isPinned); setFix(!fix); }} />
        </div>
        <ul className='nav-list' style={{ textColor }}>
          {projects.map((project, index) => (
            <div key={index} ref={containerRef} onClick={(e) => toggleNested(e, project.project_name)} onContextMenu={(e) => handleContextMenu(e, project.item)}>
              <li>
                <div className='proicon d-flex'  onClick={onhandelFileId}>
                  <div className='arrow_Icons'>
                  {showNested[project.project_name] ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</div>
                  <FolderIcon fontSize='medium' style={{color:'rgb(255 190 0)'}} />
                  <div className='link_name' style={{ marginLeft: '5px', fontWeight:"600" }}>
                    {project.project_name}
                  </div>
                </div>
                {contextMenuPosition && project.isRightClick && (
                  <div style={{ display: !project.isRightClick && "none" }} >
                    <ContextMenu
                      onClose={(e) => closeContextMenu(e, project.item)}
                      project_id={project.id}
                      parent_id={null}
                      item={project.item}
                      position={contextMenuPosition}
                      callback={callback}
                      hideDeleteUpdate={true}
                    />
                  </div>
                )}
                {
                  <Modal modalTitle={type} handleClose={() => { setShow({}) }} show={!!isShow[project.project_name]} maxWidth={type === "Add Propertie" ? "60%" : "35%"}>
                    <AddUpdateDeleteFileAndFolder title={type} item={project.item} type={type} onClose={(e, isRefreshNeeded) => { closeContextMenu(e); setShow({}); if (isRefreshNeeded) getProjects(); }} />
                  </Modal>
                }
                <div style={{ display: !showNested[project.project_name] && "none" }}>
                  <RecursiveFolder items={project.treeData} onRightCallback={onRightCallback} refreshData={getProjects} onFileClickCallback={handleFileClick} isOpen={isOpen} setIsOpen={setIsOpen} />
                  {/* <FolderDropdown
                      project={project}
                      projectId={project.id}
                      // parentId={null}
                      onToggleFolder={() => toggleProject(index)}
                      onToggleFile={(file) => toggleFile(index, file)}
                    /> */}
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectStructure;