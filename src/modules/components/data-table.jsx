import React, { useEffect, useRef, useState } from 'react';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import ReactTimeAgo from 'react-time-ago'

// import "../components/common.css";
import _ from 'lodash';
import utils from './utils';

// import printJS from 'print-js';

const DataTable = (props) => {

    const [value, setvalue] = useState('');
    const [searchValue, setSearchValue] = useState("");
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
    const [selectedRowMulti, setSelectedRowMulti] = useState([]);
    const [multiSelectedItems, setMultiSelectedItems] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setvalue(props?.searchValue ? props.searchValue : '')
    }, [props?.searchValue])

    useEffect(
        () => {
            const getData =
                setTimeout(() => {
                    if (props.searchCallBack) {
                        props.searchCallBack(searchValue)
                    }
                }, 1000)
            return () => clearTimeout(getData);
        },
        [searchValue]
    )

    let type = props.extraButtonType;
    let deleteCallback = (item) => {
        if (!!props.deleteCallback) {
            props.deleteCallback(item);
        }
    }


    const loadData = (items) => {

        let sIndex = ((activePage - 1) * pageSize);
        let eIndex = 0
        if (props.meta) {
            eIndex = Math.min(sIndex + pageSize - 1, items && items.length ? (sIndex + items.length - 1) : props.data.length - 1);
        } else {
            eIndex = Math.min(sIndex + pageSize - 1, items && items?.length ? items.length - 1 : props.data?.length - 1);
        }

        let j;
        setStartIndex(sIndex);
        setEndIndex(eIndex);
        let dataItems = []
        if (props.meta) {
            for (j = 0; j <= Math.min(pageSize - 1, items && items.length && (items.length - 1)); j++) {
                items && items.length ? dataItems.push(items[j]) : dataItems.push(props.data[j]);
            }
        } else {
            for (j = sIndex; j <= eIndex; j++) {
                items && items.length ? dataItems.push(items[j]) : dataItems.push(props.data[j]);
            }
        }
        return dataItems;
    }

    const [inquiryDataTableData, setInquiryDataTableData] =
        useState({ data: [], columns: [], filterColumnName: [], hideHeader: true });


    const setSize = (e) => {
        setPageSize(parseInt(e.target.value));
    }

    const changePageSize = (e) => {
        props.changePageSize(parseInt(e.target.value))
        setPageSize(parseInt(e.target.value));
    }

    useEffect(() => {
        TimeAgo.addDefaultLocale(en);
    },[])

    useEffect(() => {

        TimeAgo.addLocale(ru)
        if (props?.meta?.itemsPerPage) {
            setPageSize(props.meta.itemsPerPage)
        }
        if (props.meta?.pageCount) {
            setTotalPages(props.meta?.pageCount)
        }
        if (props.data?.length) {
            setFilterData(props.data);
        } else {
            setFilterData([]);
        }
        let page = _.divide(props.data?.length, props?.meta?.itemsPerPage ? props?.meta?.itemsPerPage : pageSize);
        let round = Math.ceil(page)
        setTotalPages(round);
        if (round == totalPages) {
            setPageArray(getPageArray());
            bindPageData();
        }

    }, [props.data, props.meta?.pageCount, props?.pageSizeArray])

    useEffect(() => {
        // if (!props.data.length) return;
        let page2 = _.divide(props.data.length, pageSize);
        setTotalPages(Math.ceil(page2));
        setActiveblock(1);
        setActivePage(props?.meta?.page ? props?.meta?.page : 1);

    }, [pageSize]);

    useEffect(() => {
        //if (!props.data.length) return;
        let page1 = _.divide(props?.meta?.pageCount ? props?.meta?.pageCount : totalPages, 5);
        let blocks = Math.ceil(page1);
        setTotalBlocks(Math.ceil(blocks));
        if (blocks == totalBlocks) {
            setPageArray(getPageArray());
            bindPageData();
        }

    }, [totalPages, props?.meta?.pageCount]);

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
        if (!filterData.length) {
            setTableData(filterData);
            return;
        }
        setPageArray(getPageArray());
        setActivePage(props?.meta?.page ? props?.meta?.page : 1);
        setTableData(loadData(filterData));
    }, [filterData]);

    const getPageArray = () => {
        let pageArray = [];
        let i;
        let startIndex = ((activeblock - 1) * 5) + 1;
        let endIndex = Math.min(startIndex + (5 - 1), props?.meta?.pageCount ? props?.meta?.pageCount : totalPages);
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
        if (props.searchCallBack) {
            setSearchValue(e.target.value)
        } else {
            let items = [];
            props.filterColumnName.forEach(col => {
                let itm = props.data.filter(raw => raw[col] ? raw[col].toString().toUpperCase().includes(e.target.value.toUpperCase()) : false);
                items = _.union(itm, items);
            });
            if (items.length) {
                let page = _.divide(items.length, pageSize);
                setTotalPages(Math.ceil(page));
            }

            if (e.target.value.length > 0) {
                setFilterData(items);
            }
            else
                setFilterData(props.data);
        }
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

    const onchangeCheckBox = (e, item, type) => {
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

    const getActivePageData = (item) => {
        props.getActivePageData(item)
        setActivePage(item)
    }

    const getValue = (item, columnId) => {
        let columns = columnId.split('.');
        if (columns?.length == 2) {
            if(item[columns[0]]) {
            if (Array.isArray(item[columns[0]]))
                return item[columns[0]].map(x => x[columns[1]]).join()
            else
                return item[columns[0]][columns[1]];
            }
        }
        if (columns?.length == 3) {
            if(item[columns[0]]) {
                if (Array.isArray(item[columns[0]]))
                    return item[columns[0]].map(x => x[columns[1]][columns[2]]).join();
                else
                    return item[columns[0]][columns[1]][columns[2]];
            }
        }
        if (columns?.length == 4) {
            if(item[columns[0]]) {
            if (Array.isArray(item[columns[0]]))
                return item[columns[0]].map(x => x[columns[1]][columns[2]][columns[3]]).join();
            else
                return item[columns[0]][columns[1]][columns[2]][columns[3]];
            }
        }
        return '';
    }

    const multiSelectCallback = () => {
        props.editCallBack(multiSelectedItems);
            setSelectedRowMulti([]);
            setMultiSelectedItems([]);
    }

    const doubleClick = (item) => {
            if(props.isMultiSelect) {
                // props.editCallBack(multiSelectedItems);
                // setSelectedRowMulti([]);
                // setMultiSelectedItems([]);
            }
            else {
                if (props?.editCallBack)
                    props.editCallBack(item);
                setSelectedRow(-1);
            }
    }

    const singleClick = (index, item) => {
        if(props.isMultiSelect) {
            let it = multiSelectedItems.find(x => x.id  === item.id);
            if(!it) {
                setSelectedRowMulti((prevState) => [...prevState, index]);
                setMultiSelectedItems((prevState) => [...prevState, {...item}])
            } else {
                setSelectedRowMulti(selectedRowMulti.filter(x => x !== index));
                setMultiSelectedItems(multiSelectedItems.filter(x => x.id !== item.id));
            }
        }
        else {
            setSelectedRow(index);
        }
    }

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    {/* <div className="col-lg-12 col-12"> */}
                    <div className="accordion" id={"common-form-dt"}>
                        <div className="accordion-item">
                            {/* <div className="accordion-header d-flex justify-content-between" id="headingTwo"> */}
                            <div className='row xyz'>
                                <div className='col-6 col-lg-6 .col-md-6'>
                                    <div className='row'>
                                        <div className='table-h2 col-6 col-lg-6 .col-md-6  d-flex align-items-center'>{`${props.tableTitle ? props.tableTitle : 'Master Table Data'}`}</div>
                                        <div className='col-6 col-6 col-lg-6 .col-md-6  d-flex justify-content-start'>
                                            {/* <span className="has-float-label"> */}
                                            <div className='page-size-label'>Page Size:</div>
                                            {/* <select className="form-control page-size-select" value={pageSize} onChange={(e) => setSize(e)}> */}
                                            {props.pageSizeArray
                                                ?
                                                <select className="form-control page-size-select no-validate" value={pageSize} onChange={(e) => changePageSize(e)}>
                                                    {props.pageSizeArray.map(element => <option key={element.value} value={element.value}>{element.value}</option>)}
                                                </select>
                                                :
                                                <select className="form-control page-size-select no-validate" value={pageSize} onChange={(e) => setSize(e)}>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                </select>}

                                            {/* </span> */}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6 d-flex justify-content-end'>
                                    {props.isMultiSelect && <div>
                                            <button type="button" className='btn bg-light text-dark' style={{ marginTop: '5px'}}  onClick={(e) => multiSelectCallback(e)} >Select</button>
                                        </div> }
                                    {/* <span className="has-float-label"> */}
                                    &nbsp;
                                    <input className="form-control no-validate" type="text" value={value} onChange={(e) => textChange(e)} name="tableSearch" id="dataTableSearch" placeholder='Search'></input>
                                    {/* <label for="dataTableSearch">Search</label> */}
                                    {/* </span> */}
                                </div>
                                {/* <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Master Table Data
                        </button> */}
                            </div>
                            {/* <div className='form-group'>
                        <span className="has-float-label">
                            <input className="form-control" type="text" value={value} onChange={(e) => textChange(e)} name="tableSearch" id="dataTableSearch" placeholder=' '></input>
                            <label for="dataTableSearch">Search</label>
                        </span>
                    </div> */}
                            <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body ">
                                    {/* {!props.hideHeader &&
                                <div className="card-header">

                                    <div className="row">
                                        <div className="col-md-3">
                                            <span className="has-float-label">
                                                <label>Page Size</label>
                                                <select className="form-control" value={pageSize} onChange={(e) => setSize(e)}>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                </select>
                                            </span>
                                        </div>
                                        <div className="col-md-5">

                                        </div>
                                        <div className="col-md-4">
                                            <div className='form-group'>
                                                <span className="has-float-label">
                                                    <input className="form-control" type="text" value={value} onChange={(e) => textChange(e)} name="tableSearch" id="dataTableSearch" placeholder=' '></input>
                                                    <label htmlFor="dataTableSearch">Search</label>
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>} */}
                                    {/* <div className="col-md-1">
                        <button type="button" name="submit" value="submit" onClick={() => printJson()} style={{ float: "right", marginTop: "25px" }} className="btn btn-link">
                            <i className="fa fa-print" style={{ fontSize: "20px" }}></i>
                        </button>
                    </div> */}
                                    <div className="card-body " >
                                        {!!tableData.length ? <React.Fragment>
                                            <div className="row">
                                                <div className={`col-lg-12 table-responsive table-large-size`}>
                                                    <table className="table table-striped table-bordered dt-responsive">
                                                        <colgroup>
                                                            {(!props.hideActions && (props.isEdit || props.isDelete || type === "client" || type === "checkbox")) && <col width="8%"></col>}
                                                            {props.columns.map((item, index) => <col key={index} width={item.width}
                                                            ></col>)}

                                                        </colgroup>
                                                        <thead style={{ backgroundColor: "#3c8dbc", color: "white" }}>
                                                            <tr>
                                                                {((!!props.columns && !props.hideActions) && (props.isEdit || props.isDelete || type == "client" || type == "checkbox"))
                                                                    && <th style={{ verticalAlign: "middle" }}><span>Action</span>
                                                                    </th>}
                                                                {props.columns.map((item, index) => (
                                                                    <th key={index}>
                                                                        <span>{item.columnName}</span>
                                                                        <button type='button' className={item.columnId + 'asc' == sortedColumnId ? "btn btn-link highlight" : "btn btn-link sortColor"}
                                                                            style={{ padding: "0px 2px" }}
                                                                            onClick={() => sortdata(item.columnId, 'asc')}
                                                                        >
                                                                            <i className="fa fa-long-arrow-alt-up"></i>
                                                                        </button>
                                                                        <button type='button' className={item.columnId + 'desc' == sortedColumnId ? "btn btn-link highlight" : "btn btn-link sortColor"}
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
                                                                <tr key={index} className={`${selectedRow === index || selectedRowMulti.includes(index) ? "table-row selected" : "table-row"} ${props.isRowSelect ? 'cursor-pointer data-table-row-hover' : ''}`} onDoubleClick={() => doubleClick(item)} onClick={() => singleClick(index, item)}>
                                                                    {(!props.hideActions && (props.isEdit || props.isDelete || type === "client" || type === "checkbox")) &&
                                                                        <td>
                                                                            {type === "checkbox" && <input type="checkbox" id={"handover" + index} key={"handover" + index} name={"handover" + index}
                                                                                onChange={(e) => onchangeCheckBox(e, item, type)} style={{ margin: "0px 3px", verticalAlign: 'middle' }} checked={item.isChecked}></input>}
                                                                            {props.isEdit && <button type='button' className="btn btn-link" style={{ padding: "0px 2px" }} onClick={() => props.editCallBack(item)} title="Edit">
                                                                                {/* <span className="tooltiptext">Edit</span> */}
                                                                                {/* <i className="fas fa-edit"></i> */}
                                                                                <img src="/assets/images/login/btn-edit.svg" alt="" width={20} height={20}></img>
                                                                            </button>}
                                                                            {type === "client" && <button className="btn btn-link" type='button' title="Edit"
                                                                                style={{ padding: "0px 2px" }} onClick={() => props.editCallBack(item, type)}>
                                                                                <i className="fas fa-user-tie"></i>
                                                                            </button>}
                                                                            {
                                                                                type === "print" && <button type="button" title="Edit" onClick={() => props.editCallBack(item, type)} style={{ padding: "0px 2px" }} className="btn btn-link">
                                                                                    <i className="fa fa-print"></i>
                                                                                </button>
                                                                            }
                                                                            {props.isDelete && <button type='button' style={{ padding: "0px 2px" }} onClick={() => deleteCallback(item)} className="btn btn-link" title="Delete">
                                                                                {/* <i className="fas fa-trash"></i> */}
                                                                                <img src="/assets/images/login/btn-delete.svg" alt="" width={20} height={20}></img>
                                                                            </button>}
                                                                        </td>}
                                                                    {/* <td></td> */}
                                                                    {props?.columns.map((col) => (<td key={col?.columnId}
                                                                        title={String(item[col?.columnId])}
                                                                        className={col?.columnId?.toUpperCase().includes("PRIORITY") ?
                                                                            item.priorityColor + ' font-weight-bold ' :
                                                                            col?.columnId.toUpperCase().includes("STATUS") ? item.statusColor + ' font-weight-bold' : 'text-truncate'}
                                                                    >
                                                                        {
                                                                            col?.columnId.includes("Has") || ["isInventoryItem", "isActive", "solvent", "modifier", "sprayAgent", "active","required"].includes(col?.columnId)
                                                                                ? <input type="checkbox" checked={item[col.columnId]} disabled={true}></input>
                                                                                : col?.columnId.toUpperCase().includes('DATETIME') && !col?.columnId.toUpperCase().includes('NAME')
                                                                                    ? <ReactTimeAgo date={item[col.columnId]} locale="en-US"/>
                                                                                    : col?.columnId.toUpperCase().includes('DATE') && !col?.columnId.toUpperCase().includes('NAME') && !col?.columnId.toUpperCase().includes('UPDATE')
                                                                                        && !col?.columnId.toUpperCase().includes('PODATE')
                                                                                        ? <ReactTimeAgo date={item[col.columnId]} locale="en-US"/>
                                                                                        : col?.columnId.includes('.') ? getValue(item, col?.columnId) : item[col?.columnId] === null ? 'NA' : typeof item[col?.columnId] == 'object' ? JSON.stringify(item[col?.columnId]) : (props.columns.length < 5 ?
                                                                                            (item[col?.columnId]) :
                                                                                            (item[col?.columnId].length > 25 ?
                                                                                                item[col?.columnId].slice(0, 25) + " ..."
                                                                                                : item[col?.columnId])
                                                                                        )
                                                                                        }
                                                                    </td>)
                                                                    )}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div id="datatable-pagination" className="row">
                                                <div className="col-6 col-sm-6">
                                                    {props.data.length > 0 && <label style={{ fontWeight: "normal", paddingLeft: "10px", verticalAlign: "bottom" }}>
                                                        Showing {startIndex + 1} to {endIndex + 1}  Of {props?.meta?.itemCount ? props?.meta?.itemCount : !!filterData.length ? filterData.length : props.data.length} Entries</label>}
                                                </div>
                                                <div className="col-6">
                                                    <nav aria-label="Page navigation">
                                                        <ul className="pagination justify-content-end">
                                                            <li className={activeblock == 1 ? "page-item disabled" : "page-item cursor-pointer"}>
                                                                <a className="page-link" onClick={() => setActiveblock(activeblock - 1)}>&#60;&#60;</a>
                                                            </li>
                                                            <li className={activePage == 1 ? "page-item disabled" : "page-item cursor-pointer"}>
                                                                {props?.meta
                                                                    ? <a className="page-link" onClick={() => getActivePageData(activePage - 1)}>&#60;</a>
                                                                    : <a className="page-link" onClick={() => setActivePage(activePage - 1)}>&#60;</a>}

                                                            </li>
                                                            {pageArray.map(item =>
                                                            (<li key={item} className="page-item cursor-pointer">
                                                                {props.meta
                                                                    ? <a key={"link" + item} className={item == activePage ? "page-link active" : "page-link"} onClick={(e) => getActivePageData(item)}>{item}
                                                                    </a>
                                                                    : <a key={"link" + item} className={item == activePage ? "page-link active" : "page-link"} onClick={(e) => setActivePage(item)}>{item}
                                                                    </a>}
                                                            </li>
                                                            ))}
                                                            <li className={activePage == (props?.meta?.pageCount ? props.meta.pageCount : totalPages) ? "page-item disabled" : "page-item cursor-pointer"}>
                                                                {props.meta
                                                                    ? <a className="page-link" onClick={() => getActivePageData(activePage + 1)}>&#62;</a>
                                                                    : <a className="page-link" onClick={() => setActivePage(activePage + 1)}>&#62;</a>}
                                                            </li>
                                                            <li className={activeblock == totalBlocks ? "page-item disabled" : "page-item cursor-pointer"}>
                                                                <a className="page-link" onClick={() => setActiveblock(activeblock + 1)}>&#62;&#62;</a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div> </React.Fragment> : props.isLoading ? <div className='child-spinner'></div> : <div className="col-md-2" style={{ margin: "0px 10px", color: 'lightgray' }}><i>No record found</i></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >


    );

}

export default DataTable;