import { Link } from "react-router-dom";


const ComponentWrapper = (props) => {
    let Component = props.Component;
    let data = props.data;
    let header = props.header;
   return( <>
   
   <div className="main-content" style={{ overflow:'inherit'}}>   
        <div className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                            <h4 className="mb-0">{header}</h4>

                            {header !== "Dashboard" && <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                                    {!!props.breadcrumb?.length && props.breadcrumb.map((item, index) => (
                                        <li key={item.title} className="breadcrumb-item"><i className="fas fa-chevron-right"></i>&nbsp;<Link key={item.title + index} to={item.route}>{item.title}</Link></li>
                                    ))}
                                    {header !== "Dashboard" && <li className="breadcrumb-item active"><i className="fas fa-chevron-right"></i>&nbsp;{header}</li>}
                                </ol>
                            </div>}
                        </div>
                    </div>
                </div>  
            </div>
            <div className="container-fluid">
            { props.isUserCanView ? <Component callback={props.callback} data={data} permissions={props.permissions} /> :
                    <div> Not Authorized to view page. Please assign view permission for respective page.</div>}     
            </div>
        </div>
    </div>
    <footer className="footer">
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-6">
             © <a href="https://www.synzeal.com/" rel="noreferrer" target={"_blank"}>Synzeal Research Pvt Ltd </a>.
                                All rights reserved.
               
            </div>
            <div className="col-sm-6">
                {/* <div className="text-sm-end d-none d-sm-block">
                    Design by <a href="http://divineinfosys.com/" target="blank">Divine Infosys</a>
                </div> */}
                    <div className="text-sm-end d-none d-sm-block">
                        Powered by Feeldevops <b>Version</b> 1.0.0
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </>)
}

export default ComponentWrapper;