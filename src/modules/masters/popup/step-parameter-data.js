export const getstepparameterFields = (itemData) => {
  return [{
    col: 12,
    callback: itemData.callback,
    disabled: itemData.disabled,
    groups: [{
      id: "inputparameterFileid",
      label: "edit Name",
      name: "parameter_name",
      options: itemData.options[0],
      control: "input",
      isSubmit: itemData.isSubmit,
      isRequired: !itemData?.values?.paramters,
      itemVal: itemData.values ? itemData.values["parameter_name"] : '',
    },
    ]
  }];
}
