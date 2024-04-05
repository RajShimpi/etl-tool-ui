import React, { useEffect, useState } from "react";
import CommonTable from "../../components/common-table";
import axios from "../../services/axios";

function Project_Properties({PropertieColumns,callback,project_id }) {
  const [resetparamsTable, setResetparamsTable] = useState(false);
  const [data, setData] = useState([]);

useEffect(()=>{
  if(project_id){
  axios.getWithCallback(`project-property/${project_id}`,(data)=>{
  const dt =data?.data?.map((x)=>({
    id:x.id,
    key:x.name,
    name:x.name,
    sequence: x.sequenceId,
    value:x.value
  }))
    setData(dt)}
  )}
},[project_id])

  return (
    <div>
      <CommonTable
      btnName="Add Propertie's"
        data={data}
        columns={PropertieColumns}
        callback={callback}
        resetparamsTable={resetparamsTable}
      />
    </div>
  );
}

export default Project_Properties;
