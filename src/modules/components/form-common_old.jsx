import React from 'react';
import CustomSelect from './custom-select';
import CustomInput from './custom-input';
// import Editor from './m3d.ckeditor';
// import SearchableInput from './searchable-input';
// import TagControl from './tag-control';




const FormCommon_old = (props) => {    

    return (
        props.data.map((pitem, pindex) =>
        (<div key={'form-group' + pindex} className="form-group">
            <div key={'form-row' + pindex} className="row">
                {
                    pitem.groups.map(
                        (item, index) => (
                        item.id !== 'none' &&  <div key={item.id} className={"col-md-" + pitem.col }>
                              {item.label && <label key={item.label + index} htmlFor={item.id}>{item.label} {item.isRequired || item.showAsterisk ? <span key={'span' + index} style={{ color:'red'}}>*</span> : ''}</label> }
                                {
                                    (item.control === "input" || item.control === "textarea") &&
                                    <CustomInput key={'custom-input' + index} primaryKey={item.id + index} callback={pitem.callback} values={pitem.values} disabled={pitem.disabled} {...item} />                                    
                                }
                                {/* {
                                    item.control === 'editor' && <Editor key={'editor' + item.index } callback={pitem.callback} disabled={pitem.disabled} {...item} />
                                } */}
                                {/* {
                                    item.control == "searchable-input" && <SearchableInput key={'searchable' + item.index }  callback={pitem.callback}   {...item} />
                                }                               */}
                                {
                                    item.control === "select" && <CustomSelect key={'custom-select' + index}
                                        primaryKey={item.id + index}
                                        name={item.name}
                                        callback={pitem.callback}
                                        options={item.options}
                                        placeholder={item.placeholder ? "Select " + item.placeholder : null}
                                        isSubmit={item.isSubmit}
                                        isRequired={item.isRequired}
                                        disabled={item.update || pitem.disabled}
                                        itemVal={item.itemVal}
                                        
                                    />
                                }
                                {/* {
                                  item.control === "tagControl" && <TagControl data={item.options} tags={item.itemVal} callback={pitem.callback} >
                                    </TagControl>
                                } */}
                                {item.isRequired && <div key={'error-msg' + index} className="invalid-feedback">Please fill out this field.</div>}
                            </div>
                        )
                    )
                }
            </div>
        </div>))
    );

}

export default FormCommon_old;