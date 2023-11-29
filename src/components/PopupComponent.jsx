import React from 'react';
// import Client from '../modules/masters/client';
import Project from '../modules/masters/project';

const PopupComponent = ({ onClose, actionType }) => {
  return (
    <div className="popup">
      <div className="popup-content">
          <div style={{ flex: 1 }}>
            <Project />
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
