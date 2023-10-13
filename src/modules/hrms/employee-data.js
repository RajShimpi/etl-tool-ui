import utils from "../components/utils";
import { EmailRegEx } from "../config/common-config";

export const getEmployeeFields = (itemData) => {
    return [{

        col: 3,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
            {
                type: "text",
                id: "inputEmpCode",
                label: "Employee Code",
                name: "emp_code",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["emp_code"] : '',
            },
            {
                type: "text",
                id: "inputFirstName",
                label: "First Name",
                name: "firstname",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["firstname"] : '',
            },
            {
                type: "text",
                id: "inputMiddleName",
                label: "Middle Name",
                name: "middlename",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["middlename"] : '',
            },
            {
                type: "text",
                id: "inputLastName",
                label: "Last Name",
                name: "lastname",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["lastname"] : '',
            }
        ]
    },
    {
        col: 3,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
            {
                type: "text",
                id: "jobTitle",
                label: "Job Title",
                name: "jobTitle",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["jobTitle"] : '',
            },
            {
                type: "date",
                id: "inputJoiningDate",
                label: "Joining Date",
                name: "joiningDate",
                control: "input",
                isRequired: true,
                min: utils.formatDate(utils.addMonths(new Date(), -1200)),
                max:  utils.formatDate(new Date()),
                itemVal: itemData.values ? itemData.values["joiningDate"] : '',
            },
            {
                id: "selectBranch",
                label: "Branch",
                name: "branchId",
                options: itemData.options[0],
                control: "select",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["branchId"] : '',
            },
            {
                id: "selectDepartment",
                label: "Department",
                name: "departmentId",
                control: "select",
                options: itemData.options[1],
                isRequired: true,
                itemVal: itemData.values ? itemData.values["departmentId"] : '',
            }
        ]
    },
    {
        col: 3,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
            {
                type: "text",
                id: "inputGender",
                label: "Gender",
                name: "gender",
                control: "select",
                options: itemData.options[2],
                isRequired: true,
                itemVal: itemData.values ? itemData.values["gender"] : '',
            },
            {
                type: "email",
                id: "inputOfficialEmailId",
                label: "Official Email Id",
                name: "officialEmail",
                control: "input",
                pattern: EmailRegEx,
                isRequired: true,
                itemVal: itemData.values ? itemData.values["officialEmail"] : '',
            },
            {
                type: "text",
                id: "inputMobilePhone",
                label: "Mobile Number",
                name: "mobilePhone",
                control: "input",
                itemVal: itemData.values ? itemData.values["mobilePhone"] : '',
            },
            
            {
                type: "text",
                id: "inputManagerSearch",
                label: "Manager",
                name: "manager",
                control: "searchable-input",
                placeholder: 'search here',
                itemVal: itemData.values ? itemData.values["manager"] : '',
                data: itemData.data
            }
        ]
    },
    {
        col: 3,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
            {
                type: "text",
                id: "inputAadharCard",
                label: "Aadhar Card",
                name: "aadharCard",
                control: "input",
                isRequired: true,
                pattern: /[0-9]{12}/,
                maxLength: 12,
                condition: (val) => isNaN(val), 
                // span: "this field with acccept only 12 numeric digits.",
                itemVal: itemData.values ? itemData.values["aadharCard"] : '',
                info:'this field with acccept only 12 numeric digits'
            },
            {
                type: "date",
                id: "inputDateOfBirth",
                label: "Date Of Birth",
                name: "dateOfBirth",
                control: "input",
                min: utils.formatDate(utils.addMonths(new Date(), -1200)),
                max:  utils.formatDate(new Date()),
                itemVal: itemData.values ? itemData.values["dateOfBirth"] : '',
            },
            {
                type: "email",
                id: "inputPersonalEmail",
                label: "Personal Email Id",
                name: "personalEmail",
                control: "input",
                pattern: EmailRegEx,
                itemVal: itemData.values ? itemData.values["personalEmail"] : '',
            },
            {
                type: "checkbox",
                id: "inputIsActive-emp",
                label: "Active",
                name: "active",
                control: "input",
                itemVal: itemData.values ? !!itemData.values["active"] : false,
            },
        ]
    }
    ];
}
