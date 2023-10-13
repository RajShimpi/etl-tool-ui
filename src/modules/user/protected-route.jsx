import React from 'react';
import { Navigate } from 'react-router-dom';
import auth from './auth';



const ProtectedRoute = (prop) => {    
    const comp = prop.children;
    const props = prop.children?.props;
    // let header = comp?.props?.header;
    let ChildComponent = comp?.type;
   
    // let data = props?.data;
    // const [isAuthenticated, setAuthentication] = useState(hasToken());

    // const getElement = () => {
    //     let isAuthenticated = hasToken();
    //     let element = isAuthenticated ?
    //     !!Component ? <Component /> :
    //     !!ChildComponent ? <ChildComponent {...props} /> : 
    //     <Navigate to='/dashboard' /> :
    //     <Navigate to='/login' />
    //     return element;
    // }    
    return (
        <div>
            {
                 auth.hasToken() ? !!ChildComponent ? <ChildComponent {...props} /> : 
                '' :
                 <Navigate to='/login' />
            }
        </div>        
    );

}

export default ProtectedRoute;