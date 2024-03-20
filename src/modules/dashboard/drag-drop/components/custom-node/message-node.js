import React, { useState, memo, useRef, useEffect, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { style } from "./message-node-styles";

const Node = ({ data, id, start_step, startStep, item, isSelected, textRef, nodeName, setNodeName, ...props }) => {
  const [selected, setSelected] = useState(false);
  const [showNodeMaster, setShowNodeMaster] = useState(false);
  const nodeRef = useRef();
  const [refresh, setRefresh] = useState(false);

  const handleToggle = () => {
    setSelected(!selected);
  };

  const handleImageClick = () => {
    setShowNodeMaster(true);
  };

  const handleCloseNodeMaster = () => {
    setShowNodeMaster(false);
    setRefresh(!refresh);
  };

  const onNodeDoubleClick = () => {
    setShowNodeMaster(true);
  };

  const handleClickOutside = (event) => {
    if (nodeRef.current && !nodeRef.current.contains(event.target)) {
      setShowNodeMaster(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  let customTitle = { ...style.title };
  customTitle.backgroundColor = "#08c9bd";
  // console.log(data);
  return (
    <div ref={nodeRef}>
      <div style={{ textAlign: "center" }} className="text-updater-node" >
        {/* {showNodeMaster && (
          <Modal
            show={showNodeMaster}
            modalTitle={"Save/Update Parameter"}
            handleClose={handleCloseNodeMaster}
            maxWidth={"100%"}
          >
            {data.comp ? data.comp : <AddFile />}
          </Modal>
        )} */}

        <div style={{ textAlign: "center" }}>
          {selected ? null : (
            <>
              {startStep === data.id ? (
                <div>
                  <img
                    src="/assets/images/flag.png"
                    style={{ zIndex: '10', position: "absolute", marginLeft: '-30px', marginTop: '1px' }}
                  />
                </div>
              ) : ''}
              <img
                src={data.img}
                style={{ width: "70px", height: "75px" }}
                onClick={handleImageClick}
              />
              <abbr title={data.heading} style={{ cursor: 'pointer', textDecoration: 'none', borderRadius: '50px' }}>
                <div style={style.contentWrapper}>
                  {data.heading && data.heading?.length > 10 ? data.heading.slice(0, 9) + '...' : data.heading}
                </div>
              </abbr>
            </>
          )}
        </div>

        {selected && (
          <div
            className="Main"
            style={{ ...style.body, ...(selected ? style.selected : []) }}
            onClick={handleToggle}
          >
            <div style={customTitle}>{data.heading}</div>
            {/* <div style={style.contentWrapper}>{data.content}</div> */}
          </div>
        )}

        {!data.type.toLowerCase().includes("end") && (
          <>
            <Handle
              type="source"
              style={{ marginTop: '-30px', marginLeft: '-40px', backgroundColor: "green", border: "green" }}
              position={Position.Right}
              id="ok"
              onDoubleClick={onNodeDoubleClick}
            />
            <Handle
              type="source"
              style={{ backgroundColor: "red", border: "red" }}
              position={Position.Right}
              id="error"
              onDoubleClick={onNodeDoubleClick}
            />
          </>
        )}

        <Handle type="target" position={Position.Left} id="target" onDoubleClick={onNodeDoubleClick} />
      </div>
    </div>
  );
};

export default memo(Node);
