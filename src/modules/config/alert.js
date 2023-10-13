import 'sweetalert2/dist/sweetalert2.min.css'
import 'react-toastify/dist/ReactToastify.css';

import Swal from "sweetalert2";
import { toast } from 'react-toastify';

const alertInfo = (message) => {
    toast.info(message, {
        
    })
    // Swal.fire({
    //     title: 'For Your Information',
    //     icon: 'info',
    //     text: message
    // });
}

const errorAlert = (message) => {
    if (Array.isArray(message)) {
        message.forEach((errorMessageEle)=>{
            toast.error(errorMessageEle, {
                className: 'toast-error-message'
            })  
        })
    } else {
        toast.error(message, {
            className: 'toast-error-message'
        })
    }
    // Swal.fire({
    //     title: 'Error in processing request',
    //     icon: 'error',
    //     text: message
    // });
}

const successAlert = (message) => {
    toast.success(message,{
        className: 'toast-success-message'
    })
    // Swal.fire({
    //     icon: 'success',
    //     title: 'message',
    //     text: message,
    //     timer: 1500
    // })
}

const confirmAlert = (message, yesCallback, noCallback, isHtml = false, title = '') => {
    let val;
    if(isHtml) {
      val =  Swal.fire({
            title: !!title ? title : 'Are you sure?',
            html:  message,            
            icon: 'warning',
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonName: 'No',
            customClass: 'popup-font',
            width: '800px'
        })
    } else {
      val =  Swal.fire({
            title: 'Are you sure?',
            text:  message,
            icon: 'warning',
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonName: 'No',
        })
    }

    val.then((result) => {
        if (result.isConfirmed) {
            yesCallback();
        } else {
            noCallback();
        }
    })
}


export {
    alertInfo,
    successAlert,
    errorAlert,
    confirmAlert
}