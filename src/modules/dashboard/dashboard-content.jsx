import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import DataTable from "../components/data-table";
// import utils from "../components/utils";
// import config from "../config/config.json";
// import axios from "../services/axios";
// import auth from "../user/auth";
// import $ from "jquery";
// import DashboardMenu from "./dashboard-menu";
// import Modal from "../components/modal-popup";
// import WidgetPopup from "./widget-popup";
// import WidgetTile from "./widget-tile";
import LeftSidebar from "../../components/LeftSidebar";
import _ from "lodash";
import react from "react";
import MainComponent from "../../components/MainComponent";
import "./Dashboard-container.css"; 

const DashboardContent = (props) => {
  return (
    <div className="dashboard-container">
      <div className="left-sidebar">
        {/* <LeftSidebar /> */}
      </div>
      <div className="main-component">
        <MainComponent />
      </div>
      <div className="right-side">
      </div>
    </div>
  );
};

export default DashboardContent;
