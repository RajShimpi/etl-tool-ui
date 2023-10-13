import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../services/axios";
import auth from "../user/auth";
import CustomSelect from '../components/custom-select'

export const UnauthorizedUser = (props) => {
    const history = useNavigate();
    const location = useLocation();
    const userId = auth.getStorageData("id");
    const [comment, setComment] = useState("");
    const [selectStatus, setSelectStatus] = useState([])
    const [experimentAccess, setExperimentAccess] = useState('')
    const [sharedExperimentById, setSharedExperimentById] = useState([])
    const [typeConfig, setTypeConfig] = useState([])

    useEffect(() => {
        getAllTypeConfig()
        getSharedExperimentById()
       
    }, []);

    const getAllTypeConfig = () => {
        axios.getWithCallback(`/type-config/`, (resp) => {
            setTypeConfig(resp)
            const filteredData = resp?.filter(item => item.category === 'PERMISSION');
            setSelectStatus(filteredData?.map(ele => ({ value: ele.id, label: ele.value })))

        })
    }

    const getSharedExperimentById = () => {
        axios.getWithCallback(`experiment-share/${props?.experimentID}/`, (data) => {
            setSharedExperimentById(data)

        }
            , null);
    }
   
     

    const handleRequest = () => {
        const shareConfig = typeConfig?.filter(item => item?.category?.toUpperCase() === 'REQUEST_TYPE');
        const shareObject = shareConfig.find(obj => obj?.value?.toUpperCase() === 'SHARE');
        const typeId = shareObject ? shareObject?.id : null;
        const permissionStatus = typeConfig?.filter(item => item?.category?.toUpperCase() === 'PERMISSION_STATUS');
        const permissionObject = permissionStatus.find(obj => obj?.value?.toUpperCase() === 'PENDING');
        const permissionStatusId = permissionObject ? permissionObject?.id : null;


        const experimentOwner = sharedExperimentById?.data.find(obj => obj?.permission?.value?.toUpperCase() === 'OWNER')

        const requestPayload = {
            comment: comment,
            // experimentAccess: experimentAccess,
            experimentId: Number(props?.experimentID),
            userId: props?.userID,
            type: typeId,
            prefix: "SHR-",
            status: permissionStatusId,
            requestedBy: props?.userID,
            code: 'SHARE_REQUEST',
            assignee: experimentOwner?.user_id,
            permission: Number(experimentAccess),
            lastChangedBy: props?.userID,
            createdBy: props?.userID
        }

        axios.postWithCallback(`/share-request`, requestPayload, async (resp) => {
            setTimeout(() => {
                  history(-1)
              }, 2000);
            
        }, null);

        setComment("");
        
    };

    const setValues = (e, name) => {
        if (!e)
            return;
        switch (name) {

            case 'changeCommentAccess':
                setExperimentAccess(e.value)
                break;
            default:
                break;
        }
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }


    return (
        <div className="">
            <div className="mb-4"> Not Authorized to view page. Please request permission for respective experiment.</div>

            <h5 className="mb-3">Request Permission</h5>
            <div className="" style={{ width: "24%", boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)  !important", padding: "10px" }}>
                <h5 className="">Access</h5>
                <div className="mb-1">
                    <CustomSelect primaryKey={''}
                        uniqueKey={''}
                        name={'changeCommentAccess'}
                        callback={setValues}
                        options={selectStatus}
                        placeholder={"Select type"}
                        isSubmit={false}
                        isSmall={true}
                        itemVal={23}
                        isRequired={true} />
                </div>
                <h5 className="">Comment</h5>
                <textarea
                    className="form-control"
                    rows="3"
                    style={{ height: "150px" }}
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Type your comment here..."
                />
                <button className="btn btn-primary mt-3" onClick={handleRequest}>
                    Request
                </button>
            </div>

        </div>
    )
}

export default UnauthorizedUser