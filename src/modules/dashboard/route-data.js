
import { Branch } from "../hrms/branch";
import ChangePassword from "../user/change-password";
import DashboardContent from "./dashboard-content";
// import Dashboard from "./dashboard";
import { Department } from "../hrms/department";
import { Employees } from "../hrms/employee";



import RegisterUser from "../user/register-user";
import { Roles } from "../user/roles";
import AddMenu from "../user/add-menu";
import { DashboardBuilder } from "./dashboard-builder";
import UserMaster from "../masters/user-master";
import ResetPassword from "../user/reset-password";
import ProjecStructure from "../../components/ProjectStrucure/ProjectStructure";
import ComponetTool from "../../components/ComponentTool/ComponetTool";
import MainComponent from "../../components/MainComponent";
import Photo from "../../components/Photo";
import Client from "../masters/client";
import Project from "../masters/project";


export const routeConstant = {
  dashboard: "/dashboard",
  department: "/department",
  branch: "/branch",
  roles: "/roles",
  employees: "/employees",
  registerUser: "/register-user",
  changePassword: "/change-password",
  addMenu: "/add-menu",
  dashboardBuilder: "/dashboard-builder",
  userMaster: "/user-master",
  resetPassword: "/reset-password",
  projectstructure: "/projectstructure",
  componettool: "/componettool",
  maincomponent: "/maincomponent",
  photo: "/photo",
  client:"/client",
  project:"/project"

};
export const routeData = (routes) => [
  {
    routeTo: routeConstant.dashboard,
    header: "Dashboard",
    childComp: DashboardContent,
    data: {},
    permissions: true,
    isUserCanView: true, //routes.includes(routeConstant.dashboard)
  },
  {
    routeTo: routeConstant.roles,
    header: "Add/Update Roles",
    childComp: Roles,
    data: {},
    permissions: true,
    isUserCanView: true,
  },
  {
    routeTo: routeConstant.registerUser,
    header: "Register User",
    childComp: RegisterUser,
    data: {},
    permissions: true,
    isUserCanView: routes.includes(routeConstant.registerUser),
  },
  {
    routeTo: routeConstant.changePassword,
    header: "Change Password",
    childComp: ChangePassword,
    data: {},
    permissions: true,
    isUserCanView: true,
  },

  {
    routeTo: routeConstant.addMenu,
    header: "Add Menu",
    childComp: AddMenu,
    data: {},
    permissions: true,
    isUserCanView: true,
  },

  {
    routeTo: routeConstant.dashboardBuilder,
    header: "Dashboard Builder",
    childComp: DashboardBuilder,
    data: {},
    permissions: true,
    isUserCanView: routes.includes(routeConstant.dashboardBuilder),
  },

  {
    routeTo: routeConstant.userMaster,
    header: "User Master",
    childComp: UserMaster,
    data: {},
    permissions: true,
    isUserCanView: routes.includes(routeConstant.userMaster),
  },

  {
    routeTo: routeConstant.resetPassword,
    header: "Reset Password",
    childComp: ResetPassword,
    data: {},
    permissions: true,
    isUserCanView: routes.includes(routeConstant.resetPassword),
  },
  {
    routeTo: routeConstant.projectstructure, // ProjecStructure route
    header: "",
    childComp: ProjecStructure,
    data: {},
    permissions: true,
    isUserCanView: true,
  },
  {
    routeTo: routeConstant.componettool, // ComponetTool route
    header: "",
    childComp: ComponetTool,
    data: {},
    permissions: true,
    isUserCanView: true,
  },
  {
    routeTo: routeConstant.maincomponent, // Main Component route
    header: "",
    childComp: MainComponent,
    data: {},
    permissions: true,
    isUserCanView: true,
  },
  {
    routeTo: routeConstant.photo, // photo route
    header: "",
    childComp: Photo,
    data: {},
    permissions: true,
    isUserCanView: true,
  },
  {
    routeTo: routeConstant.client, // photo route
    header: "",
    childComp: Client,
    data: {},
    permissions: true,
    isUserCanView: true,
  },
  {
    routeTo: routeConstant.project, // photo route
    header: "",
    childComp: Project,
    data: {},
    permissions: true,
    isUserCanView: true,
  }
];
