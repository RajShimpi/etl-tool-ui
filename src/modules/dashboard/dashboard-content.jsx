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
import _ from "lodash";
import Flow from "./drag-drop/components/flow";
const DashboardContent = (props) => {
  
  const defaultStyle = {
    position: "absolute",
    width: "50%",
    height: "200px",
    color: "lightgray",
    overflow: "inherit",
    border: "2px solid lightgray",
  };


  
  return (
    <>    
      <Flow />
    </>
  );
};

export default DashboardContent;
