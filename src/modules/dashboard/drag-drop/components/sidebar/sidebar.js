import React from 'react';

const onDragStart = (event, nodeType, content, img) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.setData("content", content);
  event.dataTransfer.setData("img", img);
  event.dataTransfer.effectAllowed = "move";
};

const Sidebar = ({ apiData }) => {
  return (
    <div className="">
      <ul>
        {apiData.map(item => (
          <div
            style={{ margin: '5px' }}
            className="dndnode input m-10"
            onDragStart={(event) =>
              onDragStart(event, "node", "Click to Edit message", require("../../../../../assets/Images/Files-PNG-Clipart.png"))
            }
            draggable
            key={item.id}
          >
            <span style={{ fontSize: "20px" }}>{item.symbol}</span>
            <li>{item.name}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
