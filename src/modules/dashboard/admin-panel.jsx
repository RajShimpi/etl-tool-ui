import { Link, Route, Routes } from "react-router-dom";
// import menus from "./menu";
// import routeData from "./menu";
import config from '../config/config.json';
import { useState } from "react";
import ProtectedRoute from '../user/protected-route'
import ComponentWrapper from "../components/component-wrapper";
import DashboardContent from "./dashboard-content";
import AddTransaction from "../transactions/add-transaction";
import { logOut } from "../user/auth";
import { TemplateMaster } from "../template/template-master";

const AdminPanel = () => {
    const [isActiveMenu, SetActiveMenu] = useState("Dashboard");
    const [isActiveSubMenu, SetSubMenuActive] = useState("");

    const searchClient = (e) => {
        e.preventDefault();
    }

    const employeeDetail = {
        employeeName : 'Nikunj Bhalodiya'
    }

    const settings = {
        companyName: ''
    }

    const callback =() => {

    }

    const menus = [{
        menuId: 1,
        liClass: 'nav-item has-treeview menu-open',
        menuIcon: 'nav-icon fas fa-tachometer-alt',
        menuName: 'Dashboard',
        // parentRoute: '/dashboard',
        hasChild: false
    }, 
    {
        menuId: 2,
        liClass: 'nav-item has-treeview menu-open',
        menuIcon: 'nav-icon fas fa-tachometer-alt',
        menuName: 'User Managment',
        hasChild: true,
        childItem: [{
            childMenuItem: 4,
            childhref: '/dashboard',
            itemName: 'Change Password'
        }]
    },
    {
        menuId: 3,
        liClass: 'nav-item has-treeview menu-open',
        menuIcon: 'nav-icon fa fa-book',
        menuName: 'Transaction Manager',
        hasChild: true,       
        childItem: [{
            childMenuItem: 5,
            childhref: '/add-transaction',
            itemName: 'Add Transaction'
        },{
            childMenuItem: 6,
            childhref: '/transactionlist',
            itemName: 'Transaction List'
        }]
    }
];

    const routeData  = [
        {
            routeTo: "/dashboard",
            header: "Dashboard",
            childComp: DashboardContent,
            data: {},
            permissions: true,
            isUserCanView: true
    
        },
        {
            routeTo: "/add-transaction",
            header: "Add Transaction",
            childComp: AddTransaction,
            data: {},
            permissions: true,
            isUserCanView: true
    
        },
        {
            routeTo: "/template-type",
            header: "Add/Update Template Type",
            childComp: TemplateMaster,
            data: {},
            permissions: true,
            isUserCanView: true
    
        },
    ]

    const SetMenu = (name) => {
        if (isActiveMenu !== name)
            SetSubMenuActive("");

        SetActiveMenu(name);
    }


    const logout = () => {
        logOut();        
    }
    
    return (
        <div className="wrapper">

        {/* <!-- Navbar --> */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{ backgroundColor: config.TOP_NAV_COLOR }}>
            {/* <!-- Left navbar links --> */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
                </li>
                {/* <li className="nav-item d-none d-sm-inline-block">
                    <a href="index3.html" className="nav-link">Home</a>
                </li> */}
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="#" className="nav-link" style={{ fontSize: '22px', textAlign:'center', color: 'aliceblue', paddingTop: "2px"}}>{settings.companyName}</a>
                </li>
                
            </ul>

            {/* <!-- SEARCH FORM --> */}
            <form className="form-inline ml-3 needs-validation" onSubmit={(e) => searchClient(e)} noValidate>
                <div className="input-group input-group-sm">
                    <input className="form-control form-control-navbar" required={true} type="search" placeholder="Search" aria-label="Search" 
                    ></input>
                    <div className="input-group-append">
                        <button className="btn btn-navbar" type="submit" >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>

            {/* <!-- Right navbar links --> */}
            <ul className="navbar-nav ml-auto   ">
                {/* <!-- Messages Dropdown Menu --> */}
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-comments"></i>
                        {/* <span className="badge badge-danger navbar-badge">3</span> */}
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <a href="#" className="dropdown-item">
                            {/* <!-- Message Start --> */}
                            {/* <div className="media">
                                <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle"></img>
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        Brad Diesel
                    <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                                    </h3>
                                    <p className="text-sm">Call me whenever you can...</p>
                                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                </div>
                            </div> */}
                            {/* <!-- Message End --> */}
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            {/* <!-- Message Start --> */}
                            {/* <div className="media">
                                <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3"></img>
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        John Pierce
                    <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                                    </h3>
                                    <p className="text-sm">I got your message bro</p>
                                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                </div>
                            </div> */}
                            {/* <!-- Message End --> */}
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            {/* <!-- Message Start --> */}
                            {/* <div className="media">
                                <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3"></img>
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        Nora Silvester
                    <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                                    </h3>
                                    <p className="text-sm">The subject goes here</p>
                                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                </div>
                            </div> */}
                            {/* <!-- Message End --> */}
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
                    </div>
                </li>
                {/* <!-- Notifications Dropdown Menu --> */}
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-bell"></i>
                        {/* <span className="badge badge-warning navbar-badge">15</span> */}
                    </a>
                    {/* <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span className="dropdown-item dropdown-header">15 Notifications</span>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-envelope mr-2"></i> 4 new messages
              <span className="float-right text-muted text-sm">3 mins</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-users mr-2"></i> 8 friend requests
              <span className="float-right text-muted text-sm">12 hours</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-file mr-2"></i> 3 new reports
              <span className="float-right text-muted text-sm">2 days</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                    </div> */}
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-slide="true" href="#">
                        <Link to="/" className="btn" style={{ padding: "0px" }} onClick={() => logout(true)}>
                            <i className="fa fa-power-off" />
                        </Link>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
                        <i className="fas fa-th-large"></i>
                    </a>
                </li>
            </ul>
        </nav>
        {/* <!-- /.navbar --> */}

        {/* <!-- Main Sidebar Container --> */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4" >
            {/* <!-- Brand Logo --> */}
            <a href="index3.html" className="brand-link">
                <img src="/etl-logo.jpg" alt="ETL" className="brand-image elevation-3"
                    ></img>
                <span className="brand-text font-weight-light">Abhyeti</span>
            </a>

            {/* <!-- Sidebar --> */}
            <div className="sidebar">
                {/* <!-- Sidebar user panel (optional) --> */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"></img>
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{employeeDetail.employeeName}</a>
                    </div>
                </div>

                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* loop for sidebar menu */}
                        {menus.map((item, index) => (
                            <li key={item.menuId} className={item.liClass}>
                               {item.parentRoute ? <Link to={item.parentRoute} style={{ cursor: "pointer" }} className={isActiveMenu === item.menuName ? "nav-link active" : "nav-link"} onClick={() => SetMenu(item.menuName)} >
                                    <i className={item.menuIcon}></i>
                                    <p>
                                        {item.menuName}
                                        {item.hasChild && <i className="right fas fa-angle-left"></i>}
                                    </p>
                                </Link> : 
                                <a style={{ cursor: "pointer" }} className={isActiveMenu === item.menuName ? "nav-link active" : "nav-link"} onClick={() => SetMenu(item.menuName)} >
                                    <i className={item.menuIcon}></i>
                                    <p>
                                        {item.menuName}
                                        {item.hasChild && <i className="right fas fa-angle-left"></i>}
                                    </p>
                                </a>}
                                {item.hasChild && <ul className="nav nav-treeview">
                                    {item.childItem.map((childItem, childIndex) => (
                                        <li key={childItem.childMenuItem} className="nav-item">
                                            <Link to={{ pathname: childItem.childhref}} style={{ cursor: "pointer" }} className={isActiveSubMenu === childItem.itemName ? "nav-link active" : "nav-link"} onClick={() => { SetSubMenuActive(childItem.itemName); SetActiveMenu(item.menuName); }}>
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>{childItem.itemName}</p>
                                            </Link>
                                        </li>))}
                                </ul>}
                            </li>
                        ))}
                        {/* <!-- Add icons to the links using the .nav-icon className
                 with font-awesome or any other icon font library --> */}

                        {/* <li className="nav-header">EXAMPLES</li>
                        <li className="nav-item">
                            <a href="pages/calendar.html" className="nav-link">
                                <i className="nav-icon far fa-calendar-alt"></i>
                                <p>
                                    Calendar
                  <span className="badge badge-info right">2</span>
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="pages/gallery.html" className="nav-link">
                                <i className="nav-icon far fa-image"></i>
                                <p>
                                    Gallery
                </p>
                            </a>
                        </li>
                        <li className="nav-item has-treeview">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-envelope"></i>
                                <p>
                                    Mailbox
                  <i className="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="pages/mailbox/mailbox.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Inbox</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/mailbox/compose.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Compose</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/mailbox/read-mail.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Read</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item has-treeview">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-book"></i>
                                <p>
                                    Pages
                  <i className="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="pages/examples/invoice.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Invoice</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/profile.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Profile</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/e_commerce.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>E-commerce</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/projects.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Projects</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/project_add.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Project Add</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/project_edit.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Project Edit</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/project_detail.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Project Detail</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/contacts.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Contacts</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item has-treeview">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-plus-square"></i>
                                <p>
                                    Extras
                  <i className="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="pages/examples/login.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Login</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/register.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Register</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/forgot-password.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Forgot Password</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/recover-password.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Recover Password</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/lockscreen.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Lockscreen</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/legacy-user-menu.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Legacy User Menu</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/language-menu.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Language Menu</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/404.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Error 404</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/500.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Error 500</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/pace.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Pace</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/blank.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Blank Page</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="starter.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Starter Page</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-header">MISCELLANEOUS</li>
                        <li className="nav-item">
                            <a href="https://adminlte.io/docs/3.0" className="nav-link">
                                <i className="nav-icon fas fa-file"></i>
                                <p>Documentation</p>
                            </a>
                        </li>
                        <li className="nav-header">MULTI LEVEL EXAMPLE</li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="fas fa-circle nav-icon"></i>
                                <p>Level 1</p>
                            </a>
                        </li>
                        <li className="nav-item has-treeview">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-circle"></i>
                                <p>
                                    Level 1
                  <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Level 2</p>
                                    </a>
                                </li>
                                <li className="nav-item has-treeview">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>
                                            Level 2
                      <i className="right fas fa-angle-left"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-dot-circle nav-icon"></i>
                                                <p>Level 3</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-dot-circle nav-icon"></i>
                                                <p>Level 3</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-dot-circle nav-icon"></i>
                                                <p>Level 3</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Level 2</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="fas fa-circle nav-icon"></i>
                                <p>Level 1</p>
                            </a>
                        </li>
                        <li className="nav-header">LABELS</li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-danger"></i>
                                <p className="text">Important</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-warning"></i>
                                <p>Warning</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-info"></i>
                                <p>Informational</p>
                            </a>
                        </li> */}
                    </ul>
                </nav>
                {/* <!-- /.sidebar-menu --> */}
            </div>
            {/* <!-- /.sidebar --> */}
        </aside>

        {/* <!-- Content Wrapper. Contains page content --> */}
        {/* <settingContext.Provider value={settings}> */}
            <Routes>
                {routeData.map((item, index) =>
                    <Route key={index} path={item.routeTo} element={
                        <ProtectedRoute>
                            <ComponentWrapper 
                            Component={item.childComp} 
                            header={item.header} 
                            data={item.data}
                            callback={callback} 
                            permissions={item.permissions} 
                            isUserCanView={item.isUserCanView} />
                        </ProtectedRoute>
                    }>
                        {/* <ComponentWrapper Component={item.childComp} header={item.header} data={item.data}
                    callback={callback} permissions={item.permissions} isUserCanView={item.isUserCanView} /> */}
                    {/* <item.childComp header={item.header} data={item.data}
                    callback={callback} permissions={item.permissions} isUserCanView={item.isUserCanView}></item.childComp> */}
                    </Route>
                )}                {/* {
                    isNavigate ? <Redirect to="/clientlist" /> : <Redirect to="/dashboard" />
                } */}
                
            </Routes>
        {/* </settingContext.Provider> */}
        {/* <!-- /.content-wrapper --> */}
        {/* {
                    isNavigate ? <Redirect to="/clientlist" /> : <Redirect to="/dashboard" />
        } */}
    </div>)
}

export default AdminPanel;