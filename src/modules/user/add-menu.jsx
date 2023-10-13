import CommonFormWithList from "../components/common-form-with-list"
import { getMenuData } from "./menu-data";
import config from "../config/config.json"
import { useEffect, useState } from "react";
import axios from "../services/axios";

const AddMenu = (props) => {
    const defaultObj = { active: true, userRoles: 0, menuName: '', route: '', menuIcon: '', menuLiClass: '', }
    const [parents, setParents] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        axios.getWithCallback('user-menus/get-all-parents', (data) => setParents(data.map(x => { return { label: x.menuName, value: x.id } })))
        axios.getWithCallback('user-roles/', (data) => setRoles(data.map(x => { return { label: x.name, value: x.id } })))
    }, [])

    const processData = (data) => {
        return data.map(x => { return { ...x, userRoles: x.menuRoles.map(y => y.role_id) } })
    }

    return (<CommonFormWithList
        formDataAction={getMenuData}
        columns={config.MENU_COLUMNS}
        insertApi="user-menus/save"
        updateApi="user-menus/update"
        getApi="user-menus/get-all"
        title="Add/Update Menu data"
        defaultObj={defaultObj}
        options={[parents, roles]}
        processListCallback={processData}
        tableTitle='Menu Master'
    />)
}

export default AddMenu;