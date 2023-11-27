import CustomInput from './custom-input';
import CustomSelect from './custom-select';
import React from 'react';
import SearchableInput from './searchable-input';
import SelectReact from './select-react';
import SearchModal from './search-modal';
// import Editor from './m3d.ckeditor';
// import SearchableInput from './searchable-input';
// import TagControl from './tag-control';




const FormCommon = ({props}) => {
    return (
        props.data.map((pitem, pindex) =>
        (//<div key={'form-group' + pindex} className="form-group">
            <div key={'form-row' + pindex} className="row">
                {
                    pitem.groups.map(
                        (item, index) => (
                        item.id !== 'none' &&  <div key={item.id} className={"col-md-" + pitem.col + " mb-2 mt-2" }>
                            {/* <span key={"float-span" + item.id} className="has-float-label"> */}
                              {/* {item.label &&
                              <label key={item.label + index} htmlFor={item.id}>{item.label} {item.isRequired || item.showAsterisk ? <span key={'span' + index} style={{ color:'red'}}>*</span> : ''}</label> } */}
                                {
                                    (item.control === "input" || item.control === "textarea") &&
                                    <CustomInput key={'custom-input' + index} primaryKey={item.id + index} callback={pitem.callback} values={pitem.values} disabled={pitem.disabled} {...item} />
                                }
                                {/* {
                                    item.control === 'editor' && <Editor key={'editor' + item.index } callback={pitem.callback} disabled={pitem.disabled} {...item} />
                                } */}
                                {
                                    item.control === "searchable-input" && <SearchableInput key={'searchable' + item.index} callback={pitem.callback} data={item.data} values={pitem.values} {...item} />
                                }
                                {
                                    item.control === "select" && <CustomSelect key={'custom-select' + index}
                                    {...item}
                                        primaryKey={item.id + index}
                                        name={item.name}
                                        label={item.label}
                                        callback={pitem.callback}
                                        options={item.options}
                                        placeholder={item.placeholder ? "Select " + item.placeholder : null}
                                        isSubmit={item.isSubmit}
                                        isRequired={item.isRequired}
                                        disabled={item.update || pitem.disabled  || item.disabled}
                                        itemVal={item.itemVal}

                                    />
                                }
                                {
                                    item.control === "select-react" && <SelectReact key={'select-react' + index}
                                    {...item}
                                        primaryKey={item.id + index}                                
                                        name={item.name}
                                        label={item.label}
                                        callback={pitem.callback}
                                        options={item.options}
                                        placeholder={item.placeholder ? "Select " + item.placeholder : null}
                                        isSubmit={item.isSubmit}
                                        isRequired={item.isRequired}
                                        multiple={item.multiple}
                                        disabled={item.update || pitem.disabled || item.disabled}
                                        itemVal={item.itemVal}

                                    />
                                }
                                {
                                                item.control === "search-modal" && <SearchModal
                                                    {...item}
                                                    inputProps={{
                                                        callback: pitem.callback,
                                                        disabled: pitem.disabled,
                                                        ...item
                                                    }}
                                                    columns={item.columns}
                                                    data={item.options}
                                                    modalTitle={item.modalTitle}
                                                    searchCallBack={props.searchCallBack}
                                                    pageSizeArray={props.pageSizeArray}
                                                    changePageSize={props.changePageSize}
                                                    getActivePageData={props.getActivePageData}
                                                    initialDataCallback={props.initialDataCallback}
                                                    searchValue={props.searchValue}

                                                />
                                            }
                                {/* {
                                  item.control === "tagControl" && <TagControl data={item.options} tags={item.itemVal} callback={pitem.callback} >
                                    </TagControl>
                                } */}
                                {/* {item.isRequired && <div key={'error-msg' + index} className="invalid-feedback">Please fill out this field.</div>} */}
                                {/* </span> */}
                            </div>
                        )
                    )
                }
            </div>
        //</div>
        ))
    );

}

export default FormCommon;