import { Button } from "bootstrap";
import { useState } from "react";
import CustomSelect from "../components/custom-select";

const WidgetPopup = (props) => {
    const [status, selectedStatus] = useState("");

    return (
    <div className="row">
        <div className="col-md-12">
            <label>Select Status for {props.label}</label>
            <CustomSelect   primaryKey={"primary key"}
                                        name={props.selectedItem}
                                        callback={selectedStatus}
                                        options={props.status_data}
                                        placeholder={"Select Status"}
                                        isSubmit={false}
                                        isRequired={true}
                                        
                                        itemVal={props.selectedValue} />
        </div>
        <div className="col-md-12">
            <button type="button" className="btn btn-secondary" style={{ float: 'right' }} onClick={(e) => { props.callback(status);   }}>Add</button>
        </div>
        
    </div>
    )
}

export default WidgetPopup;