const getMenus = () => [{
    menuId: 1,
    liClass: '',
    menuIcon: '',
    menuName: 'dashboard',
    hasChild: false
}, {
    menuId: 2,
    liClass: '',
    menuIcon: '',
    menuName: 'User Managment',
    hasChild: '',
    childItem: [{
        childhref: '/user',
        itemName: 'Change Password'
    }]
}];

const getRouteData = () => [
    {
        routeTo: "/dashboard",
        header: "Dashboard",
        childComp: '',
        data: {},
        permissions: true,
        isUserCanView: true

    },
]

export default {
    getMenus,
    getRouteData
};

 