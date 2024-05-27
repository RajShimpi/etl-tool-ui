import React, { useEffect, useState } from "react";
import CommonFormWithList from "../components/common-form-with-list";
import config from "../components/config/config.json";
import axios from "../services/axios";
import { getJobScheduleFields } from "./job-schedule-data";
import auth from "../user/auth";
import { useData } from "../../components/JobDataContext";
import StarsIcon from "@mui/icons-material/Stars";

const JobSchedule = () => {
  const [jobschedule, setJobschedule] = useState([]);
  const [project, setProject] = useState([]);
  const [job, setJob] = useState([]);
  const {jobProjectId,jobName}=useData()

  const client_id = auth.getStorageData("client_id");

  useEffect(() => {
    axios.getWithCallback("job-schedule/", (data) =>
      setJobschedule(
        data.map((x) => {
          return { value: x.id, label: x.name };
        })
      )
    );
  }, []);

  useEffect(() => {
    axios.getWithCallback(`projects/client/${client_id}`, (data) =>
      setProject(data.map((z) => ({ value: z.id, label: z.project_name })))
    );
  }, []);

  useEffect(() => {
    if (jobProjectId != null) {
      axios.getWithCallback(`job/${jobProjectId}/project`, (data) =>
        setJob(data.map((e) => ({ value: e.id, label: e.name })))
      );
    }
  }, [jobProjectId]);

  const defaultObj = {
    client_id: parseInt(client_id),
    project_id: "",
    job_id: "",
    name: "",
    description: "",
    scheduleCron: "",
    active: true,
  };

  const forceRun = () => {
    axios.postWithCallback(`job-schedule/forceRun/${jobName.name}`);
  };

  return (
    <>
      <CommonFormWithList
        formDataAction={getJobScheduleFields}
        columns={config.Job_Schedule}
        insertApi="job-schedule"
        updateApi="job-schedule/:id"
        getApi={`job-schedule/client/${client_id}`}
        title="Job Schedule"
        defaultObj={defaultObj}
        options={[project, job, jobschedule]}
        tableTitle="Job Schedule"
        otherParamsData={[]}
        otherParamColumns={[
          { name: "key", displayName: "Key", dbPropName: "parameter_name" },
          { name: "value", displayName: "Value", dbPropName: "value" },
        ]}
        btnName="Additional Parameter"
        name="Force Run"
        color="success"
        function={forceRun}
        marginTop={"9px"}
        disabled={true}
        icon={<StarsIcon style={{ fontSize: "20px" }} />}
      />
    </>
  );
};

export default JobSchedule;
