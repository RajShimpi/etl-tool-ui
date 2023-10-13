import React from "react";
import { Link } from "react-router-dom";

const WidgetTile = (props) => {
    const { data, type, status } = props;
    return (
        <div className="col-md-3">
            <div className="experiment">
                <div className="experiment-top d-flex justify-content-between">
                    <h6>{type}</h6>
                    <h6 className="green-exper">{status} </h6>
                    {/* <h6>16 hours ago</h6> */}
                </div>
                {/* <div className="experiment-title d-flex justify-content-between">
                    <span>
                        <i className="fas fa-book"></i> Synthesis of Gleevec
                    </span>
                    <i className="far fa-star"> </i>
                </div>
                <img className="experiment-img" src="/assets/images/experiments-chart.jpg" alt="" /> */}

                <div className="experiment-left-right d-flex justify-content-between align-items-center">
                {data.map((item, index) => (<>
                    <div className="corcreator-tab d-flex justify-content-between">
                        <p>Target Catalogue: <b><Link to={'/update-scheme/' + item.id}>{item.target_Catalogue}</Link></b></p>
                        <p>Created By: <b>{item?.user?.employeeCode}</b></p>
                        {/* <p>Project Name: <b>MM-008</b></p> */}
                    </div>
                    {/* <div className="experiment-right d-flex justify-content-end align-items-center">
                        <span className="me-2">
                            
                        <p>Created By: <b>{item?.user?.employeeCode}</b></p>
                        </span>
                        <span>
                            <img className="rounded-circle avatar-sm" src="assets/images/users/avatar-2.jpg" alt="" width="25px" />
                        </span>
                    </div> */}
                    </>))}
                </div>
                {/* <div className="corcreator-tab d-flex justify-content-between">
                    <span><b>Creator</b> Matt Mc Gowan</span>
                    <span><b>Name</b> synthesis of Gleevec</span>
                </div> */}
            </div>
        </div>
        // <div className="card-body">
        //     <h5 className="card-title">{status}</h5>

        //     <table className="table table-striped table-bordered">
        //         <thead>
        //             <tr>
        //                 <th>Target Catalog</th>
        //                 <th>Product Name</th>
        //                 <th>CASNo</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //     {data.map((item, index) => (
        //                     <tr key={item.target_Catalogue + index}>
        //                         <td key={"target_Catalogue" +  index}>
        //                             <Link to={'/update-scheme/' + item.id}>{item.target_Catalogue}</Link> 
        //                         </td>
        //                         <td key={"fileLink" + index}>
        //                            {item.product_name}</td>
        //                         <td key={"deleteFile" + index}>{item.CASNo}</td>
        //                     </tr>
        //                     // <p  className="card-text"> <Link to={'/update-scheme/' + item.id}>{item.target_Catalogue}</Link> | {item.product_name} | {item.CASNo}</p>
        //                 ))}
        //         </tbody>
        //     </table>
        // </div>
    )
}

export default WidgetTile;