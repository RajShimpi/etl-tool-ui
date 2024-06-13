import React, { useEffect, useState } from "react";
import axios from "../../modules/services/axios";
import CustomSelect from "../../modules/components/custom-select";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Monitoring = () => {
  const [clusterJobs, setClusterJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.getWithCallback("/clusters/jobs", (response) => {
      if (Array.isArray(response)) {
        setData(response);
        setClusterJobs(
          response.map((x) => ({
            value: x?.reference?.jobId,
            label: x?.labels?.["job-name"],
          }))
        );
      } else {
        console.error("Expected an array but got:", response);
      }
    });
  }, []);

  const formatTime = (timestamp) => {
    const formattedDate = new Date(timestamp).toLocaleDateString();
    const formattedTime = new Date(timestamp).toLocaleTimeString();
    return [formattedDate, formattedTime];
  };

  const handleJobSelect = (selectedData) => {
    if (!selectedData) {
      console.error("Expected selected data but got:", selectedData);
      return;
    }

    const jobDetails = data.find(
      (job) => job.reference.jobId === selectedData.value
    );
    setSelectedJob(jobDetails);
  };

  const getRunningStateStartTime = (statusHistory) => {
    const runningState = statusHistory?.find(
      (status) => status.state === "RUNNING"
    );
    return runningState?.startTime;
  };

  const cardStyle = {
    flex: "1 1 300px",
    margin: "10px",
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "150px",
   
  };
  const cardRoundStyle = {
    flex: "1 1 300px",
    margin: "10px",
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "247px",
   
  };

  const headerStyle = {
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "1.2em",
    color: "#333",
  };

  const progressBarStyles = buildStyles({
    textSize: "16px",
    pathColor: "#4caf50",
    textColor: "#4caf50",
    trailColor: "#d6d6d6",
    
  });

  const statusStyles = buildStyles({
    textSize: "16px",
    pathColor: selectedJob?.status.state === "DONE" ? "#4caf50" : "#f44336",
    textColor: selectedJob?.status.state === "DONE" ? "#4caf50" : "#f44336",
    trailColor: "#d6d6d6",
  });

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", backgroundColor: "#f5f5f5", borderRadius: "10px" }}>
      {/* <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Job Monitoring Dashboard</h1> */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, color: "#555" }}>Job Details</h2>
        <div style={{ minWidth: "300px" }}>
          <CustomSelect
            options={clusterJobs}
            label="Select Job"
            callback={handleJobSelect}
          />
        </div>
      </div>

      <div style={{ padding: "20px", backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* First Row */}
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={cardStyle}>
              <div style={headerStyle}>Job Name</div>
              <div>{selectedJob && selectedJob.labels["job-name"]}</div>
            </div>

            <div style={cardStyle}>
              <div style={headerStyle}>Start Time</div>
              <div>
                <div>
                  Date:{" "}
                  {selectedJob &&
                    getRunningStateStartTime(selectedJob.statusHistory) &&
                    formatTime(
                      getRunningStateStartTime(selectedJob.statusHistory)
                    )[0]}
                </div>
                <div>
                  Time:{" "}
                  {selectedJob &&
                    getRunningStateStartTime(selectedJob.statusHistory) &&
                    formatTime(
                      getRunningStateStartTime(selectedJob.statusHistory)
                    )[1]}
                </div>
              </div>
            </div>

            <div style={cardStyle}>
              <div style={headerStyle}>End Time</div>
              <div>
                <div>
                  Date:{" "}
                  {selectedJob &&
                    selectedJob.status.startTime &&
                    formatTime(selectedJob.status.startTime)[0]}
                </div>
                <div>
                  Time:{" "}
                  {selectedJob &&
                    selectedJob.status.startTime &&
                    formatTime(selectedJob.status.startTime)[1]}
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div style={{ display: "flex" }}>
            <div style={cardRoundStyle}>
              <div style={headerStyle}>Progress</div>
              <div style={{height: 150,width: 150, marginLeft: 168}}>
                <CircularProgressbar 
                  value={
                    (selectedJob &&
                      selectedJob.yarnApplications[0]?.progress * 100) ||
                    0
                  }
                  text={
                    `${
                      selectedJob &&
                      selectedJob.yarnApplications[0]?.progress * 100
                    }%` || 0
                  }
                  styles={progressBarStyles}
                />
              </div>
            </div>

            <div style={cardRoundStyle}>
              <div style={headerStyle}>Status</div>
              <div  style={{height: 150,width: 150, marginLeft: 168}}>
                <CircularProgressbar 
                  value={
                    selectedJob && selectedJob.status.state === "DONE" ? 100 : 0
                  }
                  text={
                    selectedJob && selectedJob.status.state === "DONE"
                      ? "Done"
                      : "Error"
                  }
                  styles={statusStyles}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
