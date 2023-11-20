import { errorAlert, successAlert } from '../components/config/alert';

import $ from "jquery";
import auth from '../user/auth';
import axios from 'axios';
import getAxiosObject from './baseApiCaller';
import { Navigate } from 'react-router-dom';

//const base_uri = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PRODUCTION_BASE_URL : process.env.REACT_APP_SERVICE_BASE_URL;
const marvin_url = process.env.REACT_APP_MARVIN_URL;

const marvinPost = (data) => {
    return axios.post(marvin_url, data, getHeaderInfo(false));
}

const get = (url, isToken = true, key = null) => {
    return getAxiosObject(key).get(url, getHeaderInfo(isToken));
}

const post = (url, data, isToken = true, key = null) => {
    //let fullUrl = base_uri + url;
    return getAxiosObject(key).post(url, data, getHeaderInfo(isToken));
}

const put = (url, data, isToken = true, key = null) => {
    let payload = data
    if(!payload)
        payload = {}
    return getAxiosObject(key).put(url, payload, getHeaderInfo(isToken));
}

const remove = (url, isToken = true, key = null) => {
    return getAxiosObject(key).delete(url, getHeaderInfo(isToken));
}

const getHeaderInfo = (isToken = true) => {
    if (isToken) {
        return {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': auth.getStorageData('accessToken'),
                'Access-Control-Allow-Origin': '*'
            }
        };
    } else {
        return {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'crossDomain': true,
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'

            }
        };
    }

}

const postWithCallback = (url, data, callback, failCallback = null, key = null, showMessage = true) => {
    $(".blurbackground").css("visibility", "visible");
    return post(url, data, true, key)
        .then((resp) => {
            if (showMessage) {
                if (resp?.data?.message) { successAlert(resp?.data?.message) }
                else {
                    successAlert('Record created successfully')
                }
            }
            callback(resp.data)
        })
        .catch(error => {
            if (failCallback)
                failCallback(error);
            if (!(url.includes('login') || url.includes('change-password')))
                checkErrorCodes(error);
        })
        .finally(() => { $(".blurbackground").css("visibility", "hidden"); });
};

const getWithCallback = (url, callback, failCallback = null, key = null, showMessage = true) => {
    $(".blurbackground").css("visibility", "visible");
    return get(url, true, key)
        .then((resp) => callback(resp.data))
        .catch(error => {
            if (failCallback)
                failCallback(error);
                if(showMessage) {
            if (!(url.includes('login') || url.includes('register'))) {
                checkErrorCodes(error);
            }
        }
        })
        .finally(() => { $(".blurbackground").css("visibility", "hidden"); });
};

const deleteWithCallback = (url, callback, failCallback = null, key = null) => {
    $(".blurbackground").css("visibility", "visible");
    return remove(url, true, key)
        .then((resp) => callback(resp.data))
        .catch(error => {
            if (failCallback)
                failCallback(error);
            if (!(url.includes('login') || url.includes('register'))) {
                checkErrorCodes(error);
            }
        })
        .finally(() => { $(".blurbackground").css("visibility", "hidden"); });
};

const putWithCallback = (url, data, callback, failCallback = null, key = null, showMessage = true) => {
    $(".blurbackground").css("visibility", "visible");
    return put(url, data, true, key)
        .then((resp) => {
            if(showMessage) {
            if (resp?.data?.message) { successAlert(resp?.data?.message) }
            else {
                successAlert('Data updated successfully')
                }
            }
            callback(resp.data)
        })
        .catch(error => {
            if (failCallback)
                failCallback(error);

            checkErrorCodes(error);
        })
        .finally(() => { $(".blurbackground").css("visibility", "hidden"); });
};

const checkErrorCodes = (error) => {
    if (error?.code === "ERR_NETWORK")
        errorAlert("service is not responding.");
    if (error?.response?.status === 404) {
        if (error?.response?.data?.message) {
            errorAlert(error?.response?.data?.message);
        } else {
            errorAlert("service call does not exist.");
        }
    }
    if (error?.response?.status === 400) {
        if (error.response?.data?.message) {
            errorAlert(error.response.data.message);
        } else {
            errorAlert(error?.message);
        }
    }
    if (error?.response?.status === 409) {
        if (error.response?.data?.message) {
            errorAlert(error.response.data.message);
        } else {
            errorAlert('Something went wrong, please try later');
        }

    }

    if (error?.response?.status === 401) {
        auth.logOut();
        errorAlert("Your session is expired or you are not authorize to call service.");
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1000); // Redirect after 1 seconds (adjust the delay as needed)
    }
    if (error?.response?.status === 500) {
        if (error?.message?.includes("ValidationError"))
            errorAlert(error?.message);
        else {
            errorAlert('Something went wrong, please try later');
        }
        // else {
        //     let apiName = error?.config?.url?.split("/");
        //     errorAlert("Error while getting the data." + (apiName?.length ? ("\n Service Name: " + apiName[apiName.length - 1]) : ''));
        // }
    }
    // if(error?.response?.data?.message?.includes("ValidationError")) {
    //     errorAlert(error.response.data?.message);
    // }
}

export default {
    post,
    get,
    put,
    remove,
    postWithCallback,
    putWithCallback,
    getWithCallback,
    deleteWithCallback,
    checkErrorCodes,
    marvinPost
}