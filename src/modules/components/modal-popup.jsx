import React from "react";
import { useEffect } from "react";

const Modal = (props) => {

    const propComp = props.children;
    let ChildComponent = propComp?.type;
    const childProps = props.children?.props;

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                props.handleClose()
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])
    const close = () => {
        props.handleClose();
    }
    const modalContent = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',  
        color: 'var(--bs-modal-color)',
        pointerEvents: 'auto',
        backgroundColor: 'var(--bs-modal-bg)',
        backgroundClip: 'padding-box',
        border: 'var(--bs-modal-border-width) solid var(--bs-modal-border-color)',
        borderRadius: 'var(--bs-modal-border-radius)',
        outline: 0,
        height:'100%',
        color:'#00659e',
        marginTop: '71px',
        // left: '114px',
      };
      
      
    return (
        <div className={props.show ? "modal d-block hide-body-scroll" : "modal d-none"} style={{ overflow: "auto", zIndex:'10000' ,top:'10%',bottom: "10%"}} tabIndex="-1" role="dialog">
            <div className={`modal-dialog modal-lg ${props.maxWidth &&props.maxHeight &&  'modal-top'} `} style={{ maxWidth: props.maxWidth,maxHeight:props.maxHeight }} role="document">
                <div className="  " style={modalContent}>
                <div className={`${props.maxWidth && 'modal-header-custom-padding'} modal-header`}>
                        <h6 className="modal-title">{props.modalTitle}</h6>
                        <button type="button" onClick={() => close()} className="btn btn-link close-btn" data-dismiss="modal" aria-label="Close">
                            <i className="fa fa-2x fa-times-circle" aria-hidden="true" size='12px'></i>
                        </button> 
                    </div> 
                    <div className={`${props.maxWidth && 'modal-body-custom-top-padding'} `}>
                        <div className={`${!props.maxWidth && ''}`}>
                            <ChildComponent {...childProps} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;