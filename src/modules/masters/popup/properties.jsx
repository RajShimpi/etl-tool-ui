import React, { useState } from "react";
import CommonTable from "../../components/common-table";

function Project_Properties({ props, PropertieColumns, project_id }) {
  const [resetparamsTable, setResetparamsTable] = useState(false);

  const otherCallback = (data) => {
    let sp = data.map((x) => {
      let obj;
      PropertieColumns.forEach((col) => {
        obj = { ...obj, [col.dbPropName]: x[col.name] };
      });
      return {
        ...x,
        ...obj,
      };
    });
    // setData(sp)
  };
  const dt = [
    {
      key: "DB_SQL",
    //   key_1: "DB_SQL",
    //   parameter_name: "DB_SQL",
      sequence: 1,
      value: "DB_SQL_QURERY",
    //   value_1: "DB_SQL_QURERY",
    },
    {
      key: "DB_PG",
    //   key_1: "DB_PG",
    //   parameter_name: "DB_PG",
      sequence: 2,
    //   value: "DB_PG",
      value: "DB_PG_QUERY",
    },
    {
      key: "DB_NOSQL",
    //   key_1: "DB_NOSQL",
    //   parameter_name: "DB_NOSQL",
      sequence: 3,
    //   value: "DB_NOSQL",
      value: "DB_NOSQL_QUREY",
    },
  ];
  return (
    <div>
      <CommonTable
      btnName="Add Propertie's"
        data={dt}
        columns={PropertieColumns}
        callback={otherCallback}
        resetparamsTable={resetparamsTable}
      />
    </div>
  );
}

export default Project_Properties;
