import React, { useState } from 'react';

const Client = () => {
    const [formData, setFormData] = useState({
        id: null,
        profileId: null,
        profileImage: null,
        emp_code: '',
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        manager: null,
        warehouse: null,
        binLocation: null,
        role: null,
        managerId: null,
        warehouseId: null,
        binLocationId: null,
        roleId: null,
        isActive: true,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform actions with formData, e.g., submit to server
        console.log('Form submitted:', formData);
    };

    return (
        <form style={{}} onSubmit={handleSubmit}>
            <label>
                Employee Code :     
                    <input type="text" name="emp_code" value={formData.emp_code} onChange={handleInputChange} placeholder='Emp' />
            </label>
            <br />
            <label>
                First Name:
                <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange}  />
            </label>
            <br />
            <label>
                Middle Name:
                <input type="text" name="middlename" value={formData.middlename} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Last Name:
                <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange}  />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Is Active:
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Client;
