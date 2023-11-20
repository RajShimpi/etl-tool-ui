import React from 'react';

function Photo() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src="/photo1.jpeg" alt="React Image"  style={{width:'100%',height:'100%'}}/>
    </div>
  );
}

export default Photo;
