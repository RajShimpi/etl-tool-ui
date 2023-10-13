import React from "react";
import { useEffect, useState } from "react"
import ReactionMonitoringModal from "../experiment/components/chemistry/reaction-monitoring/reaction-monitoring-modal";

export const TemplateTLC = ({ id, content, unitName, itemVal, callback, experimentAccess }) => {
    const [show, setShow] = useState(false)
    const [reactionMonitorId, setReactionMonitorId] = useState()

    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(itemVal || '');
    }, [itemVal])

    const addReactionMonitoring = (data) => {
        callback({ templateControlId: id, value: { ...data, type: 'TLC' } });
    }

    const openModal = (e) => {
        setShow(true)
    }

    const handleClose = (isRefresh = false) => {
        setShow(false)
        setReactionMonitorId('')
    }

    return (<>
        {content}

        <div className={experimentAccess === "VIEW" || experimentAccess === 'REVIEW' ? "d-inline tlc-icon-div disabled-div" : "d-inline tlc-icon-div"}>
            <img src='/assets/images/synthesis_protocol_icon/tlc.png' className="cursor-pointer" onClick={(e) => { openModal(e) }} />
        </div>
        {show && <ReactionMonitoringModal handleClose={handleClose} reactionMonitorId={reactionMonitorId} addReactionMonitoring={addReactionMonitoring} value={value} isForProtocol={true} />}

        {unitName && <b>{unitName}</b>}
    </>)
}