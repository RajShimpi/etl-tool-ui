import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import { useDashboardId } from '../../components/JobDataContext';

const MetabaseComponent = () => {
  const [iframeUrl, setIframeUrl] = useState('');
  const {dashboadId} =useDashboardId([])

  useEffect(() => {
    axios.getWithCallback(`metabase/data/${dashboadId}`, (data) => setIframeUrl(data)) 
  }, [dashboadId]);
 
  return (
    <>
    <div>
      {iframeUrl && (
        <iframe
          src={iframeUrl.iframeUrl}
          width="100%"
          height="1300px"
          frameBorder="0"
          allowtransparency="true"
          allowFullScreen
        ></iframe>
      )}
    </div>
    </>
  );
};

export default MetabaseComponent;
