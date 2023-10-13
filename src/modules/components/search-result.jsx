import React, {useEffect, useState} from 'react';

import { Link, useLocation } from 'react-router-dom';
import FormCommon from "./form-common";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";

const SearchResult = ({experimentIds, setSearchQuery, searchQuery, finalData, setfinalData}) => {
  const [ids, setIds] = useState([]);
  const [options, setOptions] = useState([]);

  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [apiResp, setApiResp] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIds(experimentIds);
  }, [experimentIds]);

  // const searchQuery = location.state?.data;

  useEffect(() => {
    axios.getWithCallback("/search", (res) => {
      setApiResp(res?.data);
    });
    return () => setSearchQuery('')
  }, []);
  const setValues = (e, name) => {
    if (!e) return;
    switch (name) {
      case "input":
        if (!e.target.value) {
          setData((prevData) => {
            const { [e.target.name]: omit, ...updatedData } = prevData;
            return updatedData;
          });
        } else {
          setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }));
        }
        break;
      case e.label:
        if (!e.value) {
          setData((prevData) => {
            const { [name]: omit, ...updatedData } = prevData;
            return updatedData;
          });
        } else {
          setData((prevData) => ({ ...prevData, [name]: e.value }));
        }
        break;
      default:
        //if multi select
        if (Object.keys(e).length >= 1) {
          const lastItem = e[e.length - 1];
          if (name in data) {
            const updatedValue = e.map((item) => item.value).join(",");
            setData((prevData) => ({ ...prevData, [name]: updatedValue }));
          } else if (lastItem.value) {
            setData((prevData) => ({ ...prevData, [name]: lastItem.value }));
          } else {
            setData((prevData) => {
              const { [name]: omit, ...updatedData } = prevData;
              return updatedData;
            });
          }
        }
        //if key current selection is empty and key is already in data const than it will remove the key
        else {
          setData((prevData) => {
            const { [name]: omit, ...updatedData } = prevData;
            return updatedData;
          });
        }
        // End multi select
        break;
    }
  };

  const getItemData = (itemData) => {
    return [
      {
        col: 12,
        callback: itemData.callback,
        groups: !!apiResp
          ? apiResp?.map((v) => {
              return {
                type: v?.config?.type,
                id: v?.config?.id,
                label: v?.config?.displayName,
                name: v?.config?.code,
                control: v?.config?.type,
                options: v?.options,
                disabled: false,
                code: v?.config?.code,
                whsere_clause: v?.config?.searchWhereClause,
                itemVal: itemData.values
                  ? itemData.values[v?.config?.displayName]
                  : "",
                multiple: v.config.type === "select-react" ? true : "",
              };
            })
          : [],
      },
    ];
  };

  const handleSubmit = (e) => {

    console.log(searchQuery)
    e.preventDefault();

    if (Object.keys(data).length > 0) {
      //if data is not empty than where clause will set and api call done
      // setting where caluse with data
      const final_data = Object.entries(data).map(([key, value]) => {
        if (key !== "whereClause") {
          const matchingConfig = apiResp.find(
            (resp) => resp.config.code === key
          );

          if (matchingConfig) {
            const searchWhereClause = matchingConfig.config.searchWhereClause;
            return { [key]: value, whereClause: searchWhereClause };
          }
        }

        return { [key]: value };
      });
      setfinalData(final_data)
      axios.postWithCallback(
        "/experiment/criteria-wise-experiment-search",
        { data: final_data, searchQuery:searchQuery? searchQuery : "" },
        (data) => {
          setIds(data?.data);
        }
      );
      navigate("/search-result",  { state: { data: searchQuery }});
    }
    else {
      axios.postWithCallback(
        "/experiment/criteria-wise-experiment-search",
        {data: [], searchQuery: searchQuery}, (data) => {
        setIds(data?.data);

      });
      setIds([[], 0])
    }


  };

  return (
    <div className="page-content">
      <div className="d-flex justify-content-between">
        <div className="container-fluid" style={{ width: "300px" }}>
          <div
            className="row"
            style={{
              border: "1px solid black",
              position: "sticky",
              top: "80px",
            }}
          >
            <h5 className="pt-2 pl-5">Advance Search</h5>
            <div className="form-group">
              <FormCommon
                data={getItemData(
                  {
                    isSubmit: false,
                    update: update,
                    callback: setValues,
                    values: data,
                    options: options,
                  },
                  apiResp
                )}
              />
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary w-50 h6 text-white"
                onClick={(e) => handleSubmit(e)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">EXPERIMENT LIST</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      <i className="fas fa-chevron-right"></i> EXPERIMENT LIST
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {!!ids && (
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <div></div>
                  <div>
                    <strong>Matching Results: </strong>
                    {ids[1]}
                  </div>
                </div>
              </div>
            )}
            <div className="container-fluid">
              <div className="row">
                {!!ids && ids[1] !== 0 ?  (
                    Array.isArray(ids[0]) && ids[0].map((element, index) => (
                        <div className="col-xl-3 col-lg-4 col-sm-6" key={index}>
                          {/* <ExperimentCard experimentId={element?.experimentId} path={"searchCard"} /> */}
                        </div>
                      ))
                  ) : (
                      <h5 style={{
                          display: "grid",
                          placeItems: "center",
                          height: "80vh",
                          color: "red",
                        }} > No Result Found !
                      </h5>
                    )
                }
              </div>
            </div>

             {/* {!!experimentIds && (
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <div></div>
                  <div>
                    <strong>Matching Results: </strong>
                    {experimentIds[1]}
                  </div>
                </div>
              </div>
            )} */}

            {/* <div className="container-fluid">
              <div className="row">
                {!!experimentIds && experimentIds[0].length !== 0 ? (
                     experimentIds[0].map((element, index) => (
                      <div className="col-xl-3 col-lg-4 col-sm-6" key={index}>
                        <ExperimentCard experimentId={element?.experimentId} />
                      </div>
                    ))
                  ) : (
                    <h5 style={{
                          display: "grid",
                          placeItems: "center",
                          height: "80vh",
                          color: "red",
                        }}> No Result Found !
                    </h5>
                  )
                }
              </div>
            </div> */}


          </div>
          `{" "}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;