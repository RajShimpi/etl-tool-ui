export const getJobScheduleFields = (itemData) => { 
  return [{
      col: 4,
      callback: itemData.callback,
      disabled: itemData.disabled,
      groups: [
      {
          id: "inputprojectid",
          label: "Project",
          name: "project_id",
          control: "select",
          options: itemData.options[0],
          isRequired: true,
          itemVal: itemData.values ? itemData.values["project_id"] : '',
      },
      {
          id: "inputjobsid",
          label: "Job",
          name: "job_id",
          control: "select",
          options: itemData.options[1],
          isRequired: true,
          itemVal: itemData.values ? itemData.values["job_id"] : '',
      },
      {
          id: "inputname",
          label: "Name",
          name: "name",
          control: "input",
          isRequired: true,
          itemVal: itemData.values ? itemData.values["name"] : '',
      },
      {
          id: "inputdescription",
          label: "Description",
          name: "description",
          control: "input",
          isRequired: true,
          itemVal: itemData.values ? itemData.values["description"] : '',
      },
      {
          id: "inputscheduleCron",
          label: "Schedule Cron",
          name: "scheduleCron",
          control: "input",
        //   isRequired: true,
          itemVal: itemData.values ? itemData.values["scheduleCron"] : '',
      },
      {
          type: "checkbox",
          id: "inputactive",
          label: "Active",
          name: "active",
          control: "input",
          itemVal: itemData.values ? itemData.values["active"] : '',
      },
      ]
  }];
}