import React, { useState, useEffect } from 'react';
import FormCommon from './form-common';




const Filters = (props) => {
    // const [propData, setPropData] = useState(props.data);
    const buttonName = !!props.btnName ? props.btnName : 'Filter';
    const hideHeader = props.hideHeader;

    useEffect(() => {
        // setPropData(props.data);
    }, [props.data]);

    return (
        // if want to do by default close then add class => collapsed-card
         
        
        <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">

                                            <button className="accordion-button pad-half" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                {/* {update && <span>
                                                    <Link className="btn btn-link py-0" to='/experiment-list'
                                                        style={{ float: "left" }}>
                                                        <i className="fa fa-long-arrow-alt-left" style={{ fontSize: "20px", color: "white" }}></i>
                                                    </Link>
                                                </span>} */}
                                                <div className="info-details">
                                                    <span>Data Filter</span>                                                    
                                                </div>

                                              </button>
                                        </h2>

                                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body text-muted">
                <FormCommon data={props.data} />
            </div>
            <div className=" col-md-12 d-flex justify-content-end mt-3">
                <button type="button" className="btn mx-1 btn-add w-xs waves-effect waves-light" style={{ marginRight: "1%"}} onClick={props.onfilterButtonClick} >{buttonName}</button>
                <button type="button" className="btn btn-warning w-xs waves-effect waves-light" onClick={props.onResetButtonClick} >Reset</button>
            </div>
        </div></div></div></div></div></div></div>
    )
}

export default Filters;