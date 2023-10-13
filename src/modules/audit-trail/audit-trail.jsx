import React, { useEffect, useState } from "react";
import DataTable from "../components/data-table";
import utils from "../components/utils";
import config from "../config/config.json";
import axios from "../services/axios";

const AuditTrail = (props) => {
  const [auditData, setAuditData] = useState([]);
  const [auditDataTable, setAuditDataTable] = useState({
    data: [],
    columns: [],
    filterColumnName: [],
    tableTitle:'Audit Trail Master'
  });
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    axios.getWithCallback(`/auditTrail`, (data) => {
      setAuditData(data);
    });
  }, []);

  useEffect(() => {
    if (!!auditData.length && !keys.length) {
      setKeys(utils.extractColumns(auditData[0], config.AUDIT_TRAIL_COLUMNS));
    } else {
      setAuditDataTable({
        ...auditDataTable,
        data: auditData,
        columns: keys,
        filterColumnName: config.AUDIT_TRAIL_COLUMNS,
      });
    }
  }, [auditData, keys]);

  return (
    <div className="row">
      <div className="col-xl-12">
        <DataTable {...auditDataTable} />
      </div>
    </div>
  );
};

export default AuditTrail;
