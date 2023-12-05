// Sidebar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sidebar = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Make the API call
    axios.get('http://localhost:3000/step-type')
      .then(response => {
        setApiData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div className="">
      <ul>
        {apiData.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
