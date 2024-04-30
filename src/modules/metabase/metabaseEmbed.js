import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import { useDashboardId } from '../../components/JobDataContext';
import auth from '../user/auth';

const MetabaseComponent = () => {
  const [iframeUrl, setIframeUrl] = useState('');
  const { dashboadId } = useDashboardId(); // Corrected spelling of dashboardId
  const clientId = auth.getStorageData("client_id"); // Corrected spelling of clientId

  useEffect(() => {
    if (dashboadId) {
      axios.getWithCallback(`metabase/data/${dashboadId}`, (data)=>{setIframeUrl(data.iframeUrl)})
    }
  }, [dashboadId]);

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
