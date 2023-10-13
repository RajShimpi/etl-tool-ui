import React from "react";
import { Link } from 'react-router-dom';


const ComponentWrapper_old = (prop) => {
    let Component = prop.Component;
    let data = prop.data;
    let header = prop.header;
    // const [Component, setComponent] = useState(prop.Component);
    
    // const handleCallback = (data) => {
    //     setrenderData(data);
    // }

    return (
        <React.Fragment>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                               <b><span className="m-0 text-dark" style={{ fontSize: '15px'}}>{header}</span></b>
                            </div>
                            {/* <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                                    {header !== "Dashboard" && <li className="breadcrumb-item active">{header}</li>}
                                </ol>
                            </div> */}
                        </div>
                        
                    </div>
                    </div>
                <section className="content">
                    <div className="container-fluid">
                    { prop.isUserCanView ? <Component callback={prop.callback} data={data} permissions={prop.permissions} /> :
                    <div> Not Authorized to view page. Please assign view permission for respective page.</div>}
                    </div>
                </section>
            </div>
            {/* <footer className="main-footer">
                <strong>Copyright &copy; 2022-2023 <a href="https://www.synzeal.com/" target={"_blank"}>Synzeal Research Pvt Ltd </a>.</strong>
                                            All rights reserved.
                            <div className="float-right d-none d-sm-inline-block">
                                <b>Version</b> 1.0.0
                            </div>
            </footer> */}
            <footer class="footer">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-6">
                         © <a href="https://www.synzeal.com/" target={"_blank"}>Synzeal Research Pvt Ltd </a>.
                                            All rights reserved.
                           
                        </div>
                        <div class="col-sm-6">
                            {/* <div class="text-sm-end d-none d-sm-block">
                                Design by <a href="http://divineinfosys.com/" target="blank">Divine Infosys</a>
                            </div> */}
                            <div className="text-sm-end d-none d-sm-block">
                               Powered by Feeldevops <b>Version</b> 1.0.0
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- Control Sidebar --> */}
            {/* <aside className="control-sidebar control-sidebar-dark"> */}
                {/* <!-- Control sidebar content goes here --> */}
            {/* </aside> */}
            {/* <!-- /.control-sidebar --> */}
        </React.Fragment>
    );
}

export default ComponentWrapper_old;
