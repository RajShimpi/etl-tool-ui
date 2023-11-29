import React from 'react';
// import Client from '../modules/masters/client';
import Project from '../modules/masters/project';

const PopupComponent = ({ onClose, actionType }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        {/* <button onClick={onClose}>Close</button> */}
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            {/* <p>{`This is your ${actionType} popup content.`}</p> */}
          </div>
          <div style={{ flex: 1 }}>
            <Project />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
