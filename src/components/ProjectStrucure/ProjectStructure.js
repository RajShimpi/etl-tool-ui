import React, { useEffect, useState } from 'react';
import './project.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderDropdown from './ProjectFolder';
import RecursiveFolder from './recursive-folders';
import axios from '../../modules/services/axios';

function ProjectStructure({ textColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.getWithCallback('projects/', (data) =>  {       
      data.forEach(dt => {
      let url = 'project-files/get-folder-hierarchy?projectId=' + dt.id;
        axios.getWithCallback(url, (subdata) => {
          var treeData = treefy(subdata);
          setData((prevData) => [...prevData, treeData]);
          
        });
      });
      setProject(data);
    });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data])

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
                  <FolderOpenIcon className='bx bx-grid-alt' />
                  <span className='link_name' style={{ marginLeft: '5px' }}>
                    {project.project_name}
                  </span>
                </div>
                {project.isOpen && (
                  <div className={`${isOpen ? 'open' : ''}`}>
                    <RecursiveFolder items={data[index]} />
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
