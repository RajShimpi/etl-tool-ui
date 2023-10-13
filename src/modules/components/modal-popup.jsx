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
    return (
        <div className={props.show ? "modal d-block hide-body-scroll" : "modal d-none"} style={{ overflow: "auto" }} tabIndex="-1" role="dialog">
            <div className={`modal-dialog modal-lg ${props.maxWidth && 'modal-top'} `} style={{ maxWidth: props.maxWidth, }} role="document">
                <div className="modal-content">
                    <div className={`${props.maxWidth && 'modal-header-custom-padding'} modal-header`}>
                        <h5 className="modal-title">{props.modalTitle}</h5>
                        <button type="button" onClick={() => close()} className="btn btn-link close-btn" data-dismiss="modal" aria-label="Close">
                            <i className="fa fa-2x fa-times-circle" aria-hidden="true" size='12'></i>
                        </button>
                    </div>
                    <div className={`${props.maxWidth && 'modal-body-custom-top-padding'} modal-body`}>
                        <div className={`${!props.maxWidth && 'container-fluid'}`}>
                            <ChildComponent {...childProps} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;