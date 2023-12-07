import * as yup from "yup";

import { PasswordRegex } from '../components/config/common-config'
import auth from './auth';
import axios from '../services/axios';
import { successAlert } from "../components/config/alert";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    })
    const bgStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/images/login/login-bg.png"})`,
        backgroundColor: '#ffffff',
        width: '100%',
        height: '80%'
    };

    const registerSchema = yup.object().shape({
        currentPassword: yup
            .string()
            .required('Current password is required'),
        newPassword: yup
            .string()
            .required('New password is required')
            .matches(PasswordRegex, "New password must be alphanumeric and contain at least 10 characters")
            .notOneOf([yup.ref("currentPassword"), null], "Current and new passwords must be different"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("newPassword"), null], "Passwords must match")
            .required('Confirm password is required'),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm(
        {
            mode: 'onChange',
            resolver: yupResolver(registerSchema)
        }
    );

    const onSubmit = (data) => {
        const registerData = {
            employeeCode: auth.getStorageData('userName'),
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        }
        axios.putWithCallback('user/change-password', registerData, (response) => {
            // successAlert('Your password has been reset successfully')
            reset({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
        }, (err) => {
        });
    };

    return (<div style={bgStyle} className="admin-login-bg">
        <div className="account-pages form-center-align">
            <div className="container">
                <div className="row align-items-center justify-content-end main-phone-bg">
                    <div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="">
                            <div className="card-body p-4">
                                <div className="text-center mt-2">
                                    <h5 className=""><b>Change Password</b></h5>
                                    <p className="text-muted"></p>
                                </div>
                                <div className="p-2 mt-4">
                                    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => { if (e.keyCode === 13) { e.preventDefault(); return; } }} className="custom-validation" >
                                        <div className="mb-4 row">
                                            <div className="col-md-12">
                                                <span className="has-float-label">
                                                    <input type="text" className="form-control" value={auth.getStorageData('userName')} id="user-name" placeholder={' '} autoComplete={'off'} disabled></input>
                                                    <label htmlFor="user-name">User name<span style={{ color: 'red' }}>*</span></label>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="form-group mb-4">
                                            <span className="has-float-label">
                                                <input className={`${errors.currentPassword && 'form-control-error'} form-control`} id="current-password" type={showPassword.currentPassword ? 'text' : 'password'}  {...register('currentPassword')}
                                                    placeholder=" "></input>
                                                <label htmlFor="current-password">Current Password<span style={{ color: 'red' }}>*</span></label>
                                                <span className="form-label unlock-icon cursor-pointer" onClick={() => setShowPassword({ ...showPassword, currentPassword: !showPassword.currentPassword })}>
                                                    <i className={`fa ${showPassword.currentPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                </span>
                                            </span>
                                            {(errors.currentPassword)? <span className="client-side-error">{errors.currentPassword.message}</span> : <span className="client-side-empty-error"></span>}
                                        </div>

                                        <div className="form-group mb-4">
                                            <span className="has-float-label">
                                                <input className={`${errors.newPassword && 'form-control-error'} form-control`} id="new-password" type={showPassword.newPassword ? 'text' : 'password'} {...register('newPassword')}
                                                    placeholder=" "></input>
                                                <label htmlFor="new-password">
                                                    New Password<span style={{ color: 'red' }}>*</span></label>
                                                <span className="form-label unlock-icon cursor-pointer" onClick={() => setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })}>
                                                    <i className={`fa ${showPassword.newPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                </span>
                                            </span>
                                            {errors.newPassword && <span className="client-side-error">{errors.newPassword.message}</span>}

                                        </div>

                                        <div className="form-group mb-4">
                                            <span className="has-float-label">
                                                <input className={`${errors.confirmPassword && 'form-control-error'} form-control`} id="confirm-password" type={showPassword.confirmPassword ? 'text' : 'password'}
                                                    {...register('confirmPassword')} placeholder=" "
                                                ></input>
                                                <label htmlFor="confirm-password">
                                                    Confirm Password<span style={{ color: 'red' }}>*</span></label>
                                                <span className="form-label unlock-icon cursor-pointer" onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}>
                                                    <i className={`fa ${showPassword.confirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                </span>
                                            </span>
                                            {errors.confirmPassword && <span className="client-side-error">{errors.confirmPassword.message}</span>}
                                        </div>

                                        <div className="mt-3">
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
    )
}

export default ChangePassword;