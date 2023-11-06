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
import LeftSide from "../../components/LeftSide";
import _ from "lodash";
import Component from "../../components/RightSide";
import MainComponent from "../../components/MainComponent";
import Navbar from "../../components/Navbar";

const DashboardContent = (props) => {
  
  // const defaultStyle = {
  //   position: "absolute",
  //   width: "50%",
  //   height: "200px",
  //   color: "lightgray",
  //   overflow: "inherit",
  //   border: "2px solid lightgray",
  // };

  // const htmlContent = `<div class="w3-bar-block">
  // <a class="w3-button w3-bar-item ws-grey" target="_blank" href="tryit.asp?filename=tryhtml_head_none">A valid HTML document with no &lt;html&gt; &lt;body, and &lt;head&gt;</a><br>
  // <a class="w3-button w3-bar-item ws-grey w3-border-top" target="_blank" href="tryit.asp?filename=tryhtml_head_no_head">A valid HTML document with no &lt;head&gt; element</a>
  // <a class="w3-button w3-bar-item ws-grey w3-border-top" target="_blank" href="tryit.asp?filename=tryhtml_head_title">The &lt;title&gt; element defines the document title</a>
  // <a class="w3-button w3-bar-item ws-grey w3-border-top" target="_blank" href="tryit.asp?filename=tryhtml_head_style">The &lt;style&gt; element contains style information</a>
  // <a class="w3-button w3-bar-item ws-grey w3-border-top" target="_blank" href="tryit.asp?filename=tryhtml_head_link">The &lt;link&gt; element defines a relationship to an external resource</a>
  // <a class="w3-button w3-bar-item ws-grey w3-border-top" target="_blank" href="tryit.asp?filename=tryhtml_head_meta">The &lt;meta&gt; element defines special meta information</a>
  // <a class="w3-button w3-bar-item ws-grey w3-border-top" target="_blank" href="tryit.asp?filename=tryhtml_head_script">The &lt;script&gt; element defines client-side JavaScripts</a>
  // <a class="w3-button w3-bar-item ws-grey w3-border-top" target="_blank" href="tryit.asp?filename=tryhtml_head_base">The &lt;base&gt; element defines the base URL for all URLs</a>
  // </div>`
  
  return (
    <>    
    {/* <span dangerouslySetInnerHTML={{__html: htmlContent}} /> */}
    <Navbar/>
    <div className="" style={{display:"flex",flexDirection:"row"}}>
    <div><LeftSide/></div>
    <div><MainComponent/></div>
    <div><Component/></div>
    </div>
    </>
  )
};
export default DashboardContent;
