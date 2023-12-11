import React from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import { getParameterFields, getSteptypeFields } from './parameter-data';

const Parameter= () => {
    // const [formData, setFormData] = useState({
    //     id: null,
    //     name:'',
    //     abbreviation:'',
    // });

    let defaultObj = {name:'',context:'', display_name: '', descirption:'',type:'',resource:''};

    return (
        <>      
            <CommonFormWithList
                formDataAction={getParameterFields}
                columns={config.PARAMETER}
                insertApi="parameter"
                updateApi="parameter/:id"
                getApi="parameter"
                title="Parameter"
                defaultObj={defaultObj}
                tableTitle='Parameter'
            />
        </>
    );
};

export default Parameter;