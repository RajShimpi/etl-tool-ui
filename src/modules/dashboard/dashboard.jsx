import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import ComponentWrapper from "../components/component-wrapper";
import ProtectedRoute from "../user/protected-route";
import _ from "lodash";
import auth from "../user/auth";
import axios from "../services/axios";
import { routeData } from "./route-data";
import configContext from "./config-context";
import SearchFilter from "../components/search-filter";
// import SearchResult from "../components/search-result";
import NotificationsDropdown from "../components/notifications-dropdown";
import {
  useClientId,
  useProjectid,
} from "../../components/JobDataContext";
import PersonIcon from "@mui/icons-material/Person";
// import { io } from 'socket.io-client';

// export const socket = io(process.env.REACT_APP_WEB_SOCKET_SERVER_URL, {
//     reconnectionDelay: 1000, // Set the reconnection delay to 1 second
//     reconnectionAttempts: 3, // Limit the maximum reconnection attempts to 3
//     timeout: 5000, // Set the timeout value to 5 seconds
// });
import FolderIcon from "@mui/icons-material/Folder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Dashboard = () => {
  // const [isActiveMenu, SetActiveMenu] = useState("Dashboard");
  // const [isActiveSubMenu, SetSubMenuActive] = useState("");
  // const [isShow, setIsShow] = useState(false);
  // const [activeMenuId, setActiveMenuId] = useState([1]);
  const [menuData, setMenuData] = useState([]);
  const [role, setRoleData] = useState("");
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [configValues, setConfigValues] = useState({});
  // const [activeMenu, setActiveMenu] = useState(0);
  const [experimentIds, setExperimentIds] = useState(null);
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [finalData, setfinalData] = useState([]);
  const [clientName, setClientName] = useState([]);
  const { clientId } = useClientId();
  const { setClientId } = useClientId();
  const [project, setProject] = useState([]);
  const [selectedChildItem, setSelectedChildItem] = useState(false);
  const { setProjectID } = useProjectid();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {

    const client = auth.getStorageData("client");
   
    if (clientId === null && client.client_id) {
      setClientId(client.client_id);
    }

    if (clientId) {
      axios.getWithCallback(`clients/client/${clientId}`, (client) =>
        setClientName(client)
      );
    }

    axios.getWithCallback(
      "user/getUserById/" + auth.getStorageData("id"),
      (data) => {
        let roles = data.usersToRoles.map((x) => x.role_id);
        let roledata = data.usersToRoles
          .map((x) => x.role)
          .map((y) => y.displayname)
          .join(",");
        setRoleData(roledata);
        axios.postWithCallback(
          "user-menus/get",
          { roles: roles },
          (menus) => {
            setMenuData(menus);
          },
          null,
          null,
          false
        );
      }
    );

    return () => {};
  }, [clientId, setClientId]);

  // useEffect(() => {
  //   if (clientId) {
  //     // localStorage.setItem("clientId", clientId);
  //   }
  // }, [clientId]);

  // console.log("clientId:", clientId);
  // useEffect(() => {

  // socket.on('connect', () => {
  //     console.log(`=> CONNECTED (😃): %c${socket.id}`, 'color: #34c38f');
  // });

  // socket.on('error', (error) => {
  //     console.error('Socket error: ', error);
  // Handle the socket error on the UI
  // });

  // Clean up the event listener when the component unmounts
  // return () => {
  // socket.off('new-notification');
  // socket.off('new-conversation');
  // socket.on('disconnect', () => {
  //     console.log('%c=> DISCONNECTED (😴) ', 'color: blue');
  // })
  // socket.disconnect();
  // localStorage.removeItem('total_notifications');
  // }

  // }, []);

  const callback = (data, name) => {
    switch (name) {
      case "updateTransaction":
        // setTransactionData(data);
        break;
      default:
        break;
    }
  };
  
  const getMenusRoutes = () => {
    if (!menuData?.length) return [];
    //console.log(menuData);
    let dt = menuData.map((x) => x.menuRoute).filter((x) => x);
    let dt1 = menuData
      .reduce((x, y) => _.concat(x, y.childMenu), [])
      .filter((x) => x)
      .map((x) => x.href.toLowerCase());
    //console.log(_.concat(dt, dt1));
    let routes = _.concat(dt, dt1);
    //   let routeDt = routeData;
    //   routeDt.forEach(element => {
    //       if(!routes.includes(element.routeTo)) {
    //           element.isUserCanView = false;
    //       }
    //   });
    return routes;
  };

  const logout = () => {
    auth.logOut();
  };

  const changeScreenMode = (mode) => {
    if (mode) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullScreenMode(mode);
  };

  const splitIntoChunk = (arr, chunk) => {
    let tempArray = [];
    for (let i = 0; i < arr.length; i += chunk) {
      tempArray.push(arr.slice(i, i + chunk));
    }
    return tempArray;
  };

  useEffect(() => {
    const Clientid = auth.getStorageData("client");
    console.log("Clientid.id:",Clientid.id);
    if (Clientid.id) {
      axios.getWithCallback(
        `projects/client/${Clientid.id}`,
        (projectsData) => {
          setProject(projectsData);
        }
      );
    }
  }, []);

  const onhandelProject = (projectid) => {
    // auth.setAuthData(projectid);
    setProjectID(projectid);
  };

  return (
    // <div id="layout-wrapper" > data-layout-mode="layout-mode-light"
    <div id="layout-wrapper">
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div
              style={{
                color: "white",
                margin: "20px",
                fontWeight: "bold",
                fontSize: "15px",
                display: "flex",
              }}
            >
              <div>
                <PersonIcon fontSize="small" />
              </div>
              <div style={{ marginLeft: "5px", marginTop: "3px" }}>
                {clientName.name}
              </div>
            </div>
            <div className="navbar-brand-box">
              <Link to="/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  <img
                    src="/assets/images/companyLogo.png"
                    alt=""
                    height="40"
                  ></img>
                </span>
                <span className="logo-lg">
                  <img
                    src="/assets/images/companyLogo.png"
                    alt=""
                    height="40"
                  ></img>
                </span>
              </Link>
            </div>
            {/* <div className="app-search d-none d-lg-block">
                        <div className="dashboard-search">
                        <input className="form-control" type="text" id="dataTableSearch" name="tableSearch" placeholder='Search'></input>
                        </div>
                        </div> */}
            {/* <form className="app-search d-none d-lg-block">
                            <div className="position-relative" bis_skin_checked="1">
                                <input type="text" className="form-control" placeholder="Search..."></input>
                            </div>
                        </form> */}
            {/*<SearchFilter setExperimentIds={setExperimentIds} />*/}
            <SearchFilter
              setExperimentIds={setExperimentIds}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              finalData={finalData}
              setfinalData={setfinalData}
            />
            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
              data-bs-toggle="collapse"
              data-bs-target="#topnav-menu-content"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>
          </div>
          <div className="d-flex">
            <div className="topnav responsive-topnav">
              <nav className="navbar navbar-light navbar-expand-lg topnav-menu">
                <div
                  className="collapse navbar-collapse"
                  id="topnav-menu-content"
                >
                  <ul className="navbar-nav" style={{ textAlign: "left" }}>
                    {/* <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link"> {activeMenu == item.menuId && show ? "dropdown-menu show" : "dropdown-menu"}
                                            <i><img src="/assets/images/home-nav-icon.png" alt=""></img></i> Dashboard onClick={() => { setActiveMenu(item.menuId); setShow(!show) }}
                                        </Link>
                                    </li> */}
                    {menuData.map((item, index) => (
                      <li
                        key={item.menuId + "li"}
                        className="nav-item dropdown"
                      >
                        {item.menuName !== "Dashboard" && (
                          <a
                            key={item.menuId + "anchor"}
                            className="nav-link dropdown-toggle arrow-none"
                            id={item.menuName}
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ fontWeight: "bold" }}
                          >
                            <i
                              key={item.menuId + "i"}
                              className="uil-apps me-2"
                            ></i>
                            {item.menuName}
                            <div
                              key={item.menuId}
                              // className="arrow-down"
                            ></div>
                          </a>
                        )}
                        {item.hasChild &&
                          (!item.menuName.toLowerCase().includes("master") ? (
                            <div
                              key={item.menuId + "dropdown-div-menu"}
                              className="dropdown-menu"
                              aria-labelledby={item.menuName}
                            >
                              {item.childMenu.map((childItem, chidIndex) => (
                                <div
                                  key={childItem.childMenuItemId + "Link"}
                                  className="dropdown-item"
                                  onMouseEnter={() =>
                                    setSelectedChildItem(childItem)
                                  }
                                  // onMouseLeave={() => setSelectedChildItem(false)}
                                >
                                  {!item.menuName
                                    .toLowerCase()
                                    .includes("project") ? (
                                    <Link
                                      key={childItem.childMenuItemId + "Link"}
                                      className="dropdown-item"
                                      to={{ pathname: childItem.href }}
                                    >
                                      {childItem.itemName}
                                    </Link>
                                  ) : (
                                    <>
                                      <div style={{ cursor: "pointer" }}>
                                        {childItem.itemName}

                                        <ArrowForwardIosIcon
                                          style={{
                                            fontSize: "small",
                                            height: "25px",
                                            marginLeft: "20px",
                                          }}
                                        />
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}

                              {item.menuName
                                .toLowerCase()
                                .includes("project") &&
                                selectedChildItem && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: 0,
                                      left: "100%",
                                      minWidth: "200px",
                                      background: "#fff",
                                      cursor: "pointer",
                                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                      padding: "10px",
                                      zIndex: 1,
                                    }}
                                  >
                                    <div  onMouseLeave={() =>
                                        setSelectedChildItem(false)
                                      }>
                                    {project.map((item) => (
                                      
                                      <Link
                                     
                                        key={"maincomponent" + "Link"}
                                        className="dropdown-item"
                                        to={{ pathname: "maincomponent" }}
                                        onClick={() =>
                                          onhandelProject(item.id)
                                        }
                                      >
                                        <div
                                          // onMouseLeave={() =>
                                          //   setSelectedChildItem(false)
                                          // }
                                          // onClick={() =>
                                          //   onhandelProject(item.id)
                                          // }
                                          key={item.project_id}
                                          // style={{ marginLeft: "5px" }}
                                          style={{
                                            display: "flex",
                                            margin: "2px",
                                            marginRight: "5px",
                                          }}
                                        >
                                          <FolderIcon
                                            fontSize="small"
                                            style={{ marginTop: "3px" }}
                                          />
                                          <div
                                            // onMouseLeave={() =>
                                            //   setSelectedChildItem(false)
                                            // }
                                            // onClick={() => onhandelProject(item.id)}
                                            // key={item.project_id}
                                            style={{ marginLeft: "5px" }}
                                          >
                                            {item.project_name}
                                          </div>
                                        </div>
                                      </Link>
                                     
                                    ))}
                                     </div>
                                  </div>
                                )}
                            </div>
                          ) : (
                            <div
                              key={item.menuId + "mega-dropdown-menu"}
                              className="dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-xl"
                              aria-labelledby={item.menuName}
                            >
                              <div
                                key={item.menuId + "mega-dropdown-menu-row "}
                                className="row"
                              >
                                {splitIntoChunk(item.childMenu, 8).map(
                                  (child, childIn) => (
                                    <div
                                      key={"mega-dropdown-menu" + childIn}
                                      className="col-lg-4"
                                    >
                                      {child.map((childItem) => (
                                        <div
                                          key={
                                            childItem.childMenuItemId + "div"
                                          }
                                        >
                                          <Link
                                            key={
                                              childItem.childMenuItemId + "Link"
                                            }
                                            className="dropdown-item"
                                            to={{ pathname: childItem.href }}
                                          >
                                            {childItem.itemName}
                                            <div
                                              style={{ marginLeft: "5px" }}
                                            ></div>
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="uil-search"></i>
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      ></input>
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                data-bs-toggle="fullscreen"
                onClick={() => {
                  changeScreenMode(!fullScreenMode);
                }}
              >
                <i className="fas fa-expand-arrows-alt"></i>
              </button>
            </div>
            <NotificationsDropdown />
            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item waves-effect d-flex align-items-center"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {/* <img className="rounded-circle header-profile-user" src="/assets/images/users/avatar-2.jpg" alt="Header Avatar"></img> */}
                <Avatar
                  name={auth.getStorageData("fullName")}
                  size="45"
                  round={true}
                />
                <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
                  <div>
                    <div>{userFirstName}</div>
                  </div>{" "}
                  {auth.getStorageData("role")}
                  <div className="arrow-down"></div>
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <a className="dropdown-item" href="#">
                  <i className="uil uil-user-circle font-size-18 align-middle text-muted me-1"></i>{" "}
                  <span className="align-middle">View Profile</span>
                </a>
                <a className="dropdown-item d-block" href="#">
                  <i className="uil uil-cog font-size-18 align-middle me-1 text-muted"></i>{" "}
                  <span className="align-middle">Settings</span>{" "}
                  <span className="badge bg-soft-success rounded-pill mt-1 ms-2">
                    03
                  </span>
                </a>
                <Link className="dropdown-item" to="/change-password">
                  <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>{" "}
                  <span className="align-middle">Change Password</span>
                </Link>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => logout(true)}
                >
                  <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>{" "}
                  <span className="align-middle">Sign out</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <configContext.Provider value={configValues}>
        <Routes>
          {routeData(getMenusRoutes()).map((item, index) => (
            <Route
              key={index}
              path={item.routeTo}
              element={
                <ProtectedRoute>
                  <ComponentWrapper Component={item.childComp} {...item} />
                </ProtectedRoute>
              }
            ></Route>
          ))}
          {/*<Route path="/search-result" element={<SearchResult experimentIds={experimentIds} />} />*/}
          {/* <Route path="/search-result" element={<SearchResult experimentIds={experimentIds} searchQuery={searchQuery} setSearchQuery={setSearchQuery} finalData={finalData} setfinalData={setfinalData} />} /> */}
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </configContext.Provider>
    </div>
  );
};
export default Dashboard;
