import React from "react";
import CustomInput from "./custom-input";
import CustomSelect from "./custom-select";
import SearchableInput from "./searchable-input";
import SelectReact from "./select-react";
import SearchModal from "./search-modal";

const FormCommon = (props) => {
console.log(props);
  return (
    <div > 
      {props.data &&
        props.data.map((pitem, pindex) => (
          <div key={`form-row${pindex}`} className="row">
            {pitem.groups.map((item, index) => {
              if (item.id === "none") {
                return null;
              }

              const colClass = `col-md-${pitem.col} mb-2 mt-2`;

              return (
                <div key={item.id} className={colClass}>
                  {/* Render form controls based on the control type */}
                  {item.control === "input" || item.control === "textarea" ? (
                    <CustomInput
                      key={`custom-input${index}`}
                      primaryKey={`${item.id}${index}`}
                      callback={pitem.callback}
                      values={pitem.values}
                      disabled={pitem.disabled}
                      {...item}
                    />
                  ) : null}

                  {item.control === "searchable-input" && (
                    <SearchableInput
                      key={`searchable${index}`}
                      callback={pitem.callback}
                      data={item.data}
                      values={pitem.values}
                      {...item}
                    />
                  )}
                  {item.control === "select" && (
                    <CustomSelect
                      key={`custom-select${index}`}
                      {...item}
                      primaryKey={`${item.id}${index}`}
                      callback={pitem.callback}
                      options={item.options}
                      placeholder={
                        item.placeholder ? `Select ${item.placeholder}` : null
                      }
                      isSubmit={item.isSubmit}
                      isRequired={item.isRequired}
                      disabled={item.update || pitem.disabled || item.disabled}
                      itemVal={item.itemVal||1}
                    />
                  )}

                  {item.control === "select-react" && (
                    <SelectReact
                      key={`select-react${index}`}
                      {...item}
                      primaryKey={`${item.id}${index}`}
                      callback={pitem.callback}
                      options={item.options}
                      placeholder={
                        item.placeholder ? `Select ${item.placeholder}` : null
                      }
                      isSubmit={item.isSubmit}
                      isRequired={item.isRequired}
                      multiple={item.multiple}
                      disabled={item.update || pitem.disabled || item.disabled}
                      itemVal={item.itemVal}
                    />
                  )}

                  {item.control === "search-modal" && (
                    <SearchModal
                      {...item}
                      inputProps={{
                        callback: pitem.callback,
                        disabled: pitem.disabled,
                        ...item,
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
                  )}
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default FormCommon;
