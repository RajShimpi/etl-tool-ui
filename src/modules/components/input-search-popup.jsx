import React, { useEffect, useState } from "react"

import DataTable from "./data-table";
import Modal from './modal-popup';
import utils from "./utils";

const SearchPopup = (props) => {
    let inputProps = props.inputProps;
    const [dataTable, setDataTable] = 
    useState({ data: [], columns: [], filterColumnName: [] });
    
    const [value, SetValue]= useState('');
    const [keys, setKeys] = useState([]);
    const [isShow, setShow] = useState(false);

    const emptyCallback = (item) => {
        setShow(false);
        SetValue(item[inputProps.name]);
        inputProps.callback({item: item, columns: inputProps.updateColumnNames }, "search-popup")
    }

    useEffect(() => {
        if (!!props.data.length && !keys.length) {
            setKeys(utils.extractColumns(props.data[0], props.columns));
            
        } else {
            setDataTable({
                data: props.data, columns: keys, filterColumnName: props.columns,
                editCallBack: emptyCallback, isEdit: false,
                isDelete: false
            });
        }
    }, [props.data, keys])

    // useEffect(() => {
    //     setDataTable({
    //         data: props.data, columns: keys, filterColumnName: props.columns,
    //         editCallBack: emptyCallback, isEdit: false,
    //         isDelete: false
    //     });
    // }, [])    

    const findData = (e) => {
        setShow(true);
    }

    

    const change = (e, callback) => {
        // if(inputProps.type === 'file') {
        //     SetValue(e.target.files[0]);
        //     callback(e, "file");
        // }
        // if(inputProps.type === "checkbox") {
        //     SetValue(e.target.checked);
        //     callback(e, "checkbox");
        // } else {
        // SetValue(e.target.value);
        // callback(e, "input");
        // }
    }

    const keyboardEvent = (e) => {
        if(e.code === "Backspace") {
            SetValue('');
            inputProps.callback({item: {}, columns: inputProps.updateColumnNames }, "search-popup");
        }
    }

    useEffect(() => { 
        if(inputProps.type === 'file') {
           if(!inputProps.itemVal) 
                SetValue('')
            return; 
        }      
            SetValue(!!inputProps.itemVal ? inputProps.itemVal : '');
            if(!inputProps.itemVal) {
                inputProps.callback({item: {}, columns: inputProps.updateColumnNames }, "search-popup");
            }
    }, [inputProps.itemVal])

    const customStyle = {        
        width: '77%',
        height: 'calc(2.25rem + 2px)',
        padding: '0.375rem 0.75rem',       
        fontWeight: '400',
        lineHeight: '1.5',
        color: '#495057',
        backgroundColor:'#fff',
        backgroundClip: 'padding-box',
        border: '1px solid #ced4da',
        borderRadius: '0.25rem',
        marginRight: '2px',
        boxShadow: 'inset 0 0 0 transparent',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'};

    return (
        <React.Fragment>
            <div style={{ display: "inline"}}>       
                <input style={customStyle} key={'search-popup' + inputProps.id} type={inputProps.type} id={inputProps.id}
                 name={inputProps.name} required={inputProps.isRequired} value={value}
                onChange={(e) => change(e, inputProps.callback)}  onKeyDown={(e) => keyboardEvent(e)}
                disabled={inputProps.update || inputProps.disabled} multiple={inputProps.isMultiple} />
                <button key={'btn-'+ inputProps.id} type="button" disabled={inputProps.disabled} onClick={(e) => findData(e)} className="btn btn-secondary" style ={{height: 'calc(2.25rem + 2px)'}}>Find</button>  
            </div>         
            <Modal show={isShow} modalTitle={"Search Popup"} handleClose={() => setShow(false)}>
                <DataTable {...dataTable} />
            </Modal>
        </React.Fragment>

    )
}

export default SearchPopup;