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
                    src="/assets/images/start.png"
                    title="Start Point"
                    style={{ cursor:"pointer", zIndex: '10', position: "absolute", marginLeft: '-65px', marginTop: '24px' ,height:"30px",width:'30px'}}
                  />
                </div>
              ) : ''}
              <img
                src={data.img}
                style={{ width: "70px", height: "70px" }}
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
              style={{ marginTop: '-30px', marginLeft: '-40px', backgroundColor: "green", border: "green" ,height:"8px",width:"8px" }}
              position={Position.Right}
              id="ok"
              onDoubleClick={onNodeDoubleClick}
            />
            <Handle
              type="source"
              style={{ backgroundColor: "red", border: "red",height:"8px",width:"8px"  }}
              position={Position.Right}
              id="error"
              onDoubleClick={onNodeDoubleClick}
            />
          </>
        )}
        {data.type.toLowerCase().includes("end") && (
          <>
          <div>
                  <img
                    src="/assets/images/end.png"
                    title="End"
                    style={{cursor:"pointer", zIndex: '10', position: "absolute", marginLeft: '38px', marginTop: '-90px' ,height:"30px",width:'30px'}}
                  />
                </div>
          </>
        )}
        {!data.start_step&& (
          <>
            <Handle type="target" position={Position.Left} id="target"   style={{ marginTop: '-18px', marginLeft: '-10px', height:"10px",width:"10px" }} onDoubleClick={onNodeDoubleClick} />
          </>
        )}

      </div>
    </div>
  );
};

export default memo(Node);
