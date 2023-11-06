import React, { useState } from 'react';

const MainComponent = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const item = event.dataTransfer.getData('text/plain');

    if (!droppedItems.includes(item)) {    // To Check if the Component is already in the droppedItems array
      setDroppedItems([...droppedItems, item])
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const style = {
    border: '1px solid black',
    padding: '10px',
    width: "130vh",
    height: "500px",
    overflow: "hidden",
    justifyContent: "center",
    textAlign: "center"
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}> Drop Component</h2>
      <div
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        style={style}
      >
        {droppedItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default MainComponent;
