import { useEffect, useState } from 'react';

import CustomSelect from '../components/custom-select';
import SearchableInput from '../components/searchable-input';
import axios from '../services/axios';
import { successAlert } from '../components/config/alert';
import SelectReact from '../components/select-react';

const RegisterUser = (props) => {
    const defaultObj = { role: 0 };
    const [userData, setUserData] = useState(defaultObj);
    const [empData, setEmployeeData] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [roles, setRoles] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [binLocations, setBinLocations] = useState([]);
    const [itemVal, setItemVal] = useState(0)
    const [warehouse, setWarehouse] = useState('')
    const [binLocation, setBinLocation] = useState('')

    // const [validate, setValidate] = useState(false);

    const bgStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/images/login/login-bg.png"})`,
        backgroundColor: '#ffffff',
        width: '100%',
        height: '80%'
    };
    // const setValues = (e, name) => {
    //     if (!e)
    //         return;

    //     switch (name) {
    //         case 'select':
    //             userData[name] = parseInt(e.value);
    //             break;
    //         case "input":
    //             userData[e.target.name] = e.target.value;
    //             break;
    //         default:
    //             break;
    //     }
    // }
    useEffect(() => {
        axios.getWithCallback("employee?active_users=true",
            (data) => {
                
                setEmployeeData(data.map(x => {
                    return {
                        value: x.id,
                        label: `${x.emp_code}-${x.firstname}-${x.middlename}-${x.lastname}-${x.mobilePhone}`, uniqueVal: x.emp_code
                    }
                }))}
            , null, "HRMS");
        
    }, [])

    const searchCallback = (val, name) => {
        if (val?.value === '') {
            setUserData({ ...defaultObj, department: '', firstname: '', lastname: '', mobilePhone: '', branch: '', manager: '', jobTitle: '', officialEmail: '' })
            setItemVal(0)
        } else {
            axios.getWithCallback(`employee/${val?.value}`, async (data) => {
                const newData = { ...data, department: data.department.name, branch: data.branch.name,  }
                
                setUserData(newData)
                setWarehouse(data.warehouseId);
                setBinLocation(data.binLocationId);
            
            }, null, "HRMS");
        }
    }


    const selectCallback = (val, name) => {

        if (val) {
            setItemVal(val.value);
            setUserData((prevState) => ({ ...prevState, userRoles: [{ role_id: val.value }] }));
        }
    }
    // const selectWarehouse = (val, name) => {
    //     if (val) {
    //         setItemVal(val.value)
    //         setWarehouse((prevState) => ({ ...prevState, warehouseId: val.value, warehouse: val.label }));
    //     }
    // }

    // const selectBinLocation = (val, name) => {
    //     if (val) {
    //         setItemVal(val.value)
    //         setBinLocation((prevState) => ({ ...prevState, binLocationId: val.value, binLocation: val.label }));
    //     }
    // }

    const prepareRegisterObj = () => {

        return {
            employeeId: userData.id,
            employeeCode: userData.emp_code,
            aadharCard: userData.aadharCard,
            email: userData.officialEmail,
            userRoles: userData.userRoles,
            firstName: userData.firstname,
            lastName: userData.lastname,
            middleName: userData.middlename,
            managerName: userData.manager,
            // warehouse: userData.warehouse,
            // binLocation:  userData.binLocation,
            // warehouseId: Number(warehouse.warehouseId),
            // binLocationId: Number(binLocation.binLocationId)

        }
    }

    const onsubmit = (e) => {
        let obj = prepareRegisterObj();

        console.log(obj);

        e.preventDefault();
        // setSubmit(true);
        if (!e.target.checkValidity()) {

            e.stopPropagation();
            e.target.classList.add('was-validated');
        }
        else {
            axios.postWithCallback('auth/register', obj, (response) => {
                setUserData(defaultObj);
            });
        }
    }

    return (<div style={bgStyle} className="admin-login-bg">
        <div className="account-pages form-center-align">
            <div className="container">
                <div className="row align-items-center justify-content-end main-phone-bg">
                    <div className="col-xl-6 col-lg-6 col-md-12 custom-user-form" style={{ minWidth: '60%', overflow: 'auto' }}>
                        <div className="">
                            <div className="card-body p-4">
                                <div className="text-center mt-2">
                                    <h5 className=""><b>New User Registration</b></h5>
                                    <p className="text-muted"></p>
                                </div>
                                <div className="p-2 mt-4">
                                    <form onSubmit={(e) => onsubmit(e)} onKeyDown={(e) => { if (e.keyCode === 13 || e.keyCode === 8) { e.preventDefault(); return; } }} className="custom-validation" >

                                        <div className='row'>

                                            <div className="col-md-6 mb-3">
                                                <SearchableInput 
                                                    id="searhable-register-emp"
                                                    name="employeeCode" 
                                                    type="text" 
                                                    callback={searchCallback} 
                                                    data={empData} 
                                                    label={'Username'} 
                                                    isRequired={true} 
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <span className="has-float-label">
                                                    <input className="form-control" type="email" value={userData.officialEmail} id="email-input" placeholder={' '} disabled></input>
                                                    <label htmlFor="user-name">User Email I'D</label>
                                                </span>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <span className="has-float-label">
                                                    <input className="form-control" type="text" value={userData.firstname} id="first-name-input" placeholder={' '} disabled></input>
                                                    <label htmlFor="user-name">First Name</label>
                                                </span>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <span className="has-float-label">
                                                    <input className="form-control" type="text" value={userData.lastname} id="email-input" placeholder={' '} disabled></input>
                                                    <label htmlFor="user-name">Last Name</label>
                                                </span>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-md-6 mb-3'>
                                                <span className="has-float-label">
                                                    <input className="form-control" type="tel" value={userData.mobilePhone} id="tel-input" placeholder={' '} disabled></input>
                                                    <label htmlFor="user-name">Phone Number</label>
                                                </span>
                                            </div>
                                            <div className='col-md-6 mb-3'>
                                                {/* <span className="has-float-label">
                                                    <input className="form-control" type="text" value={userData.department} id="department-input" placeholder={' '} disabled></input>
                                                    <label htmlFor="user-name">Department Name</label>
                                                </span> */}
                                            </div>
                                        </div>

                                        <div className='row'>
                                            {/* <div className='col-md-6 mb-3'>
                                                <span className="has-float-label">
                                                    <input className="form-control" type="text" value={userData.branch} id="department-input" placeholder={' '} disabled></input>
                                                    <label htmlFor="user-name">Branch Name</label>
                                                </span>
                                            </div> */}
                                            <div className='col-md-6 mb-3'>
                                                <span className="has-float-label">
                                                    <input className="form-control" type="text" value={userData.manager} id="department-input" placeholder={' '} disabled></input>
                                                    <label htmlFor="user-name">Manager Name</label>
                                                </span>
                                            </div>
                                        </div>

                                        {/* <div className="mb-3 row">
                                            <div className="col-md-12">
                                                <span className="has-float-label">
                                                    <input className="form-control" type="text" value={userData.jobTitle} id="manager-input" placeholder={' '} disabled></input>
                                                    <label htmlFor="user-name">Job Title</label>
                                                </span>
                                            </div>
                                        </div> */}

                                        {/* <div className="row">
                                            <div className="col-md-12">
                                                <CustomSelect key={'custom-select-register'}
                                                    name="role"
                                                    callback={selectCallback}
                                                    options={roles}
                                                    label="Roles"
                                                    isRequired={true}
                                                    itemVal={roles}
                                                />
                                            </div>
                                        </div> */}

                                        <div className="row">
                                            <div className="col-md-12 mb-3">

                                            {/* <SelectReact
                                                id="react-select-warehouse"
                                                name="warehouse"
                                                label={'Warehouse'} 
                                                callback={selectWarehouse}
                                                options={warehouses} 
                                                placeholder="Select Warehouse"
                                                isRequired={true} 
                                                itemVal={warehouse}

                                            /> */}
                                                
                                                {/* <CustomSelect key={'custom-select-warehouse'}
                                                    name="warehouse"
                                                    callback={selectWarehouse}
                                                    options={warehouses}
                                                    label="Warehouse"
                                                    isRequired={true}
                                                    itemVal={warehouse}
                                                /> */}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12 mb-3">
{/* 
                                            <SelectReact
                                                id="custom-select-bin_location"
                                                name="bin_location"
                                                label={'Bin Location'} 
                                                callback={selectBinLocation}
                                                options={binLocations} 
                                                placeholder="Select Bin Location"
                                                isRequired={true} 
                                                itemVal={binLocation}
                                            /> */}
                                                {/* <SearchableInput 
                                                    id="custom-select-bin_location"
                                                    name="bin_location" 
                                                    type="text" 
                                                    callback={selectBinLocation} 
                                                    data={binLocations} 
                                                    label={'Bin Location'} 
                                                    isRequired={true} 
                                                /> */}

                                                {/* <CustomSelect key={'custom-select-bin_location'}
                                                    name="bin_location"
                                                    callback={selectBinLocation}
                                                    options={binLocations}
                                                    label="Bin Location"
                                                    isRequired={true}
                                                    itemVal={binLocation}
                                                /> */}
                                                
                                            </div>
                                        </div>

                                        <div className="">
                                            <button className="btn btn-primary w-full " type="submit">submit</button>
                                        </div>
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        //<div className='card'>
        //     <form onSubmit={(e) => onsubmit(e)} className="needs-validation" noValidate>
        //         <div className="card-header header-border">
        //             <h3 className="card-title">
        //                 User Info Detail
        //             </h3>
        //         </div>
        //         <div className="card-body">
        //             <FormCommon data={formControls.getRegisterData({
        //                 isSubmit,
        //                 roles: [],
        //                 callback: setValues,
        //                 values: userData
        //             })} />
        //         </div>
        //         <div className="card-body">
        //             <button type="submit" className="btn btn-primary">Submit</button>
        //         </div>
        //     </form>
        // </div>
    )
}

export default RegisterUser;