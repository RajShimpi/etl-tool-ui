import React, { useState } from "react";

const Panel = (props) => {
    const [isExpand, setExpand] = useState(false);
    return (
        <div>
            {props.tabList.map((item, index) => (<div key={"card" + index} className="card collapsed-card">
                <div key={"card-header" + index} className="card-header header-border" data-toggle="collapse" data-card-widget="collapse" >
                    <div key={"card-title" + index} className="card-title" style={{ margin: "0px" }}>{item.name}</div>
                    <div key={"card-tools" + index} className="card-tools">
                        <button key={"button" + index} type="button" className="btn btn-tool">
                            <i key={"i" + index} className="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div key={"card-body" + index} className="card-body collapse">
                        {item.name}
                </div>
            </div>))}
        </div>)
}

export default Panel;