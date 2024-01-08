import { identifier } from '@babel/types';
import React from 'react';

const onDragStart = (event, nodeType, img, name,id) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  // event.dataTransfer.setData("content", content);
  event.dataTransfer.setData("img", img);
  event.dataTransfer.setData("name", name);
  event.dataTransfer.setData("id", id);
  event.dataTransfer.effectAllowed = "move";
};

const Sidebar = ({ apiData }) => {

  const stepId = apiData.id
  console.log(stepId,"dtdtd");
  return (
    <div className="">
      <ul>
        {apiData.map(item => (
          
          <div style={{ margin: '5px', display: 'flex' }} className="dndnode input m-10" onDragStart={(event) => onDragStart(event, "node", `/assets/images/${item.img}.png`, item.name ,item.id)} draggable key={item.id}>
            <div style={{ marginTop: "-2px", padding: "7px" }}>
              <img src={`/assets/images/${item.img}.png`} style={{ width: '20px', height: '20px' }} alt='Image' /></div>
            <li>{item.name}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;