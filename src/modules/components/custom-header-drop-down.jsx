import React, { useState } from "react";


function ActionButton({ options , getValue, access, data}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    getValue(option)
  };

  const menuOptions = options.filter((option) => {
    // access?.accessType === "VIEW"
    if (data?.schemeStatus === "Closed" && (option.id === 1 || option.id === 3)) {
      return false;
    }
    return true;
  });

  return (
    <div className="dropdown">
      <button className= "btn mx-2 btn-update w-xs waves-effect waves-light enabled-button" type="button" onClick={toggleOpen}>

      Action
      <i className="fas fa-angle-down ms-1 ps-1"></i>
      </button>
      {isOpen && (
        <div className="dropdown_menu">
          {menuOptions.map((option) => (
            <button
              key={option.id}
              className="dropdown_menu_option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActionButton;