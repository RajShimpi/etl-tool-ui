import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import {useData } from '../../components/JobDataContext';

const MetabaseComponent = () => {
  const [iframeUrl, setIframeUrl] = useState('');
  const { dashboardId } = useData();

  useEffect(() => {
    if (dashboardId) {
      axios.getWithCallback(`client-dashboard/data/${dashboardId}`, (data)=>{setIframeUrl(data.iframeUrl)})
    }
  }, [dashboardId]);

  return (
    <div>
      {iframeUrl && (
        <iframe
          src={iframeUrl}
          width="100%"
          height="800px"
          frameBorder="0"
          allowtransparency="true"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default MetabaseComponent;
