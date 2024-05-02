
// import { Branch } from "../hrms/branch";
import ChangePassword from "../user/change-password";
import DashboardContent from "./dashboard-content";
// import Dashboard from "./dashboard";
// import { Department } from "../hrms/department";
// import { Employees } from "../hrms/employee";

import RegisterUser from "../user/register-user";
import { Roles } from "../user/roles";
import AddMenu from "../user/add-menu";
import { DashboardBuilder } from "./dashboard-builder";
import UserMaster from "../masters/user-master";
import ResetPassword from "../user/reset-password";
import MainComponent from "../../components/MainComponent";
import Client from "../masters/client";
import Project from "../masters/project";
import ProjectFile from "../masters/project-file";
import StepType from "../masters/steptype";
import TypeConfigMaster from "../masters/type-config-master";
import Parameter from "../masters/parameter";
import { SystemConfig } from "../masters/system-config";
import UserManagement from "../masters/user-management";
import StepTypeParameter from "../masters/step-type-parameter";
import JobSchedule from "../masters/job-schedule";
import MetabaseComponent from "../metabase/metabaseEmbed";
import Client_Dashboard from "../masters/client_dashboard";

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
  maincomponent: "/maincomponent",
  client: "/client",
  project: "/project",
  projectfile: "/projectfile",
  step: "/step",
  typeconfigmaster: "/type-config",
  parameter:"/parameter",
  steptypeparameter:"/step-type-parameter",
  systemConfig: "/system-config",
  usermgmt: "/user-management",
  metabase: "/metabase",
  jobschedule:"/job-schedule",
  client_dashboard:"/client_dashboard",
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
    // isUserCanView: routes.includes(routeConstant.roles),
    isUserCanView: true,
  },
  {
    routeTo: routeConstant.registerUser,
    header: "Register User",
    childComp: RegisterUser,
    data: {},
    permissions: true,
    // isUserCanView: routes.includes(routeConstant.registerUser),
    isUserCanView: true,
  },
  {
    routeTo: routeConstant.changePassword,
    header: "Change Password",
    childComp: ChangePassword,
    data: {},
    permissions: true,
    isUserCanView: true,
    // isUserCanView: routes.includes(routeConstant.changePassword),
  },
  {
    routeTo: routeConstant.addMenu,
    header: "Add Menu",
    childComp: AddMenu,
    data: {},
    permissions: true,
    isUserCanView: true,
    // isUserCanView: routes.includes(routeConstant.addMenu),
  },
  {
    routeTo: routeConstant.dashboardBuilder,
    header: "Dashboard Builder",
    childComp: DashboardBuilder,
    data: {},
    permissions: true,
    // isUserCanView: routes.includes(routeConstant.dashboardBuilder),
    isUserCanView: true,
  },
  {
    routeTo: routeConstant.userMaster,
    header: "User Master",
    childComp: UserMaster,
    data: {},
    permissions: true,
    // isUserCanView: routes.includes(routeConstant.userMaster),
    isUserCanView: true,
  },
  {
    routeTo: routeConstant.resetPassword,
    header: "Reset Password",
    childComp: ResetPassword,
    data: {},
    permissions: true,
    // isUserCanView: routes.includes(routeConstant.resetPassword),
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
    routeTo: routeConstant.client, // Client Form route
    header: "",
    childComp: Client,
    data: {},
    permissions: true,
    isUserCanView: true,
    // isUserCanView: routes.includes(routeConstant.client),
  },
  {
    routeTo: routeConstant.project, // Project Form route
    header: "",
    childComp: Project,
    data: {},
    permissions: true,
    // isUserCanView:  routes.includes(routeConstant.project),
    isUserCanView: true,
  },
  {
    routeTo: routeConstant.projectfile, // Project File Form route
    header: "",
    childComp: ProjectFile,
    data: {},
    permissions: true,
    isUserCanView:  true,
  },
  {
    routeTo: routeConstant.step, // StepType Form route
    header: "",
    childComp: StepType,
    data: {},
    permissions: true,
    isUserCanView: true,
    // isUserCanView: routes.includes(routeConstant.step),
  },
  {
    routeTo: routeConstant.typeconfigmaster, // TypeConfigs Form route
    header: "",
    childComp: TypeConfigMaster,
    data: {},
    permissions: true,
    // isUserCanView: routes.includes(routeConstant.typeconfigmaster),
    isUserCanView:true,
  },
  {
    routeTo: routeConstant.parameter, // Parameter Form route
    header: "",
    childComp: Parameter,
    data: {},
    permissions: true,
    // isUserCanView: routes.includes(routeConstant.parameter),
    isUserCanView: true,
  },
  {
    routeTo: routeConstant.steptypeparameter, // StepTypeParameter Form route
    header: "",
    childComp: StepTypeParameter,
    data: {},
    permissions: true,
    isUserCanView: true,
    // isUserCanView: routes.includes(routeConstant.steptypeparameter),
  },
  {
    routeTo: routeConstant.jobschedule, // job-schedule Form route
    header: "",
    childComp: JobSchedule,
    data: {},
    permissions: true,
    isUserCanView:true,
 },
 {
  routeTo: routeConstant.systemConfig, // StepTypeParamete Form route
  header: "",
  childComp: SystemConfig,
  data: {},
  permissions: true,
  isUserCanView: true,
},
{
  routeTo: routeConstant.usermgmt, // StepTypeParamete Form route
  header: "",
  childComp: UserManagement,
  data: {},
  permissions: true,
  isUserCanView: true,
},
{
  routeTo: routeConstant.metabase, // StepTypeParamete Form route
  header: "",
  childComp:MetabaseComponent ,
  data: {},
  permissions: true,
  isUserCanView: true,
},
{
  routeTo: routeConstant.client_dashboard, // dashboard Form route
  header: "",
  childComp:Client_Dashboard,
  data: {},
  permissions: true,
  isUserCanView: true,
}
];