import React, { useState, useEffect } from 'react';
// import "../components/common.css";
import _ from 'lodash';
import utils from './utils';
// import printJS from 'print-js';




const DataTable_old = (props) => {

    const [value, setvalue] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [pageArray, setPageArray] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalBlocks, setTotalBlocks] = useState(0);
    const [activeblock, setActiveblock] = useState(0);
    const [filterData, setFilterData] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [isSelectAll, setSelectAll] = useState(false);
    const [selectedRow, setSelectedRow] = useState(-1);
    const [isChecked, setIsChecked] = useState(false);

    let type = props.extraButtonType;
    let deleteCallback = (item) => {        
        if(!!props.deleteCallback) {
            props.deleteCallback(item);
        }        
    }


    const loadData = (items) => {
        let sIndex = ((activePage - 1) * pageSize);
        let eIndex = Math.min(sIndex + pageSize - 1, items && items.length ? items.length - 1 : props.data.length - 1);
        let j;
        setStartIndex(sIndex);
        setEndIndex(eIndex);
        let dataItems = []
        for (j = sIndex; j <= eIndex; j++) {
            items && items.length ? dataItems.push(items[j]) : dataItems.push(props.data[j]);
        }
        return dataItems;
    }    

    const [tableData, setTableData] = useState([]);
    const [inquiryDataTableData, setInquiryDataTableData] = 
    useState({ data: [], columns: [], filterColumnName: [], hideHeader: true });


    const setSize = (e) => {
        setPageSize(parseInt(e.target.value));
    }

    // useEffect(() => {
    //     if (tableData.length > 0) {
    //         let page = _.divide(tableData.length, pageSize);
    //         setTotalPages(Math.ceil(page));
    //     }
    // }, [tableData])

    useEffect(() => {
        setFilterData([]);
        let page = _.divide(props.data.length, pageSize);
        let round = Math.ceil(page)
        setTotalPages(round);
        if (round == totalPages) {
            setPageArray(getPageArray());
            bindPageData();
        }

    }, [props.data])

    useEffect(() => {
        // if (!props.data.length) return;
        let page2 = _.divide(props.data.length, pageSize);
        setTotalPages(Math.ceil(page2));
        setActiveblock(1);
        setActivePage(1);

    }, [pageSize]);

    useEffect(() => {
        //if (!props.data.length) return;
        let page1 = _.divide(totalPages, 5);
        let blocks = Math.ceil(page1);
        setTotalBlocks(Math.ceil(blocks));
        if (blocks == totalBlocks) {
            setPageArray(getPageArray());
            bindPageData();
        }

    }, [totalPages]);

    useEffect(() => {
        //if (!props.data.length) return;
        setActiveblock(1);
        setPageArray(getPageArray());
        bindPageData();

    }, [totalBlocks]);

    useEffect(() => {
        // if (!props.data.length) return;
        setPageArray(getPageArray());
        bindPageData();
    }, [activeblock])

    useEffect(() => {
        //if (!props.data.length) return;

        let activePageBlock = _.ceil(_.divide(activePage, 5));
        setActiveblock(activePageBlock);
        bindPageData();
    }, [activePage]);

    useEffect(() => {
        if (!filterData.length) return;
        setPageArray(getPageArray());
        setActivePage(1);
        setTableData(loadData(filterData));

    }, [filterData]);

    const getPageArray = () => {
        let pageArray = [];
        let i;
        let startIndex = ((activeblock - 1) * 5) + 1;
        let endIndex = Math.min(startIndex + (5 - 1), totalPages);
        for (i = startIndex; i <= endIndex; i++) {
            pageArray.push(i);
        }

        return pageArray;

    }

    const bindPageData = () => {
        if (filterData.length > 0) {
            setTableData(loadData(filterData));
        } else {
            setTableData(loadData());
        }
    }

    const textChange = (e) => {
        setvalue(e.target.value);
        let items = [];
        props.filterColumnName.forEach(col => {
            let itm = props.data.filter(raw => raw[col] ? raw[col].toString().toUpperCase().includes(e.target.value.toUpperCase()) : false);
            items = _.union(itm, items);
        });
        if (items.length) {
            let page = _.divide(items.length, pageSize);
            setTotalPages(Math.ceil(page));
        }

        if (e.target.value.length > 0)
            setFilterData(items);
        else
            setFilterData(props.data);
        //setTableData(loadData(items));
        //setTableData(items);
    }

    // const printJson = () => {
    //     printJS({
    //         printable: !!filterData.length ? filterData : props.data,
    //         properties: _.map(props.columns, x => x.columnId).filter(y => y != "active"),
    //         type: 'json',
    //         documentTitle: ''
    //     });
    // }
    const [sortedColumnId, setsortedColumnId] = useState('');
    const sortdata = (columnId, order) => {
        var data = _.orderBy(!!filterData.length ? filterData : props.data, x => x[columnId], order);
        setFilterData(data);
        let page = _.divide(data.length, pageSize);
        setTotalPages(Math.ceil(page));
        setsortedColumnId(columnId + order);
    }

    const onchangeCheckBox =(e, item, type) => {        
        item.isChecked = e.target.checked;
        setIsChecked(!isChecked);
        props.editCallBack(item, type); 
    }

    // const selectAll = (e) => {                           
    //     let ids = !!filterData ? filterData.map(x => x.clientId) : props.data.map(x => x.clientId);
    //     if(!!filterData)
    //          filterData.forEach(x => x.isChecked = e.target.checked);
    //     else
    //       props.data.forEach(x => x.isChecked = e.target.checked);
          
    //     setIsChecked(!isChecked);
    //     setSelectAll(e.target.checked);
        
    //     props.editCallBack({ isChecked: e.target.checked }, "selectAll", ids);
    // }

    return (
        <div className="card">
            {/* <div className="col-lg-12 col-12"> */}
            {!props.hideHeader && <div className="card-header header-border">
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Page Size</label>
                            <select className="form-control" value={pageSize} onChange={(e) => setSize(e)}>
                                {/* <option value="5">5</option> */}
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="tableSearch">Search</label>
                            {/* <div className="  input-group"> */}
                            <input className="form-control" type="text" value={value} onChange={(e) => textChange(e)} name="tableSearch" id="dataTableSearch"></input>
                            {/* <div className="input-group-append">
                                    <button className="btn btn-secondary" type="button" >
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div> */}
                            {/* </div> */}
                        </div>
                    </div>
                    {/* <div className="col-md-1">
                        <button type="button" name="submit" value="submit" onClick={() => printJson()} style={{ float: "right", marginTop: "25px" }} className="btn btn-link">
                            <i className="fa fa-print" style={{ fontSize: "20px" }}></i>
                        </button>
                    </div> */}
                </div>
            </div>}
            <div className="card-body" style={{ width: "auto", overflowX: "auto" }}>
                {!!tableData.length ? <React.Fragment>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                                <colgroup>
                                {(!props.hideActions && (props.isEdit || props.isDelete || type === "client" || type === "checkbox")) && <col width="12%"></col>}
                                {props.columns.map((item, index) => <col key={index} width={item.width}                                 
                                ></col>)}
                                    
                                </colgroup>
                                <thead style={{ backgroundColor: "#3c8dbc", color: "white" }}>
                                    <tr>
                                        {((!!props.columns && !props.hideActions) && (props.isEdit || props.isDelete || type == "client" || type == "checkbox"))
                                        &&  <th style={{ verticalAlign: "middle" }}><label>Action</label>                                       
                                        </th>}

                                        {props.columns.map((item, index) => (
                                            <th key={index}>
                                                <label>{item.columnName}</label> <br></br>
                                                <button type='button' className={item.columnId + 'asc' == sortedColumnId ? "btn btn-link highlight" : "btn btn-link sortColor"}
                                                    style={{ padding: "0px 2px" }}
                                                    onClick={() => sortdata(item.columnId, 'asc')}
                                                >
                                                    <i className="fa fa-long-arrow-alt-up"></i>
                                                </button>
                                                <button type= 'button' className={item.columnId + 'desc' == sortedColumnId ? "btn btn-link highlight" : "btn btn-link sortColor"}
                                                    style={{ padding: "0px 2px" }}
                                                    onClick={() => sortdata(item.columnId, 'desc')}
                                                >
                                                    <i className="fa fa-long-arrow-alt-down"></i>
                                                </button>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item, index) => (
                                        <tr key={index} className={selectedRow === index ? "table-row selected" : "table-row"} onDoubleClick={() => { props.editCallBack(item); setSelectedRow(-1); }} onClick={() => setSelectedRow(index)}>
                                            {(!props.hideActions && (props.isEdit || props.isDelete || type === "client" || type === "checkbox" )) &&  <td>
                                                {type === "checkbox" && <input type="checkbox"  id={"handover" + index} key={"handover" + index} name={"handover" + index} 
                                                onChange={(e) => onchangeCheckBox(e, item, type)} style={{ margin: "0px 3px", verticalAlign:'middle' }} checked={item.isChecked}></input>}
                                              {props.isEdit &&  <button type='button' className="btn btn-link" style={{ padding: "0px 2px" }} onClick={() => props.editCallBack(item)}>
                                                    {/* <span className="tooltiptext">Edit</span> */}
                                                    <i className="fas fa-edit"></i>
                                                </button>}
                                                {type === "client" && <button className="btn btn-link" type='button'
                                                    style={{ padding: "0px 2px" }} onClick={() => props.editCallBack(item, type)}>
                                                    <i className="fas fa-user-tie"></i>
                                                </button>}
                                                {
                                                    type === "print" &&  <button type="button" onClick={() => props.editCallBack(item, type)} style={{ padding: "0px 2px" }} className="btn btn-link">
                                                    <i className="fa fa-print"></i>
                                                </button>
                                                }                                                
                                              {props.isDelete && <button type='button' style={{ padding: "0px 2px" }} onClick={() => deleteCallback(item)} className="btn btn-link"> <i className="fas fa-trash"></i></button>}
                                            </td>}
                                            {/* <td></td> */}

                                            {props.columns.map((col) => <td key={col.columnId} className={col.columnId.toUpperCase().includes("PRIORITY") ?
                                                item.priorityColor + ' font-weight-bold' :
                                                col.columnId.toUpperCase().includes("STATUS") ? item.statusColor + ' font-weight-bold' : ''}>
                                                {
                                                    col.columnId === "active" ? <input type="checkbox" checked={item[col.columnId]} disabled={true}></input> :
                                                        col.columnId.toUpperCase().includes('DATE') && !col.columnId.toUpperCase().includes('NAME') ? utils.formatDateAsDateFirst(item[col.columnId]) :
                                                            item[col.columnId]
                                                }
                                            </td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div id="datatable-pagination" className="row">
                        <div className="col-6 col-sm-6">
                            {props.data.length > 0 && <label style={{ fontWeight: "normal", paddingLeft: "10px", verticalAlign: "bottom" }}>
                                Showing {startIndex + 1} to {endIndex + 1}  Of {!!filterData.length ? filterData.length : props.data.length} Entries</label>}
                        </div>
                        <div className="col-6">
                            <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-end">
                                    <li className={activeblock == 1 ? "page-item disabled" : "page-item"}>
                                        <a className="page-link" onClick={() => setActiveblock(activeblock - 1)}>&#60;&#60;</a>
                                    </li>
                                    <li className={activePage == 1 ? "page-item disabled" : "page-item"}>
                                        <a className="page-link" onClick={() => setActivePage(activePage - 1)}>&#60;</a>
                                    </li>
                                    {pageArray.map(item =>
                                    (<li key={item} className="page-item">
                                        <a key={"link" + item} className={item == activePage ? "page-link active" : "page-link"} onClick={(e) => setActivePage(item)}>{item}
                                        </a>
                                    </li>
                                    ))}

                                    <li className={activePage == totalPages ? "page-item disabled" : "page-item"}>
                                        <a className="page-link" onClick={() => setActivePage(activePage + 1)}>&#62;</a>
                                    </li>
                                    <li className={activeblock == totalBlocks ? "page-item disabled" : "page-item"}>
                                        <a className="page-link" onClick={() => setActiveblock(activeblock + 1)}>&#62;&#62;</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div> </React.Fragment> : props.isLoading ? <div className='child-spinner'></div> : <div className="col-md-2" style={{ margin: "0px 10px", color: 'lightgray' }}><i>No record found</i></div>}
            </div>
        </div>


    );
}

export default DataTable_old;