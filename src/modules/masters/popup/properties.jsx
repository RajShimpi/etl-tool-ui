import React, { useState } from "react";
import CommonTable from "../../components/common-table";

function Project_Properties({PropertieColumns,callback }) {
  const [resetparamsTable, setResetparamsTable] = useState(false);

  const dt = [
    {
      key: "DB_SQL",
    //   key_1: "DB_SQL",
      name: "DB_SQL",
      sequence: 1,
      value: "DB_SQL_QURERY",
    //   value_1: "DB_SQL_QURERY",
    },
    {
      key: "DB_PG",
    //   key_1: "DB_PG",
      name: "DB_PG",
      sequence: 2,
    //   value: "DB_PG",
      value: "DB_PG_QUERY",
    },
    {
      key: "DB_NOSQL",
    //   key_1: "DB_NOSQL",
      name: "DB_NOSQL",
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
        callback={callback}
        resetparamsTable={resetparamsTable}
      />
    </div>
  );
}

export default Project_Properties;
