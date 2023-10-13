import axios from 'axios';


const mainAxios = axios.create({
    baseURL: process.env.NODE_ENV === "production"
                                    ? process.env.REACT_APP_PRODUCTION_BASE_URL
                                      : process.env.REACT_APP_SERVICE_BASE_URL
});

const hrmsAxios = axios.create({
    baseURL: process.env.NODE_ENV === "production"
                                    ? process.env.REACT_APP_PRODUCTION_HRMS_BASE_URL
                                      : process.env.REACT_APP_HRMS_SERVICE_BASE_URL
});


const getAxiosObject = (key) => {
    switch(key) {
     case "HRMS": return hrmsAxios;
     default : return mainAxios;
    }
}

export default getAxiosObject;


