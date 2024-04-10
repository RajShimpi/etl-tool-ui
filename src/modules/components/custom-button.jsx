import React, { useEffect } from "react";

const CustomButton = (props) => {
  useEffect(() => {
  }, [props]);

  return (
    <div className="d-flex">
      {props.button.map((x, index) => (
        <ui key={index}>
          {/* <li className="nav-item"> */}
            <button
              className={`btn btn-${x.color} mx-1 w-xs d-flex`}
              type="button"
              onClick={() => x.function()}
              style={{border:"none"}} 
              disabled={x.disabled}
            >
              <div style={{ marginTop: "1px" }}>
                {x.icon}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  marginLeft: "5px",
                  marginBottom: "3px",
                }}
              >
                {x.name}
              </div>
            </button>
          {/* </li> */}
        </ui>
      ))}
    </div>
  );
};

export default CustomButton;
