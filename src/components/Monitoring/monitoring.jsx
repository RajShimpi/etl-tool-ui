import React, { useEffect, useState } from "react";
import axios from "../../modules/services/axios";
import CustomSelect from "../../modules/components/custom-select";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import auth from "../../modules/user/auth";
import DataTable from "../../modules/components/data-table";

const Monitoring = () => {
  const [jobs, setJobs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [clusterJobs, setClusterJobs] = useState({
    data: [],
    columns: [],
    filterColumnName: [],
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [showData, setShowData] = useState([]);
  const [jobDataLogs, setJobDataLogs] = useState([]);
  const client_id = auth.getStorageData("client_id");

  useEffect(() => {
    axios.getWithCallback(`/projects/client/${client_id}`, (data) => {
      setProjects(data.map((x) => ({ value: x.id, label: x.project_name })));
    });
  }, [client_id]);

  useEffect(() => {
    setJobs([]);
    setSelectedJob([]);
    setShowData([]);
    setJobDataLogs([]);
  }, [selectedProject]);

  useEffect(() => {
    setShowData([]);
    setJobDataLogs([]);
  }, [selectedJob]);

  useEffect(() => {
    if (selectedProject && projects && selectedProject.value) {
      axios.getWithCallback(`/job/${selectedProject.value}/project`, (data) => {
        if (Array.isArray(data)) {
          setJobs(data.map((x) => ({ value: x.id, label: x.name })));
        } else {
          console.error("Expected an array but got:", data);
        }
      });
    }
  }, [selectedProject]);

  const handleProjectSelect = (selectedData) => {
    if (!selectedData) {
      console.error("Expected selected data but got:", selectedData);
      return;
    }
    setSelectedProject(selectedData);
  };

  const handleJobSelect = (selectedData) => {
    if (!selectedData) {
      console.error("Expected selected data but got:", selectedData);
      return;
    }
    setSelectedJob(selectedData);
  };

  useEffect(() => {
    axios.getWithCallback(
      selectedJob && selectedJob.text
        ? `/clusters/jobs/${selectedJob.text}`
        : `/clusters/jobs/`,
      (responseData) => {
        const data = responseData.map((x) => ({
          jobId: x.reference.jobId,
          job_name: x.labels?.["job-name"],
          trackingUrl: x.yarnApplications[0]?.trackingUrl,
          status: x.status?.state,
          date: x.statusHistory[0].startTime.date,
          start_Time: x.statusHistory[0].startTime.time,
          end_Time: x.status.startTime.time,
          progress: x.yarnApplications[0]?.progress,
        }));

        const keys = [
          { columnId: "job_name", columnName: "Job Name", width: "15%" },
          { columnId: "date", columnName: "Date", width: "15%" },
          { columnId: "start_Time", columnName: "Start Time", width: "15%" },
          { columnId: "end_Time", columnName: "End Time", width: "15%" },
          { columnId: "status", columnName: "Status", width: "15%" },
        ];

        const filterColumnName = [
          "status",
          "date",
          "start_Time",
          "end_Time",
          "job_name",
          "trackingUrl",
        ];

        const isShow = true;
        const tableTitle = "cluster job";

        const formattedData = {
          data: data,
          columns: keys,
          showCallBack,
          filterColumnName: filterColumnName,
          isShow: isShow,
          tableTitle: tableTitle,
        };

        setClusterJobs(formattedData);
      }
    );
  }, [selectedJob]);

  const showCallBack = (item) => {
    setShowData(item);
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
    padding: "5px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "200px",
  };

  const headerStyle = {
    fontWeight: "bold",
    fontSize: "1.2em",
    color: "#333",
    marginBottom: "15px",
  };

  const progressBarStyles = buildStyles({
    textSize: "16px",
    pathColor: "#4caf50",
    textColor: "#4caf50",
    trailColor: "#d6d6d6",
  });

  const statusStyles = buildStyles({
    textSize: "16px",
    trailColor: "#d6d6d6",
  });

  useEffect(() => {
    if (showData && showData.jobId) {
      axios.getWithCallback(`/clusters/jobs/logs/${showData.jobId}`, (data) => {
        setJobDataLogs(data);
      });
    }
  }, [showData]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0, color: "#555" }}>Job's Details</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ minWidth: "300px", marginRight: "20px" }}>
            <CustomSelect
              options={projects}
              label="Project"
              callback={handleProjectSelect}
            />
          </div>
          <div style={{ minWidth: "300px" }}>
            <CustomSelect
              options={jobs}
              label="Job"
              callback={handleJobSelect}
            />
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <DataTable {...clusterJobs} />
      </div>
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <div style={{ width: "calc(50% - 10px)", marginRight: "10px" }}>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
            }}
          >
            <h4
              style={{
                justifyContent: "center",
                display: "flex",
                marginBottom: "10px",
                color: "#555",
              }}
            >
              Job Detail
            </h4>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <div style={cardStyle}>
                    <div style={{ ...headerStyle, marginBottom: "20px" }}>
                      Job Name
                    </div>
                    <div>{showData.job_name || "N/A"}</div>
                  </div>

                  <div style={cardStyle}>
                    <div style={{ ...headerStyle, marginBottom: "20px" }}>
                      Start Time
                    </div>
                    <div>
                      <div style={{ marginBottom: "15px" }}>
                        Date: {showData?.date || "N/A"}
                      </div>
                      <div>Time: {showData?.start_Time || "N/A"}</div>
                    </div>
                  </div>

                  <div style={cardStyle}>
                    <div style={{ ...headerStyle, marginBottom: "20px" }}>
                      End Time
                    </div>
                    <div>
                      <div style={{ marginBottom: "15px" }}>
                        Date: {showData?.date || "N/A"}
                      </div>
                      <div>Time: {showData?.end_Time || "N/A"}</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <div style={cardRoundStyle}>
                    <div
                      className="d-flex"
                      style={{
                        alignItems: "center",
                        height: "200px",
                        justifyContent: "space-around",
                      }}
                    >
                      <div style={headerStyle}>Progress</div>
                      <div
                        style={{
                          height: 150,
                          width: 150,
                          marginLeft: "45px",
                          marginBottom: "18px",
                        }}
                      >
                        <CircularProgressbar
                          value={showData.progress * 100 || 0}
                          text={`${showData.progress * 100 || 0}%`}
                          styles={progressBarStyles}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={cardRoundStyle}>
                    <div
                      className="d-flex"
                      style={{
                        alignItems: "center",
                        height: "200px",
                        justifyContent: "space-around",
                      }}
                    >
                      <div style={headerStyle}>Status</div>
                      <div
                        style={{
                          height: 150,
                          width: 150,
                          marginLeft: "45px",
                          marginBottom: "18px",
                        }}
                      >
                        <CircularProgressbar
                          value={showData.status === "DONE" ? 100 : 0}
                          text={
                            showData.status === "DONE"
                              ? "Done"
                              : showData.status
                              ? "Error"
                              : "Null"
                          }
                          styles={statusStyles}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "calc(50% - 10px)",
            marginLeft: "10px",
            height: "100%",
          }}
        >
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <h4
              style={{
                justifyContent: "center",
                display: "flex",
                marginBottom: "10px",
                color: "#555",
              }}
            >
              Log's Detail
            </h4>
            <textarea
              value={
                jobDataLogs.length != 0
                  ? jobDataLogs.map((x) => x.content)
                  : "No Log's Found"
              }
              disabled={true}
              rows={6}
              cols={50}
              style={{
                width: "100%",
                padding: "10px",
                fontFamily: "monospace",
                height: "440px",
              }}
            />
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Monitoring;
