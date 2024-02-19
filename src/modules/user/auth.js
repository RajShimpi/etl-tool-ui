const logOut = () => {
    localStorage.removeItem("Authorization");
}

const hasToken = () => {
    return !!localStorage.getItem("Authorization");
}

const setAuthData = (data) => {
    localStorage.setItem('Authorization', JSON.stringify(data));
}

const getStorageData = (keyName) => {
    const localObj = hasToken() ? JSON.parse(localStorage.getItem('Authorization')) : '';
    if (localObj === '') {
        return '';
    }
    // console.log(localObj['user']['userProfile'])
    switch (keyName) {
        case 'name':
        case 'email':
        case 'lastLoginAt':
        case 'id':
        case "employeeCode":
            let user = localObj.user;
            return user[keyName];
        case 'firstName':
            // const { user: { userProfile: { firstName } } } = localObj
            // firstName = 
            return localObj.user?.firstName
            // case 'fullName':
            // return localObj.user?.firstNameLastName
        // case 'username':
        //     const { user: { employeeCode } } = localObj
        //     return employeeCode;
        // case 'userRoleKey':
        //     const { user: {usersToRoles} } = localObj
        //     return usersToRoles[0].role.name
        case 'role':
            
                return localObj?.user?.usersToRoles?.role?.displayName
            return ''
        // return !!localObj.user?.userRoles?.length ? localObj.user.userRoles.map(x => x.role?.name) : [];
        case 'roleId':            
                return localObj?.user?.role?.id
            return ''
        // return !!localObj.user?.userRoles?.length ? localObj.user.userRoles.map(x => x.role?.name) : [];
        case 'accessToken':
            return `Bearer ${localObj.accessToken}`;
        case 'refresh_token':
            return localObj.refresh_token;
        case 'expires_in':
            return localObj.expires_in;       
        case "manager":
            return localObj.user?.userProfile?.manager;
        case "client":
            return localObj.user.client;
        case "projectid":
            return localObj.user.projectid;
        case "usersToRoles":
            return localObj.user.usersToRoles;
        case "username":
            return localObj.user.username;
        
        default:
            return '';
    }

}

const getData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const setData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}


export default {
    logOut,
    hasToken,
    setAuthData,
    getStorageData,
    setData,
    getData
}