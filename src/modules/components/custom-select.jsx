import "./component.css";

import React, { useEffect, useState } from 'react';

const CustomSelect = (props) => {
  const [value, setValue] = useState('');
  const [valueAfterRender, setValueAfterRender] = useState('');
  const setItem = (e) => {
    const filterData = props.options?.find(ele => (ele?.value == e.target.value))
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setValue({ label: e.target.name, value: e.target.value, params: filterData?.params ? filterData.params : null });
    callBackFunc({ text: label, label: e.target.name, value: e.target.value, params: filterData?.params ? filterData.params : null })
  }

  const callBackFunc = (curValue) => {
    if (props.uniqueKey || props.uniqueKey === 0) {
      props.callback(curValue, props.name, props.uniqueKey);
    }
    else
      props.callback(curValue, props.isGeneric? "select" : props.name , props.index);

  }

  useEffect(() => {
    let obj = props.options?.find(x => x.value === valueAfterRender);
    if (!obj) {
      setValue('');
      callBackFunc('')
    }
    else {
      setValue({ ...obj });
      callBackFunc({ ...obj })
    }

  }, [props.options]);

  useEffect(() => {
    let obj = props.options?.find(x => x.value == props.itemVal);
    setValueAfterRender(props.itemVal);
    if (!obj) {
      setValue('');
      callBackFunc('')
    } else {
      setValue({ ...obj });
    }
  }, [props.itemVal])

  //   const style = {
  //     borderColor: "#f46a6a",
  //     paddingRight: "calc(1.5em + 0.94rem)",
  //     backgroundImage: "url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23f46a6a'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23f46a6a' stroke='none'/%3e%3c/svg%3e)",
  //     backgroundRepeat: "no-repeat",
  //     backgroundPosition: "right calc(0.375em + 0.235rem) center",
  //     // backgroundSize: "calc(0.75em + 0.47rem) calc(0.75em + 0.47rem)"
  // }

  // const customStyles = {
  //   control: (base, state) => ({
  //     ...base,
  //     // state.isFocused can display different borderColor if you need it
  //     borderColor: props.isRequired ? true ?
  //       '#ddd' : value ?
  //         '#ddd' : '#dc3545' : '#ddd',
  //     // overwrittes hover style
  //     '&:hover': {
  //       borderColor: props.isRequired ? true ?
  //         '#ddd' : value ?
  //           '#ddd' : '#dc3545' : "#ddd"
  //     }
  //   })
  // }
  return (
    <>
      {/* <div key={props.primaryKey + 'div'} style={{ width: '-webkit-fill-available' }}> */}
      <label className={` ${props.isSmall ? 'no-margin d-block' : 'has-float-label select-margin-bottom'}`}>
        <select id={props.primaryKey} name={props.name} defaultValue={"0"} className={`form-control custom-select ${props.isSmall ? 'no-margin pad-half' : ''}`} value={value?.value|| "0"} onChange={setItem} disabled={props.disabled} required={props.isRequired}>
          <option value={""}>Select {props.label}</option>
          {props.options?.map((optionElement) => (
            <option key={"option-" + optionElement.value} value={optionElement.value}>{optionElement.label}</option>
          ))}
        </select>
        {!props.isSmall && <label htmlFor={props.primaryKey}>{props.label}{(props.isRequired || props.showAsterisk) && <span style={{ color: 'red' }}>*</span>}</label>
        }
      </label>
      {/* <label class="has-float-label"> */}
      {/* styles={customStyles} */}
      {/* <label for={props.label}>{props.label}</label>
    <Select key={props.primaryKey} styles={customStyles} value={value}
      onChange={setItem}
      options={props.options}
      isDisabled={props.disabled}
      placeholder={props.placeholder} /> */}

      {/* </label> */}
      {/* {props.isSubmit && !value && props.isRequired && <div key={'invalid-text' + props.primaryKey} className="invalid-text">Please fill out this field.</div>} */}
      {/* </div> */}
    </>
  );

}

export default CustomSelect;