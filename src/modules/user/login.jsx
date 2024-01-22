import * as yup from "yup";

import React, { useState } from "react";

import $ from 'jquery';
import { Navigate } from 'react-router-dom';
import auth from "./auth";
import axios from '../services/axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useClientId } from "../../components/JobDataContext";
// import { useClientId } from "../JobDataContext";
const Login = () => {
// const [clientid,setClientId]=useState()
const { setClientId } = useClientId();  
    const bgStyle = {
        // backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/images/login/login-bg.png"})`,
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100vh'
    };
    const [validateState, setValidateState] = useState({
        isError: false,
        message: ''
    });
    const [validateMsg, setValidationMsg] = useState('');
    const [isAuth, setAuth] = useState(auth.hasToken());
    const [showPassword, setShowPassword] = useState(false)
    const checkCred = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(onSubmit);
            //onSubmit();
        }
    }

    const onSubmit = (data) => {

        setClientId(data.client_id)
        // $(".blurbackground").css("visibility", "visible");    //userName: userName, 
        axios.post("auth/login", { username: data.userName,client_id: data.client_id,  password: data.password }, false).then(data => {
            auth.setAuthData(data.data);
            setValidateState({
                isError: false,
                message: ''
            })
            reset({
                userName: '',
                client_id: '',
                password: ''
            })
            setAuth(true);
        }).catch((error) => {
            if (error?.response?.data?.message) {
                setValidateState({
                    isError: true,
                    message: error.response.data?.message
                });
            } else {
                setValidateState({
                    isError: true,
                    message: "Error in login!"
                });
            }
        }).finally(() => {
            $(".blurbackground").css("visibility", "hidden");

        });
    }
    const loginSchema = yup.object().shape({
        userName: yup
            .string()
            .required('User name is required'),
            client_id: yup
            .string()
            .required('User id is required'),
        password: yup
            .string()
            .required('Password is required'),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm(
        {
            resolver: yupResolver(loginSchema)
        }
    );

    return (<React.Fragment>
        {isAuth ? <Navigate to='/dashboard' /> :
            <React.Fragment>
                <div style={bgStyle}>
                    <div className="account-pages pt-sm-8">
                        <div className="container">
                            <div className="row align-items-center justify-content-end">

                                <div className="col-md-12 col-lg-6 col-xl-5">
                                    <div className="">
                                        <div className="logo-login">
                                            <a href="#">
                                                {/* Company logo */}
                                                {/* <img src="/assets/images/logo-dark.png" alt="Abhyeti-Logo" height="80"></img> */}
                                            </a>
                                        </div>
                                        <div className="card-body p-4">
                                            <div className="text-center mt-2">
                                                <h5 className="admin-text-title">Login</h5>
                                                <p className="text-muted">Please Enter User Name and Password give by Admin</p>
                                            </div>
                                            <div className="p-2 mt-4">
                                                <form className="custom-validation" onSubmit={handleSubmit(onSubmit)} >
                                                <div className="form-group mb-3">
                                                        <span className="has-float-label">
                                                            <input type="text" autoComplete='off' id='client_id' className="form-control" {...register('client_id')} onKeyDown={(e) => checkCred(e)}
                                                                placeholder=' ' />
                                                            <label htmlFor="client_id">Client Id</label>
                                                        </span>
                                                        {errors.client_id && <span className="client-side-error">{errors.client_id.message}</span>}
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <span className="has-float-label">
                                                            <input type="text" autoComplete='off' id='user-name' className="form-control" {...register('userName')} onKeyDown={(e) => checkCred(e)}
                                                                placeholder=' ' />
                                                            <label htmlFor="user-name">User Name</label>
                                                        </span>
                                                        {errors.userName && <span className="client-side-error">{errors.userName.message}</span>}
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <span className="has-float-label">
                                                            <input className="form-control" id="password" type={showPassword ? 'text' : "password"} {...register('password')} onKeyDown={(e) => checkCred(e)}
                                                                placeholder=" " ></input>
                                                            <label htmlFor="password">
                                                                Password</label>
                                                            <span className="form-label unlock-icon cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                                                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                            </span>
                                                        </span>
                                                        {errors.password && <span className="client-side-error">{errors.password.message}</span>}

                                                    </div>
                                                    {/* <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="auth-remember-check" ></input>
                                                        <label className="form-check-label" htmlFor="auth-remember-check">Remember
                                                            me</label>
                                                    </div> */}

                                                    <div className="mt-3">
                                                        <button className="btn btn-primary w-full " type="submit">LogIn</button>
                                                    </div>
                                                </form>
                                                {!!validateState && validateState.message && <div className="mt-3 alert alert-danger" role="alert" bis_skin_checked="1">
                                                    {validateState.message}
                                                </div>}
                                            </div>

                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <p>Powered by Abhyeti <b>Version</b> 1.0.0</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </React.Fragment>}
    </React.Fragment>)
}

export default Login;
