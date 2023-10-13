import React, { useEffect, useState } from "react"

import DataTable from "./data-table";
import Modal from './modal-popup';
import utils from "./utils";
import { useNavigate, useLocation } from 'react-router-dom';

const SearchModal = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [dataTable, setDataTable] = useState({ data: [], columns: [], filterColumnName: [], isRowSelect: true, tableTitle: props?.modalTitle, isMultiSelect: props.isMultiSelect });
    let inputProps = props.inputProps;
    const [isShow, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState()
    const [value, SetValue] = useState('');
    const emptyCallback = (item) => {
        setShow(false);
        if (props?.initialDataCallback){
            setDataTable({ ...dataTable, searchValue: '' })
            props.initialDataCallback()
        }
        SetValue(props.isMultiSelect && item?.length ? item[0][inputProps.name] : item[inputProps.name]);
        if (inputProps.key || inputProps.key === 0) {
            inputProps.callback({ item: item, columns: inputProps.updateColumnNames }, inputProps?.name, inputProps?.key)
        }
        else {
            inputProps.callback({ item: item, columns: inputProps.updateColumnNames }, inputProps?.name)
        }
    }

    useEffect(() => {
        setSearchValue(props?.searchValue ? props?.searchValue : '')
    }, [props?.searchValue])

    useEffect(() => {
        if (props.data.data) {
            const col = utils.extractColumns(props.data?.data[0], props.columns)
            setDataTable({
                ...dataTable,
                data: props.data?.data, columns: col, filterColumnName: props.columns,
                editCallBack: emptyCallback,
                isEdit: false,
                isDelete: false,
                searchCallBack: props.searchCallBack,
                pageSizeArray: props.pageSizeArray,
                changePageSize: props.changePageSize,
                meta: props.data?.meta,
                getActivePageData: props.getActivePageData,
                searchValue: searchValue
            });
        } else if (props.data) {
            const col = utils.extractColumns(props.data[0], props.columns)
            setDataTable({
                ...dataTable,
                data: props.data, columns: col, filterColumnName: props.columns,
                editCallBack: emptyCallback,
                isEdit: false,
                isDelete: false,
            });
        }
    }, [props.data])

    useEffect(() => {
        SetValue(!!inputProps.itemVal ? inputProps.itemVal : '')
    }, [inputProps.itemVal])

    const handleClose = () => {
        setSearchValue('')
        if (props.initialDataCallback) {
            setDataTable({ ...dataTable, searchValue: '' })
            props.initialDataCallback()
        }
        setShow(false)
    }
    const addScheme = () => {
        navigate('/scheme', { state: location.pathname });
    }

    const showPopup = () => {
        if(props.clickCallback) {
            props.clickCallback(value);            
        }
        setShow(true);
    }
    
    return (
        <React.Fragment>
            <div className={`col-md-12 ${props.isSmall ? '' : 'mb-3'}`}>
                <div className="d-flex">
                    <span className="has-float-label w-100">
                        <input className={`${props.readonly && 'data-readonly'} ${props.isSmall && 'pad-half pad-right-5'} form-control no-background`} type="search" id={props.id} placeholder=" " value={value} name={props.name} required={props.isRequired} onChange={() => { }} />
                        {!props.isSmall && <label htmlFor={props.id}>{props.label}{(props.isRequired || props.showAsterisk) && <span style={{ color: 'red' }}>*</span>}</label>}
                        <span className="form-label search-icon-newuser">
                            <button className={`${props.isSmall && 'small-search-icon'} input-group-append search-icon-newuser btn btn-outline-secondary bg-white border-0 border ms-n5 mt-1`} disabled={props.disabled} type="button"
                                onClick={() => showPopup()}>
                                <i className="fa fa-search"></i>
                            </button>
                        </span>
                    </span>
                    {(props.isAddButton || props.isAddButtonWithCallback) &&
                        <div className="" style={{ display: "flex", alignItems: "center" }}>
                            <button className="add-item-button" disabled={props.disabled} type="button" style={{ fontSize: 10, margin: '0.6em' }}
                                onClick={() => { return props.isAddButton ? addScheme() : inputProps.callback({}, "button") }}>

                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    }
                </div>
            </div>
            <Modal show={isShow} modalTitle={props.modalTitle} handleClose={handleClose} maxWidth={'75%'}>
                <DataTable {...dataTable} />
            </Modal>
        </React.Fragment>

    )
}

export default SearchModal;