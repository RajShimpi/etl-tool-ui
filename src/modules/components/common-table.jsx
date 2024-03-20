import { useEffect, useState } from "react";
import _ from "lodash";

const CommonTable = ({
  data,
  columns,
  callback,
  resetparamsTable,
  otherParamsData,
}) => {
  const [nameValue, setNameValue] = useState([]);
  const [otherData, setotherData] = useState([]);

  useEffect(() => {
    if (data) {
      setotherData(data);
    } else  if(otherParamsData){
      setotherData(otherParamsData);
    }else{
      setotherData([]);
    }
  }, [otherData]);

  useEffect(() => {
    let so = otherData.map((item) => {
      let obj = {};
      columns.forEach((col) => {
        obj = { ...obj, [`${col.name}_${item.sequence}`]: item[col.name] };
      });
      return {
        ...obj,
        ...item,
      };
    });
    setNameValue(so);
  }, [otherData, columns]);

  useEffect(() => {
    let so = data.map((item) => {
      let obj = {};
      columns.forEach((col) => {
        obj = { ...obj, [`${col.name}_${item.sequence}`]: item[col.name] };
      });
      return {
        ...obj,
        ...item,
      };
    });
    setNameValue(so);
  }, [data, columns]);

  const onClick = (e) => {
    e.preventDefault();
    let val = _.maxBy(nameValue, (x) => x.sequence);
    setNameValue((prevData) => [
      ...prevData,
      { sequence: val?.sequence ? val.sequence + 1 : 1 },
    ]);
  };

  const onRemove = (e, id) => {
    e.preventDefault();
    setNameValue(nameValue.filter((x) => x.sequence !== id));
  };

  const onChange = (e, obj) => {
    var item = nameValue.find((x) => x.sequence === obj.sequence);
    item[e.target.name] = e.target.value;
    setNameValue((prevData) => [...prevData]);
  };

  useEffect(() => {
    callback(
      nameValue.map((x) => {
        let obj;
        columns.forEach((col) => {
          obj = { ...obj, [col.name]: x[`${col.name}_${x.sequence}`] };
        });
        return {
          ...x,
          ...obj,
        };
      })
    );
  }, [nameValue]);

  useEffect(() => {
    if (resetparamsTable) {
      setNameValue([]);
    }
  }, [resetparamsTable]);

  return (
    <>
      <div style={{ padding: "0px 0px 20px 20px" }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => onClick(e)}
        >
          <i className="fa fa-plus" />
          Additional Parameter
        </button>
      </div>
      {!!nameValue?.length && (
        <table className="table table-striped table-bordered dt-responsive">
          <thead
            style={{
              backgroundColor: "rgb(60, 141, 188)",
              color: "white",
            }}
          >
            <tr>
              {columns.map((col, ind) => (
                <th>{col.displayName}</th>
              ))}
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {nameValue.map((x) => (
              <tr>
                {columns.map((col, ind) => (
                  <td>
                    <input
                      type="text"
                      name={`${col.name}_${x.sequence}`}
                      value={x[`${col.name}_${x.sequence}`]}
                      onChange={(e) => {
                        onChange(e, x);
                      }}
                    />
                  </td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn"
                    onClick={(e) => onRemove(e, x.sequence)}
                  >
                    <i className="fa fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CommonTable;
