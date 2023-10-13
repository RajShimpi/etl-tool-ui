import { Button } from "bootstrap"
import { useEffect, useState } from "react"
import CustomInput from "./custom-input"
import CustomSelect from "./custom-select"
import SearchableInput from "./searchable-input"
import SelectReact from "./select-react"

const EditableTable = (props) => {

    const [data, setData] = useState([]);
    

    const enableRow = (pitem, index) => {
        pitem.disabled = false;
        pitem.isEdit = true;
        data[index] = pitem;
        setData((prevData) => [...prevData])
    }

    const cancel = (pitem, index) => {
        pitem.disabled = true;
        pitem.isEdit = false;
        data[index] = pitem;
        setData((prevData) => [...prevData])
    }

    const saveChange = (pitem) => {

    }

    const handleDelete = (serialNum) => {
        setData(data.filter(x => x.serialNum !== serialNum));
    }
    
    useEffect(() => {
        setData(props.data.map((x, index) => { return { ...x, serialNum: index + 1 }}))
    }, [props.data])

    // useEffect(() => {
    //     props.callback(data);
    // }, [data])

    

    const setValues = (e, name, key) => {
        if (!e) return;
        let updateRow = {};
        switch (name) {
            case "input":
                    updateRow = data[key];
                    updateRow[e.target.name] = e.target.value;
                    data[key] = updateRow;
                    //setData((prevData) => [...prevData]);
                    props.callback(data);                   
                break;
            case 'checkbox':
                    updateRow = data[key];
                    updateRow[e.target.name] = e.target.checked;
                    data[key] = updateRow;
                    //setData((prevData) => [...prevData]);
                    props.callback(data);
                break;
            case 'controlType':
                updateRow = data[key];
                updateRow[name] = e.value;
                data[key] = updateRow;
                //setData((prevData) => [...prevData]);
                props.callback(data);
                break;
            default:
                break;
        }
    }

    return (
        
        <>
   {!!data?.length && <table className="table table-bordered table-responsive table-centered table-nowrap mb-0">
        <colgroup>
            {props.columns.map((item, index) => 
            <col key={index} width={item.width} ></col>)}
        </colgroup>
        <thead>
              <tr>
              {props.columns.map((item, index) => 
              (
                <th key={index}>
                <span>{item.columnName}</span>
                </th>                                          
              ))}
              </tr>  
        </thead>
        <tbody>
            {data.map((pitem, pindex) => (
                <tr key={'tr' + pindex}>
                
                {props.controlDataFunc({ 
                    options: props.options,
                    update: props.update,
                    values: pitem,
                    disabled: pitem.disabled,
                    callback: setValues
                }).map((item, index) => (
                <td key={'td' + pindex + index}>
                   
                    {
                        item.id === 'none' && item.itemVal
                    }
                    {
                                    (item.control === "input" || item.control === "textarea") &&
                                    <CustomInput key={'custom-input' + index} 
                                        primaryKey={item.id + index} 
                                        callback={item.callback}                                          
                                        disabled={item.disabled}
                                        index={pindex}
                                        {...item} />
                                }
                                {/* {
                                    item.control === 'editor' && <Editor key={'editor' + item.index } callback={item.callback} disabled={item.disabled} {...item} />
                                } */}
                                {
                                    item.control === "searchable-input" && 
                                    <SearchableInput key={'searchable' + item.index} 
                                        callback={item.callback} 
                                        data={item.data}
                                        index={pindex}
                                        {...item} />
                                }
                                {
                                    item.control === "select" && <CustomSelect key={'custom-select' + index}
                                        primaryKey={item.id + index}
                                        name={item.name}
                                        label={item.label}
                                        index={pindex}
                                        callback={item.callback}
                                        options={item.options}
                                        placeholder={item.placeholder ? "Select " + item.placeholder : null}
                                        isSubmit={item.isSubmit}
                                        isRequired={item.isRequired}
                                        disabled={item.update || item.disabled}
                                        itemVal={item.itemVal}

                                    />
                                }
                                {
                                    item.control === "select-react" && <SelectReact key={'select-react' + index}
                                        primaryKey={item.id + index}
                                        name={item.name}
                                        label={item.label}
                                        callback={item.callback}
                                        index={pindex}
                                        options={item.options}
                                        placeholder={item.placeholder ? "Select " + item.placeholder : null}
                                        isSubmit={item.isSubmit}
                                        isRequired={item.isRequired}
                                        multiple={item.multiple}
                                        disabled={item.update || item.disabled}
                                        itemVal={item.itemVal}

                                    />
                                }            
                </td>))}
                {props.show &&
                (!pitem.isEdit  ? <td>
                            <button key={'btn-edit-' + pindex} type="button" className="btn btn-link" style={{ padding: "0px" }} onClick={() => enableRow(pitem, pindex)}><img src="/assets/images/login/btn-edit.svg" alt="" width={20} height={20}></img></button>
                            <button key={'btn-delete-' + pindex} type="button" className="btn btn-link" style={{ padding: "0px" }} onClick={() => handleDelete(pitem.serialNum)}><img src="/assets/images/login/btn-delete.svg"  width={20} height={20} alt=""></img></button>
                            {/* <a key={'btn-delete-' + item.id} style={{ padding: "1px" }} onClick={() => handleDelete(item.id)}><img src="/assets/images/login/btn-delete.svg" alt=""></img></a> */}
                        </td>
                            :
                            <td>
                                <button key={'btn-save-' + pindex} type="button" className="btn btn-link" style={{ padding: "0px" }} onClick={() => saveChange(pitem)}><img src="/assets/images/login/icons-save.png" alt="" width={20} height={20}></img></button>
                                <button key={'btn-cancel-' + pindex} type="button" className="btn btn-link" style={{ padding: "0px" }} onClick={() => cancel(pitem)}><img src="/assets/images/login/icons-cancel.png" alt="" width={20} height={20}></img></button>
                            </td>
                        )}
                {/* <td>

                {
                 <button type='button' className="btn btn-link" style={{ padding: "0px 2px" }} onClick={() => enableRow(pitem, pindex)} title="Edit">
                     <img src="/assets/images/login/btn-edit.svg" alt="" width={20} height={20}></img>
                 </button>}
                 <button type='button' style={{ padding: "0px 2px" }}  className="btn btn-link" title="Delete">                                                                       
                    <img src="/assets/images/login/btn-delete.svg" alt="" width={20} height={20}></img>
                 </button>
                </td> */}
                </tr>                
            ))}
            
        </tbody>
    </table>} </>)
}

export default EditableTable;