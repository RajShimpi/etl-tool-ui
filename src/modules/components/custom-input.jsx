import React, { useEffect, useState, useRef } from 'react';

const CustomInput = (props) => {
    const inputRef = useRef(null);
    const [value, SetValue] = useState('');

    const change = (e, callback) => {
        if (!!props.condition && props.condition(e.target.value)) {
            return;
        }
        if (props.isPercentage) {
            if (Number(e.target.value) < 0 || Number(e.target.value) > 100) {
                return;
            } else {
                let solPercentage = e.target.value
                if (e.target.value) {
                    const point = e.target.value.split('.');
                    if (!!point[1] && !!point[1]?.length) {
                        if (point[1]?.length <= 2) {
                            solPercentage = parseFloat(e.target.value).toFixed(point[1]?.length)
                        } else {
                            solPercentage = e.target.value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
                        }
                    }
                }
                SetValue(solPercentage);
                callback(e, props.name, props.uniqueKey, solPercentage);
                return;
            }
        }

        if (props.uniqueKey || props.uniqueKey === 0) {
            {
                switch (props.type) {
                    case 'checkbox':
                        SetValue(e.target.checked);
                        callback(e, "checkbox", props.uniqueKey);
                        break;
                    default:

                        let flag = false;
                        let lasTwoDigitAfterDecimal = '', firstDigitBeforeDecimal = '';

                        if (e.target.name === 'usedQty') {
                            const val = e.target.value;
                            if(val.includes('.')) {

                                const afterDecimal = val.slice(val.indexOf('.'), val.length)
                                lasTwoDigitAfterDecimal = afterDecimal.slice(0, 3);
                                firstDigitBeforeDecimal = val.slice(0, val.indexOf('.'));
                                
                                flag = true;
        
                            }
                        }

                        e.target.name === 'usedQty' ? SetValue(`${firstDigitBeforeDecimal}${lasTwoDigitAfterDecimal}`) : SetValue(e.target.value);
                        if (props.apiDataType === "number") {
                            callback(e, props.name, props.uniqueKey);
                        } else {
                            callback(e, "input", props.uniqueKey);
                        }
                        break;
                }
            }
        } else {
            switch (props.type) {
                case 'file':
                    SetValue(e.target.value);
                    callback(e, "file", props.index);
                    break;
                case 'checkbox':
                    SetValue(e.target.checked);
                    callback(e, "checkbox", props.index);
                    break;
                default:
                    SetValue(e.target.value);
                    if (props.apiDataType === "number") {
                        SetValue(e.target.value);
                        callback(e, props.name);
                    } else if (props.apiDataType === "json") {
                        SetValue(e.target.value);
                        callback(e, props.name);
                    } else {
                        callback(e, "input", props.index);
                    }
                    break;
            }
        }

    }

    // const keydown = (e) => {
    //     if (!!props.condition && props.condition(e.target.value)) {

    //         SetValue('');
    //         return;
    //         // console.log(e.target.value);
    //         // SetValue(e.target.value);
    //         //props.callback(e, "input");
    //     }
    //     //props.callback(e, "input");
    // }

    useEffect(() => {
        if (props.type === 'file') {
            if (!props.itemVal)
                SetValue('')
            // else
            //     SetValue(Array.isArray(props.itemVal) ? props.itemVal?.map(x => x.fileName).join() : '')
            return;
        }
        SetValue(!!props.itemVal ? props.itemVal : '')
    }, [props.itemVal])

    const blur = (e) => {

    }

    useEffect(() => {
        if(props.isFocusReq && value)
            inputRef?.current?.focus();
    }, [value])

    return ( //style={{width: '-webkit-fill-available'}}
        <div key={props.primaryKey + 'div'} style={{ width: '-webkit-fill-available' }} >
            {props.control === "input" && props.type !== "checkbox" && !props.max && !props.pattern &&
                <div className={`${props.isSmall ? '' : 'mb-3'} form-group`}>
                    <span className={`${props.isSmall ? 'd-block' : 'has-float-label'}`}>
                        <input required={props.isRequired} key={props.primaryKey} ref={inputRef} type={props.type} id={props.id}
                            // pattern={props.type === 'email' ? EmailRegEx.toString().replaceAll('/', '') : undefined}
                            name={props.name} value={value} className={`${props.experimentAccess === 'VIEW' ? 'disabled-button' :  ''} ${props.isSmall && 'pad-half'} form-control`}
                            onChange={(e) => change(e, props.callback)}
                            disabled={props.update || props.disabled} multiple={props.isMultiple} placeholder=' ' ></input>
                        {!props.isSmall && <label htmlFor={props.id} className={props.readonly && 'data-readonly'}>{props.label} {(props.isRequired || props.showAsterisk) && <span style={{ color: 'red' }}>*</span>}</label>}
                    </span>
                </div>

            }
            {
                props.control === "input" && props.type !== "checkbox" && props.pattern &&
                <div className="form-group mb-3">
                    <span className="has-float-label">
                        <input key={props.primaryKey} type={props.type} id={props.id} placeholder=' ' ref={inputRef}
                            name={props.name} required={props.isRequired} value={value} className={props.experimentAccess === "VIEW" ? 'disabled-button' : "form-control"}
                            onChange={(event) => change(event, props.callback)} maxLength={props.maxLength} onBlur={(e) => blur(e)}
                            disabled={props.update || props.disabled} multiple={props.isMultiple} pattern={(props.pattern).toString().replaceAll("/", "")}></input>
                        {!props.isSmall && <label htmlFor={props.id}>{props.label} {(props.isRequired || props.showAsterisk) && <span style={{ color: 'red' }}>*</span>}</label>}
                    </span>
                </div>
            }

            {
                props.control === "input" && !!props.max &&
                <div className={`${props.isSmall ? '' : 'mb-3'} form-group`}>
                    <span className="has-float-label">
                        <input key={props.primaryKey} type={props.type} id={props.id} ref={inputRef}
                            name={props.name} required={props.isRequired} value={value} className={`${props.isSmall && 'pad-half'} form-control`}
                            onChange={(e) => change(e, props.callback)} min={props.min} max={props.max} step="0.01" onBlur={(e) => blur(e)} disabled={props.update || props.disabled}></input>
                        {!props.isSmall && <label htmlFor={props.id}>{props.label} {(props.isRequired || props.showAsterisk) && <span style={{ color: 'red' }}>*</span>}</label>}
                    </span>
                </div>
            }

            {
                props.control === "textarea" &&
                <div className="form-group mb-3">
                    <span className="has-float-label">
                        <textarea key={props.primaryKey} id={props.id} type={props.type}
                            className={props.experimentAccess === "VIEW" ? 'disabled-button' : "form-control"} name={props.name} value={value} onChange={(e) => change(e, props.callback)}
                            disabled={props.update || props.disabled} rows={props.rows ? props.rows : "4"} required={props.isRequired} maxLength={props.maxLength} placeholder=' '></textarea>
                        <label htmlFor={props.id}>{props.label} {(props.isRequired || props.showAsterisk) && <span style={{ color: 'red' }}>*</span>}</label>
                    </span>
                </div>
            }
            {

                props.control === "input" && props.type === "checkbox" &&
                <div className={`${props.isSmall ? '' : 'form-check'} ${props.id === 'inputIsActive-emp' && 'mt-7'} ${props.className && 'chekbox-custom'}`} bis_skin_checked="1">
                    <input key={props.primaryKey} type={props.type} className={props.experimentAccess === "VIEW" ? 'disabled-button' : "form-check-input"} id={props.id}
                        name={props.name} required={props.isRequired} checked={value}
                        onChange={(e) => change(e, props.callback)} onBlur={(e) => blur(e)} disabled={props.update || props.disabled}></input>
                    {!props.isSmall && <label className="form-check-label" htmlFor="auth-remember-check">{props.label}</label>}
                </div>
            }
            {props.control === "time-input" && props.type === "time" &&
                <div className={`form-group`}>
                    <span className="has-float-label">
                        <input required={props.isRequired} key={props.primaryKey} type={props.type} id={props.id} ref={inputRef}
                            name={props.name} value={value} className={props.experimentAccess === "VIEW" ? 'disabled-button' : "form-control"}
                            onChange={(e) => change(e, props.callback)}
                            disabled={props.update || props.disabled} placeholder=' ' ></input>
                        {!props.isSmall && <label htmlFor={props.id}>{props.label} {(props.isRequired || props.showAsterisk) && <span style={{ color: 'red' }}>*</span>}</label>}
                    </span>
                </div>
            }
            {(!!props.info && <div key={props.primaryKey + 'span'} className="info">{props.info}</div>)}

            {(!!props.span && <div key={props.primaryKey + 'span'} className="invalid-text">{props.span}</div>)}
        </div >
    )
}

export default CustomInput;