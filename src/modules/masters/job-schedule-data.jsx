export const getJobScheduleFields = (itemData) => {
  return [
    {
      col: 4,
      callback: itemData.callback,
      disabled: itemData.disabled,
      groups: [
        {
          id: "inputproject_id",
          label: "Project",
          name: "project",
          control: "select",
          options: itemData.options[0],
          isRequired: true,
          itemVal: itemData.values ? itemData.values["project_id"] : "",
        },
        {
          type: "text",
          id: "inputjob_id",
          label: "Job",
          name: "job",
          control: "select",
          options: itemData.options[1],
          isRequired: true,
          itemVal: itemData.values ? itemData.values["job_id"] : "",
        },
        {
          id: "inputname",
          label: "Name",
          name: "name",
          control: "input",
          isRequired: true,
          itemVal: itemData.values ? itemData.values["name"] : "",
        },
        {
          id: "inputdescription",
          label: "Description",
          name: "description",
          control: "input",
          isRequired: true,
          itemVal: itemData.values ? itemData.values["description"] : "",
        },
        {
          id: "inputscheduleCron",
          label: "Schedule Cron",
          name: "scheduleCron",
          control: "input",
          isRequired: true,
          itemVal: itemData.values ? itemData.values["scheduleCron"] : "",
        },
        {
          type: "checkbox",
          id: "inputactive",
          label: "Active",
          name: "active",
          control: "input",
          isRequired: true,
          itemVal: itemData.values ? itemData.values["active"] : "",
        },
      ],
    },
  ];
};
