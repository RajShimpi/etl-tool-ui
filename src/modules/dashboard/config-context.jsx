import React from "react";


var configContext = React.createContext([]);
const ExperimentContext = React.createContext({
    experimentId: '',
    id: 0,
    isUpdate: false,
    isVisible: false,
    batchNo:''
});
const AccessContext = React.createContext({
    accessType: '',
    
});
export { ExperimentContext, AccessContext }
export default configContext;