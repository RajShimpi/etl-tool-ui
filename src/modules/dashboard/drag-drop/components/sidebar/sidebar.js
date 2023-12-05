import React, { useState, useEffect } from 'react';
import axios from 'axios';
const onDragStart = (event, nodeType, content, img) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.setData("content", content);
  event.dataTransfer.setData("img", img);
  event.dataTransfer.effectAllowed = "move";
};


const Sidebar = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/step-type')
      .then(response => {
        setApiData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="">
      <ul>
        {apiData.map(item => (
           <>
           <div
           style={{margin:'5px'}}
           className="dndnode input m-10"
           onDragStart={(event) =>
             onDragStart(event, "node", "", require("../../../../../assets/Images/Files-PNG-Clipart.png"))
           }
           draggable
         >   
          <img src={require('../../../../../assets/Images/Files-PNG-Clipart.png')} style={{height:"40px"}} alt="File Icon" /> 
            {/* <div key={item.id}>{item.symbol}</div> */}
          <li key={item.id}>{item.name}</li>
          </div>
         
          {/* <div
          style={{margin:'5px'}}
          className="dndnode input m-10"
          onDragStart={(event) =>
            onDragStart(event, "node", "", require("../../../../../assets/Images/Folders.png"))
          }
          draggable
        >
          <img src={require('../../../../../assets/Images/Folders.png')} style={{height:"40px"}} alt="File Icon" />
          <li key={item.id}>{item.name}</li>
        </div> */}

          </>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
