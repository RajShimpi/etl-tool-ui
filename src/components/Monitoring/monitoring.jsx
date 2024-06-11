import React, { useEffect, useState } from "react";
import axios from "../../modules/services/axios";
import CustomSelect from "../../modules/components/custom-select";
import { CircularProgressbar } from "react-circular-progressbar";
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

  return (
    <div className="monitoring-container">
      <div className="select-container">
        <CustomSelect
          options={clusterJobs}
          label="Job"
          callback={handleJobSelect}
        />
      </div>

      <div className="job-details">
        <h2>Job Details</h2>
        <div className="d-flex">
          <div
            className="d-flex"
            style={{
              margin: "20px",
              borderRadius: "10px",
              border: "2px solid black",
              padding: "10px",
            }}
          >
            <div className="d-flex flex-column" style={{justifyContent: "space-around"}}>
            <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>Job Name</div>
              <div
                className="d-flex"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div style={{ padding: "10px" }}>
                {selectedJob && selectedJob.labels["job-name"]}
                </div>
              </div>
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              margin: "20px",
              borderRadius: "10px",
              border: "2px solid black",
              padding: "10px",
            }}
          >
            <div
              className="d-flex"
              style={{
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
              }}
            >
              Progress
            </div>
            <div style={{ width: 100 }}>
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
              />
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              margin: "20px",
              borderRadius: "10px",
              border: "2px solid black",
              padding: "10px",
            }}
          >
            <div
              className="d-flex"
              style={{
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
              }}
            >
              Status
            </div>
            <div style={{ width: 100, height: 100 }}>
              <CircularProgressbar
                value={
                  selectedJob && selectedJob.status.state === "DONE" ? 100 : 0
                }
                text={
                  selectedJob && selectedJob.status.state === "DONE"
                    ? "Done"
                    : "Error"
                }
              />
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              margin: "20px",
              borderRadius: "10px",
              border: "2px solid black",
              padding: "10px",
            }}
          >
            <div className="d-flex flex-column">
            <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>Start Time</div>
              <div
                className="d-flex"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div style={{ marginRight: "10px" }}>Date:</div>
                <div style={{ padding: "10px" }}>
                  {selectedJob &&
                    getRunningStateStartTime(selectedJob.statusHistory) &&
                    formatTime(
                      getRunningStateStartTime(selectedJob.statusHistory)
                    )[0]}
                </div>
              </div>
              <div
                className="d-flex"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div style={{ marginRight: "10px" }}>Time:</div>
                <div style={{ padding: "10px" }}>
                  {selectedJob &&
                    getRunningStateStartTime(selectedJob.statusHistory) &&
                    formatTime(
                      getRunningStateStartTime(selectedJob.statusHistory)
                    )[1]}
                </div>
              </div>
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              margin: "20px",
              borderRadius: "10px",
              border: "2px solid black",
              padding: "10px",
            }}
          >
            <div className="d-flex flex-column">
                <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>End Time</div>
              <div
                className="d-flex"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div style={{ marginRight: "10px" }}>Date:</div>
                <div style={{ padding: "10px" }}>
                  {selectedJob &&
                    selectedJob.status.startTime &&
                    formatTime(selectedJob.status.startTime)[0]}
                </div>
              </div>
              <div
                className="d-flex"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div style={{ marginRight: "10px" }}>Time:</div>
                <div style={{ padding: "10px" }}>
                  {selectedJob &&
                    selectedJob.status.startTime &&
                    formatTime(selectedJob.status.startTime)[1]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
