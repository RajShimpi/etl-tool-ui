import React from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import { getStep_type_parametersFields} from './Step_type_parameters-data';

const Step_type_parameters= () => {
    // const [formData, setFormData] = useState({
    //     id: null,
    //     name:'',
    //     abbreviation:'',
    // });

    let defaultObj = {step_id:'',parameter_id:'',required: ''};

    return (
        <>      
            <CommonFormWithList
                formDataAction={getStep_type_parametersFields}
                columns={config.STEP_TYPE_PARAMETERS}
                insertApi="step_type_parameters"
                updateApi="step_type_parameters/:id"
                getApi="Step_type_parameters"
                title="Step_type_parameters"
                defaultObj={defaultObj}
                tableTitle='Step_type_parameters'
            />
        </>
    );
};

export default Step_type_parameters;