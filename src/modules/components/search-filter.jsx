import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import FormCommon from "./form-common";
import "./component.css";
import { useNavigate } from "react-router-dom";

const SearchFilter = ({ setExperimentIds, setSearchQuery, searchQuery, finalData, setfinalData }) => {
  const defaultValues = {
    Name: "",
    Catelogue: "",
    Reaction: "",
    Owner: "",
  };

  const [update, setUpdate] = useState(false);
  const [options, setOptions] = useState([
    { value: "Reaction-A", label: "Reaction-A" },
    { value: "Reaction-B", label: "Reaction-B" },
    { value: "Reaction-C", label: "Reaction-C" },
    { value: "Reaction-D", label: "Reaction-D" },
  ]);

  // const [data, setData] = useState({ ...defaultValues });
  // const [data, setData] = useState([]);
  const [apiResp, setApiResp] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState("");
  const navigate = useNavigate();

  /*useEffect(() => {
    axios.getWithCallback("/search", (res) => {
      console.log(res.data)
      setApiResp(res?.data);
    });
  }, []);*/

  const handleSearch = (e) => {
    e.preventDefault();

    // axios.postWithCallback(
    //   "/experiment/criteria-wise-experiment-search",
    //   { data: final_data, searchQuery:searchQuery? searchQuery : "" },
    //   (data) => {
    //     setIds(data?.data);
    //   }
    // );


    if (searchQuery && finalData) {
      axios.postWithCallback(
        "/experiment/criteria-wise-experiment-search",
        {data: finalData, searchQuery: searchQuery}, (data) => {
        setExperimentIds(data?.data);
        navigate("/search-result",  { state: { data: searchQuery }});
      });
    } else {
      //handleSubmit(e);
      navigate("/search-result",  { state: { data: '' }});
    }
  };

  // set data of searchQuery
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
{/* 
  // call back function which store data of search form
  /*const setValues = (e, name) => {
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
  };*/

  // function on submit search form
  /*const handleSubmit = (e) => {
    console.log(searchQuery)
    e.preventDefault();
    var dropdownMenu = document.getElementById('search_form');
    dropdownMenu.classList.remove('show');
    setSearchData(data);
    console.log(data);
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

      axios.postWithCallback(
        "/experiment/criteria-wise-experiment-search",
        { data: final_data },
        (data) => {
          setExperimentIds(data?.data);
        }
      );
    }
    navigate("/search-result",  { state: { data: data }});
  };
  // set field values of search form
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
 */}
  return (
    <>
      <form className="search-bar text-dark" onSubmit={handleSearch}>
        <div className="dropdown">
          <input
            type="text"
            className="form-control search-field"
            onChange={handleChange}
            value={searchQuery}
            placeholder="Search..."
          ></input>
          <span
            className="search-icon cursor-pointer" // dropdown-toggle
            type="button"
            id="filterDropDown"
            //data-toggle="dropdown"
            //aria-haspopup="true"
            //aria-expanded="false"
            onClick={handleSearch}
          >
            <i className="fa fa-filter text-white"></i>
          </span>

          {/*<div
            className="dropdown-menu p-3"
            aria-labelledby="filterDropDown"
            onClick={(e) => e.stopPropagation()}
            id="search_form"
            style={{ maxHeight: "350px", overflowY: "auto" }}
          >
            <div className="form-group">
              <FormCommon
                onSubmit={handleSubmit}
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
              >
                Search
              </button>
            </div>
                </div>*/}
        </div>
      </form>
    </>
  );
};

export default SearchFilter;
