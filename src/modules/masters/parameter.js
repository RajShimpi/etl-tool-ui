import React, { useEffect, useState } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import axios from '../services/axios';
import { getParameterFields } from './parameter.-data';

const Parameter = () => {

    const [parameter, setParameter] = useState([]);

    useEffect(() => {
        axios.getWithCallback('parameter/', (data) => setParameter(data.map(x => ({ value: x.id, label: x.name }))))
    }, []);



    const defaultObj = { name: '', context: '', display_name: '', description: '', type: '',resource:'' };


    return (
        <>
            <CommonFormWithList
                formDataAction={getParameterFields}
                columns={config.PARAMETER}
                insertApi="parameter"
                updateApi="parameter"
                getApi="parameter"
                title="Parameter"
                defaultObj={defaultObj}
                // options={[projectId,
                //     parentId
                // ]}
                tableTitle='Parameter'
            />
        </>
    );
};

export default Parameter;
