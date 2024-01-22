import { createContext, useContext, useState } from "react";

const JobDataContext = createContext();
const ClientIdContext = createContext();

export const JobDataProvider = ({ children }) => {
  const [jobDataId, setJobDataId] = useState(null);

  const setJobDataIdValue = (id) => {
    setJobDataId(id);
  };

  return (
    <JobDataContext.Provider value={{ jobDataId, setJobDataId: setJobDataIdValue }}>
      {children}
    </JobDataContext.Provider>
  );
};

export const useJobData = () => {
  const context = useContext(JobDataContext);
  if (!context) {
    throw new Error("useJobData must be used within a JobDataProvider");
  }
  return context;
};

export const ClientIdProvider = ({ children }) => {
  const [clientId, setClientId] = useState(null);

  const setClientIdValue = (client_id) => {
    setClientId(client_id);
  };

  return (
    <ClientIdContext.Provider value={{ clientId, setClientId: setClientIdValue }}>
      {children}
    </ClientIdContext.Provider>
  );
};

export const useClientId = () => {
  const context = useContext(ClientIdContext);
  if (!context) {
    throw new Error("useJobData must be used within a JobDataProvider");
  }
  return context;
};
