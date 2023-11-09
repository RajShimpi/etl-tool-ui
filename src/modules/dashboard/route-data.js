
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
import LeftSide from "../../components/LeftSide";
import LeftSidebar from "../../components/LeftSidebar";

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
  leftSide: "/leftSide",
  leftsidebar:"/leftsidebar",
  
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
    routeTo: routeConstant.branch,
    header: "Add/Update Branches",
    childComp: Branch,
    data: {},
    permissions: true,
    isUserCanView: routes.includes(routeConstant.branch),
  },
  {
    routeTo: routeConstant.department,
    header: "Add/Update Departments",
    childComp: Department,
    data: {},
    permissions: true,
    isUserCanView: routes.includes(routeConstant.department),
  },
  {
    routeTo: routeConstant.roles,
    header: "Add/Update Roles",
    childComp: Roles,
    data: {},
    permissions: true,
    isUserCanView: routes.includes(routeConstant.roles),
  },
  {
    routeTo: routeConstant.employees,
    header: "Add/Update Employee Data",
    childComp: Employees,
    data: {},
    permissions: true,
    isUserCanView: routes.includes(routeConstant.employees),
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
    routeTo: routeConstant.leftSide, // LeftSider route
    header: "",
    childComp: LeftSide,
    data: {},
    permissions: true,
    isUserCanView: true,
  },
  
  {
    routeTo: routeConstant.leftsidebar, // RightSideBar route
    header: "",
    childComp: LeftSidebar,
    data: {},
    permissions: true,
    isUserCanView: true,
  }
];
