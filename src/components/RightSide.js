import React, { useState } from 'react';

const Component = () => {
  const [components, setComponents] = useState([
    "Component 1",
    "Component 2",
    "Component 3",
    "Component 4",
    "Component 5",
    "Component 6",
    "Component 7",
    "Component 8",
    "Component 9",
    "Component 10",
  ]);

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData('text/plain', item);
  };

  const style = {
    height: "500px",
    width: "40vh",
    justifyContent: "center",
    textAlign: "center",
    overflow: "hidden",
    border: '1px solid black',
    paddingTop: "20px"
  }

  return (
    <>
      <h2>Component</h2>
      <div style={style}>
        {components.map((component, index) => (
          <div
            key={index}
            className='component'
            draggable
            style={{ padding: '1px', margin: "2px", backgroundColor: "#d1cfcf" }}
            onDragStart={(e) => handleDragStart(e, component)}>
            {component}
          </div>
        ))}
      </div>
    </>
  );
};

export default Component;
