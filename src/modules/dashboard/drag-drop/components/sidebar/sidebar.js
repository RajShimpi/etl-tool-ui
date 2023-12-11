import React from 'react';

const onDragStart = (event, nodeType, content, img,name) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.setData("content", content);
  event.dataTransfer.setData("img", img);
  event.dataTransfer.setData("name", name);
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
              onDragStart(event, "node", "Click to Edit message", item.symbol,item.name)
            }
            draggable
            key={item.id}
          >
             <img src={item.symbol} alt={item.symbol} style={{ width: '50px', height: '50px' }} />
            {/* <span style={{ fontSize: "20px" }}>{item.symbol}</span> */}
            <li>{item.name}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

