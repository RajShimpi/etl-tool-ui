import { createContext, useContext, useState } from "react";

const JobDataContext = createContext();

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
