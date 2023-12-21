import React, { useEffect, useState } from 'react';
import './project.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderDropdown from './ProjectFolder';
import RecursiveFolder from './recursive-folders';
import axios from '../../modules/services/axios';
import FolderContainer from './ProjectFolder';

function ProjectStructure({ textColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    axios.getWithCallback('projects/', (data) =>  {       
      data.forEach((dt, inx) => {
      let url = 'project-files/get-folder-hierarchy?projectId=' + dt.id;
        axios.getWithCallback(url, (subdata) => {
          var treeData = treefy(subdata);
          setData((prevData) => [...prevData, { prjId : dt.id, heirarchy: treeData}]);
          
        });
      });
      setProject(data);
    });
  };

  const refreshData = () => {
    getProjects();
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleProject = (index) => {
    const updatedProject = [...project];
    updatedProject[index].isOpen = !updatedProject[index].isOpen;
    setProject(updatedProject);
    
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

  const toggleFile = (projectIndex, file) => {
    const updatedProject = [...project];
    updatedProject[projectIndex].openFiles[file] = !updatedProject[projectIndex].openFiles[file];
    setProject(updatedProject);
  };

  const getHeirarchy = (projectId) => {
      var filterDt = data.find(x => x.prjId === projectId);
      return filterDt.heirarchy;
  }

  const onRightCallback = (item) =>{
      let dt = data.find(x => x.prjId === item.project_id);
      let dtIndex = data.findIndex(x => x.prjId === item.project_id);
      let procesDt = processData(dt.heirarchy, item);
      data[dtIndex].heirarchy = procesDt;
      setData((prevData) => [...prevData]);
    
  }

  const processData = (data, item) => {
      data.forEach((x, index, arr) => {
         if(x.id === item.id) {
            x.isRightClick = true;
         } else {
            x.isRightClick = false;
            if(x.children?.length) {
              processData(arr, item);
           }
         }
         
      });
      return data;
  } 

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className='logo_details' style={{ textColor }}>
          <div className='logo_name'>Project Structure</div>
          <DensityMediumIcon
            className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`}
            id='btn'
            onClick={toggleSidebar}
          />
        </div>
        <ul className='nav-list' style={{ textColor }}>
          {project.map((project, index) => (
            <div key={index}>
              <li>
                <div className='proicon' onClick={() => toggleProject(index)}>
                  {project.isOpen ? <FolderOpenIcon fontSize='medium' /> : <FolderIcon fontSize='medium' />}
                  <span className='link_name' style={{ marginLeft: '5px' }}>
                    {project.project_name}
                  </span>
                </div>
                {project.isOpen && (
                  <div className={`${isOpen ? 'open' : ''}`}>
                    <RecursiveFolder items={getHeirarchy(project.id)} refreshData={refreshData} />
                    {/* <FolderDropdown
                      project={project}
                      projectId={project.id}
                      // parentId={null}
                      onToggleFolder={() => toggleProject(index)}
                      onToggleFile={(file) => toggleFile(index, file)}
                    /> */}
                  </div>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectStructure;
