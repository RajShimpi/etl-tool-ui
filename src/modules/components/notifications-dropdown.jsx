import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en.json'
import axios from '../services/axios';
import auth from '../user/auth';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
// import { socket } from '../dashboard/dashboard';

TimeAgo.addDefaultLocale(en);

const NotificationsDropdown = () => {

    // const [result, setResult] = useState([]);
    // const [total, setTotal] = useState(result.filter(x => x.read === false).length);
    // const userId = auth.getStorageData("id");

    // const notifications = result;

    // const [isExpand, setExpand] = useState(notifications.map(v => false));
    // const navigate = useNavigate();

    // const getAllNotifications = () => {

    //     axios.getWithCallback(`/notification/user/${userId}`, (res) => {
            
    //         const data = res.data;

    //         const newData = data.map(x => {
                
    //             return {

    //                 id: x.id,
    //                 user: x.userProfile.firstNameLastName,
    //                 userId: x.createdBy,
    //                 headline: x.header,
    //                 message: x.content,
    //                 link: x.link,
    //                 createdAt: x.createDateTime,
    //                 updatedAt: x.lastChangedDateTime,
    //                 read: x.read

    //             }

    //         });

    //         setResult(newData.sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt)));
    //     })

    // };  

    // useEffect(() => {
        
    //     getAllNotifications();
        
    // }, []);

    // useEffect(() => {

    //     socket.on('new-notification', (notification) => {

    //         // Handle the received notification in real-time

    //         const newNotification = {
    //             id: notification.id,
    //             user: notification.userProfile.firstNameLastName,
    //             userId: notification.createdBy,
    //             headline: notification.header,
    //             message: notification.content,
    //             link: notification.link,
    //             createdAt: notification.createDateTime,
    //             updatedAt: notification.lastChangedDateTime,
    //             read: notification.read
    //         }
    
    //         notification.userId === userId && setResult((prevNotifications) => [newNotification, ...prevNotifications].sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt)));
            
    //     });

    //     // Clean up the event listener when the component unmounts
    //     return () => socket.off('new-notification');

    // }, []);

    // const handleLink = (e, x) => {
    //     e.preventDefault();
    //     navigate(x.link);
    // }

    // useEffect(() => {

    //     const hasNewNotification = result.filter(x => x.read === false);
    //     const firstIndex = 0;
    //     const totalNotifications = localStorage.getItem('total_notifications');

    //     if (totalNotifications !== null && hasNewNotification.length > totalNotifications) {

    //         toast(hasNewNotification[firstIndex].headline, {
    //             position: "top-right",
    //             autoClose: 1500,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             onClick: (e) => handleLink(e, hasNewNotification[firstIndex]),
    //             pauseOnHover: true,
    //             style: { boxShadow: '1px 1px 5px #b9b9b9', background: '#f0f0ff', color: 'black', fontWeight: 'bold' },
    //         });

    //         localStorage.setItem('total_notifications', hasNewNotification.length);

    //     } else if (totalNotifications === null && hasNewNotification.length) {

    //         toast(hasNewNotification[firstIndex].headline, {
    //             position: "top-right",
    //             autoClose: 1500,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             onClick: (e) => handleLink(e, hasNewNotification[firstIndex]),
    //             pauseOnHover: true,
    //             style: { boxShadow: '1px 1px 5px #b9b9b9', background: '#f0f0ff', color: 'black', fontWeight: 'bold' },
    //         });

    //         localStorage.setItem('total_notifications', hasNewNotification.length);
    //     }

    //     setTotal(hasNewNotification.length);


    // }, [result]);

    // const truncateText = {
    //     whiteSpace: 'nowrap',
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    // }

    // const handleExpandContent = (e, index) => {
    //     e.stopPropagation();
    //     const newArr = [ ...isExpand ];
    //     newArr[index] = !newArr[index];
    //     setExpand([ ...newArr ]);
    // } 

    // const handleRead = (e, data = null) => {
    //     e.stopPropagation();

    //     if (data === null) {

    //         for (let i = 0; i < result.length; i++) {

    //             const payload = {
    //                 read: true,
    //                 lastChangedBy: userId
    //             }

    //             axios.put(`/notification/notification-update/${result[i].id}`, payload)
    //             .then(() => {})
    //             .catch(err => {
    //                 console.log(err);
    //             })

    //         }

    //         let notifications = [ ...result ];
    //         notifications = notifications.map((x) => ({ ...x, read: true }));

    //         setResult(notifications);

    //         localStorage.setItem('total_notifications', 0);

    //     } else {

    //         const payload = {
    //             read: true,
    //             lastChangedBy: userId
    //         };

    //         axios.put(`/notification/notification-update/${data.id}`, payload)
    //         .then(() => {

    //             let notifications = [ ...result ];
    //             notifications = notifications.map((x) => {
                    
    //                 if (x.id == data.id) {
    //                     return { ...x, read: payload.read };
    //                 }

    //                 return x;

    //             });

    //             setResult(notifications);
                
    //             let currentTotal = localStorage.getItem('total_notifications');
    //             localStorage.setItem('total_notifications', currentTotal - 1);

    //         }).catch(err => {
    //             console.log(err);
    //         })



    //     }

    // }


    return (
        <></>
        // <div className="dropdown d-inline-block">

        //     <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //         <i className="fas fa-bell"></i>
        //         {total !== 0 && <span className="badge bg-danger rounded-pill">{total}</span>}
        //     </button>

        //     <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
                
        //         <div className="p-3">
        //             <div className="row align-items-center">
                        
        //                 <div className="col">
        //                     <h5 className="m-0 font-size-16"> Notifications </h5>
        //                 </div>

        //                {notifications.length !== 0 && <div className="col-auto cursor-pointer" onClick={handleRead}>
        //                     <span className="small"> Mark all as read</span>
        //                 </div>}
                        
        //             </div>
        //         </div>

        //         <div className="notification-container">

        //             {notifications.length !== 0 ? notifications.map((data, index) => (

        //                 <div onClick={() => navigate(!!data.link ? data.link : '#')} className="text-reset notification-item cursor-pointer">
        //                     <div className="d-flex align-items-start">
        //                         <div className="flex-shrink-0 me-3">

        //                             <Avatar name={data.user} size="35" round={true} title={data.user} /> 

        //                         </div>
        //                         <div className="flex-grow-1" style={{ minWidth: 50 }}>
        //                             <h6 className={`mb-1 ${!data.read ? 'read-title' : ''}`} style={isExpand[index] ? {} : truncateText}>{!!data.headline ? data.headline : ''}</h6>

        //                             <div className={`font-size-12 text-muted ${!data.read ? 'read-title' : ''}`}>
        //                                 <p className="mb-1" style={isExpand[index] ? {} : truncateText}>{!!data.message ? data.message : ''}</p>
        //                                 <p className="mb-0"><i className="far fa-clock"></i> {!!data.createdAt ? <ReactTimeAgo date={data.createdAt} locale="en-US" /> : ''}</p>
        //                             </div>

        //                         </div>

        //                         {!data.read && <span className="badge bg-danger rounded-pill" data-toggle="tooltip" data-placement="bottom" title="Mark as Read" onClick={(e) => handleRead(e, data)}>New!</span>}
                                
        //                         {!!data.headline && !!data.message ? data.headline.length > 38 || data.message.length > 38 ? <div className='arrow-down' onClick={(e) => handleExpandContent(e, index)}></div> : null : null}

        //                     </div>

        //                 </div>

        //             )) : <center style={{ fontStyle: 'italic' }}>No notifications</center>}


        //         </div>

                //  {notifications.length !== 0 && <div className="p-2 border-top">
                //     <div className="d-grid">
                //         <a className="btn btn-sm btn-link font-size-14 text-center" href="#">
                //             <div className="arrow-down"></div> View More..
                //         </a>
                //     </div>
                // </div>} 

        //     </div>
            
        // </div>
    )

}

export default NotificationsDropdown