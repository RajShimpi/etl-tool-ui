import React from 'react';

const CustomRadio = (props) => {

    const handleChange = (event) => {
        console.log('event', event.target.value, event.target.name);

    }

    return (
        <div className=' radio-group'>
            {
                props.value.map((element, index) =>
                    <div className="form-check exper-check" key={index}>
                        <input className="form-check-input" type="radio" name={props.name} id={props.id} value={element} onChange={(event) => { handleChange(event) }} />
                        <label className="form-check-label" for={props.label[index]}>
                            {props.label[index]}
                        </label>
                    </div>
                )
            }
        </div >
    )
}

export default CustomRadio;