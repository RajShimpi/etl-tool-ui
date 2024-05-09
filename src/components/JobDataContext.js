import { createContext, useContext, useState } from "react";

const useDataContext = createContext();

export const UseContextProvider = ({ children }) => {
  const [jobDataId, setJobDataId] = useState(null);
  const [jobFolder, setJobFolder] = useState(null);
  const [projectID, setProjectID] = useState(null);
  const [dashboardId, setDashboardId] = useState(null);
  const [jobProjectId, setJobProjectId] = useState();
  const [jobName, setJobName] = useState([]);

  
  const setJobDataIdValue = (id) => {
    setJobDataId(id);
  };
  const setJobFolderValue = (data) => {
    setJobFolder(data);
  };
  const setProjectIDValue = (id) => {
    setProjectID(id);
  };
  const setDashboardIdValue = (id) => {
    setDashboardId(id);
  };
  const setJobProjectIdValue = (data) => {
    setJobProjectId(data);
  };
  const setJobNameValue = (data) => {
    setJobName(data);
  };

  return (
    <useDataContext.Provider value={{ jobDataId,jobFolder, setJobDataId: setJobDataIdValue ,setJobFolder:setJobFolderValue,projectID, setProjectID: setProjectIDValue,dashboardId, setDashboardId: setDashboardIdValue,jobProjectId, setJobProjectId: setJobProjectIdValue,jobName, setJobName: setJobNameValue}}>
      {children}
    </useDataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(useDataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};