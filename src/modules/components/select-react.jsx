import "./component.css";

import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const SelectReact = React.forwardRef((props, ref) => {
  const [value, setValue] = useState(null);
  const [valueAfterRender, setValueAfterRender] = useState(props.itemVal);
  // const [customStyles, setCustomStyles] = useState({});

  React.useImperativeHandle(ref, () => ({
    setItem: (val) => setItem(val)
  }))
  const setItem = (e) => {
    setValue(e);
    //callBackFunc(e)
  }

  const callBackFunc = (curValue) => {
    if (props.uniqueKey || props.uniqueKey === 0)
      props.callback(curValue, props.name, props.uniqueKey);
    else
      props.callback(curValue, props.name, props.index);
  }

  useEffect(() => {
    callBackFunc(value);
  }, [value])


  // useEffect(() => {
  //   let obj = props.options.find(x => x.value === valueAfterRender);
  //   if (!obj) {
  //     setValue(null);
  //    // callBackFunc(null)
  //   }
  //   else {
  //     setValue(obj);
  //   }

  // }, [props.options]);

  useEffect(() => {
    if (props.multiple) {
      if (props.itemVal?.length) {
        let items = [];
        props.itemVal.forEach(element => {
          let obj = props.options.find(x => x.value === element);
          items.push(obj);
        });
        setValue(items);
        //callBackFunc(items)
      } else {
        setValue([]);
        //callBackFunc([])
      }

    } else {
      let obj = props.options.find(x => x.value === props.itemVal);
      setValueAfterRender(props.itemVal);
      setValue(obj);
    }
  }, [props.itemVal, props.options])


  // useEffect(() => {
  //   setCustomStyles({
  //     control: (base, state) => ({
  //         ...base,
  //         // state.isFocused can display different borderColor if you need it
  //         // borderColor: props.isRequired ? !props.isSubmit ?
  //         //   '#ddd' : value ?
  //         //   '#ddd' : '#dc3545' : '#ddd',
  //         // // overwrittes hover style
  //         border: (state.isFocused) ? '' : (props.isRequired && props.isSubmit && !value?.length) ? '1px solid #f46a6a' : '',
  //         '&:hover': {
  //           border: (state.isFocused) ? '' : (props.isRequired && props.isSubmit && !value?.length) ? '1px solid #f46a6a' : '',
  //          }
  //         //  '&:focus': {
  //         //   border: props.isRequired && props.isSubmit && !value?.length ? '1px solid #f46a6a' : '',
  //         //  }

  //         // borderColor : '#ddd'
  //         // '&:hover': {
  //         //   borderColor: props.isRequired ? !props.isSubmit ?
  //         //     '#ddd' : value ?
  //         //     '#ddd' : '#dc3545' : "#ddd"
  //         // }
  //       })});
  // }, [props.isRequired, props.isSubmit, value])
  const customStyles = {
    control: (base, state) => ({
      ...base,
      // state.isFocused can display different borderColor if you need it
      // borderColor: props.isRequired ? !props.isSubmit ?
      //   '#ddd' : value ?
      //   '#ddd' : '#dc3545' : '#ddd',
      // // overwrittes hover style            
      border: (props.isRequired && props.isSubmit && !value?.length) ? '1px solid #f46a6a' : '',
      '&:hover': {
        border: (props.isRequired && props.isSubmit && !value?.length) ? '1px solid #f46a6a' : '',
      }
      //  '&:focus': {
      //   border: props.isRequired && props.isSubmit && !value?.length ? '1px solid #f46a6a' : '',
      //  }

      // borderColor : '#ddd'
      // '&:hover': {
      //   borderColor: props.isRequired ? !props.isSubmit ?
      //     '#ddd' : value ?
      //     '#ddd' : '#dc3545' : "#ddd"
      // }
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 })
  };
  return (
    <>
      {/* <div key={props.primaryKey + 'div'} style={{ width: '-webkit-fill-available' }}> */}
      {/* <label className="has-float-label select-margin-bottom">
        <select id={props.primaryKey} name={props.name} defaultValue={"0"} className="form-control custom-select" value={value?.value || "0"} onChange={setItem} disabled={props.disabled} required={props.isRequired}>
          <option value={""}>Select {props.label}</option>
          {props.options?.map((optionElement) => (
            <option key={"option-" + optionElement.value} value={optionElement.value}>{optionElement.label}</option>
          ))}
        </select>
        <label htmlFor={props.primaryKey}>{props.label}{(props.isRequired || props.showAsterisk) && <span style={{ color: 'red' }}>*</span>}</label>
      </label> */}
      <div className={`${props.isSmall ? 'd-block' : 'has-float-label'}`} style={{ boxShadow: 'none' }}>

        {!props.isSmall && <label htmlFor={props.label}>{props.label}</label>}
        <Select
          key={props.primaryKey}
          value={value}
          styles={customStyles}
          onChange={setItem}
          options={props.options}
          disabled={props.disabled}
          isMulti={props.multiple}
          placeholder={props.placeholder}
          required={props.isRequired}
          menuPortalTarget={document.body}
        >
        </Select>
        {!props.disabled && (
          <input
            tabIndex={-1}
            autoComplete="off"
            style={{ opacity: 0, height: 0, position: 'absolute' }}
            value={value}
            required={props.isRequired}
          />
        )}
      </div>
      {/* {props.isSubmit && (!value?.length) && props.isRequired && <div key={'invalid-text' + props.primaryKey} className="invalid-text">Please fill out this field.</div>} */}
      {/* </div> */}
    </>
  );

})

export default SelectReact;