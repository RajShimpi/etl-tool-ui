import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import { useDashboardMetabaseData, useDashboardMetabaseDataId } from '../../components/JobDataContext';

const MetabaseComponent = () => {
  const [iframeUrl, setIframeUrl] = useState('');
  const [data, setData] = useState([]);
  const {setMetabaseData} =useDashboardMetabaseData([])
  const {metabaseDataId} =useDashboardMetabaseDataId([])
  useEffect(() => {
    axios.getWithCallback(`metabase/data/${metabaseDataId}`, (data) => setIframeUrl(data)) 
    axios.getWithCallback('metabase/json', (data) => setData(data))
  }, [metabaseDataId]);
  setMetabaseData(data)
 
  return (
    <>
    <div>
      {iframeUrl && (
        <iframe
          src={iframeUrl.iframeUrl}
          width="100%"
          height="900"
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
