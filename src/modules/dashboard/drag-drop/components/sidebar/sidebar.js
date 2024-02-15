import React from 'react';

const onDragStart = (event, nodeType, img, name, id) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  // event.dataTransfer.setData("content", content);
  event.dataTransfer.setData("img", img);
  event.dataTransfer.setData("name", name);
  event.dataTransfer.setData("id", id);
  event.dataTransfer.effectAllowed = "move";
};

const Sidebar = ({ apiData }) => {
 
  return (
    <div className="">
      <ul>
        {apiData.map(item => (
          <div style={{ marginLeft: '-25px', display: 'flex' }} className="dndnode input m-10" onDragStart={(event) => onDragStart(event, "node", `/assets/images/${item.img}`, item.name, item.id)} draggable key={item.id}>
            <div style={{ marginTop: "-2px", padding: "7px" }}>
              <img src={`/assets/images/${item.img}`} style={{ width: '20px', height: '20px' }} alt='node' /></div>
            <li>{item.name}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;