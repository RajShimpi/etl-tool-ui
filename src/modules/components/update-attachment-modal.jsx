import React from "react";
import { useEffect } from "react";
import { confirmAlert, errorAlert } from "../config/alert";
import { useDropzone, ErrorCode } from 'react-dropzone'
import { useState } from "react";
import axios from "../services/axios";

const UpdateAttachmentModal = (props) => {
    const [attachmentData, setAttachmentData] = useState([])
    useEffect(() => {
        let str = ''
        props.fileArray?.forEach(ele => {
            str = str + `&files=${ele}`
        })
        axios.getWithCallback(`${props.path}${str}`, (data) => {
            setAttachmentData(data)
        })
        const close = (e) => {
            if (e.keyCode === 27) {
                props.handleClose(props.sequenceNo, props.attchementFor)
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        multiple: true,
        maxSize: props.maxFileSize,
        maxFiles: 5,
        onDrop: async (files, fileRejections) => {
            if (fileRejections.length) {
                const { file, errors } = fileRejections[0];
                errors[0].code === ErrorCode.FileTooLarge
                    ? errorAlert(file.name + ' is out of allowed file size ' + ((props.maxFileSize / 1024) / 1024) + ' MB')
                    : errorAlert(errors[0].message)
                return;
            }
            const newArr = []
            for await (const file of files) {

                const isDuplicate = attachmentData?.some((ele) => ele.fileName === file.name)

                if (isDuplicate) {
                    errorAlert(`${file.name} already exist`)
                    return
                }
                const reader = new FileReader()
                reader.readAsDataURL(file)

                const promiseVar = await new Promise((resolve, reject) => {
                    reader.onload = (e) => {
                        const imageWithPreview = {
                            size: file.size,
                            fileBase64String: reader.result,
                            fileName: file.name,
                            type: file.type
                        }
                        resolve(imageWithPreview)
                    }
                })
                newArr.push(promiseVar)
            }
            setAttachmentData([...attachmentData, ...newArr])

        }
    })

    const close = () => {
        props.handleClose(props.sequenceNo, props.attchementFor);
    }

    const openWindow = (file) => {

        const fileContent = `<html><head><title>${file.fileName}</title></head><body><iframe title="1"
        src=${file.fileBase64String}
        frameBorder="0"
        scrolling="auto"
        height="100%"
        width="100%"></iframe></body></html>`;


        let win = window.open("", "_blank", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=800,height=600")
        win.document.write(fileContent);
    }

    const deleteImage = (e, file) => {
        e.stopPropagation();
        confirmAlert("Do you want to delete this file?", () => {
            setAttachmentData(attachmentData.filter(ele => ele.fileName !== file.fileName))
        }, () => { return; })
    }

    const getSource = (fileType) => {
        if (fileType?.includes("image")) {
            return "/assets/images/icons/picture.png";  //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        } else if (fileType.includes("word")) {
            return "/assets/images/icons/word.png";
        } else if (fileType.includes("spreadsheetml.sheet")) {
            return "/assets/images/icons/excel.png";
        } else if (fileType.includes("pdf")) {
            return "/assets/images/icons/pdf.png";
        } else {
            return "/assets/images/icons/text.png";
        }
    }

    const reset = () => {
        setAttachmentData(props.attachments)
    }

    const getPayload = () => {
        return ({
            files: attachmentData,
            path: props.fileUploadPath,
            isDelete: true
        })
    }
    const saveAttachments = () => {
        axios.postWithCallback(`${props.postApi}`, getPayload(), (data) => {
            props.updateAttchmentCallback(attachmentData.map(ele => (ele.fileName)), props.id, props.sequenceNo)
        })
    }

    return (
        <div className={"modal d-block hide-body-scroll"} style={{ overflow: "auto" }} tabIndex="-1" role="dialog">
            {console.log('attachmentData', attachmentData)}
            <div className={`modal-dialog modal-lg`} role="document">
                <div className="modal-content p-2 center-modal">
                    <div className={` modal-header`}>
                        <h5 className="modal-title">Documents</h5>
                        <button type="button" onClick={() => close()} className="btn btn-link close-btn" data-dismiss="modal" aria-label="Close">
                            <i className="fa fa-2x fa-times-circle" aria-hidden="true" size='12'></i>
                        </button>
                    </div>
                    <div className="row mt-2 mb-2">
                        {props.isEditable &&
                            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12">
                                <a  {...getRootProps()}>

                                    <div className="add_exper_information_upload cursor-pointer" >
                                        <div className="add_information_upload">
                                            <span><i className="fa fa-plus"> </i></span>
                                        </div>
                                        <input {...getInputProps()} />
                                        <div className="add_exper_corcreator-tab-btn d-flex justify-content-center">
                                            <span>Upload</span>
                                        </div>
                                    </div>
                                </a>
                            </div>}
                        {attachmentData?.map((file, index) => (
                            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12">

                                <div key={file.fileName + index} className="doc-img-icon file-shadow">
                                    {file.type?.includes("image") ?
                                        <>
                                            {props.isEditable && <div className="overlay">
                                                {/*data-bs-toggle="modal" data-bs-target=".bs-example-modal-center"*/}
                                                <button className="icon" id="pdficon" title="Remove" onClick={(e) => deleteImage(e, file)} type='button'>
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </div>}
                                            <a key={"anchor" + file.fileName} title={file.fileName} style={{ cursor: 'pointer' }} className="image-popup-no-margins" onClick={(e) => openWindow(file)}>
                                                <img key={"image" + file.fileName} className="img-fluid" style={{ height: "90px", width: "115px", maxHeight: "100px" }} alt={file.fileName} src={file.fileBase64String} />
                                                <div style={{ width: '90px', fontSize: "10px", paddingLeft: "5px" }} className="text-truncate">{file.fileName ? file.fileName : 'NA'}</div>
                                            </a></>
                                        :
                                        <>
                                            {props.isEditable && <div className="overlay">
                                                {/*data-bs-toggle="modal" data-bs-target=".bs-example-modal-center"*/}
                                                <button className="icon" id="pdficon" onClick={(e) => deleteImage(e, file)} title="Remove" type='button'>
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </div>}
                                            <a key={"anchor" + file.fileName} title={file.fileName} style={{ cursor: 'pointer' }} className="image-popup-no-margins" onClick={(e) => openWindow(file)}>
                                                <img key={"image" + file.fileName} className="img-fluid" alt={file.fileName} src={getSource(file.type)} width={90} height={90} />
                                                <div style={{ width: '90px', fontSize: "10px", paddingLeft: "5px" }} className="text-truncate">{file.fileName ? file.fileName : 'NA'}</div>
                                            </a></>
                                    }
                                </div>
                            </div>
                        ))}
                        {(!props.isEditable && !attachmentData.length) &&
                            <div className="text-secondary px-4 font-italic"><i>Attchments not availlable</i></div>}
                    </div>
                    {props.isEditable ?
                        <div className=" col-md-12 d-flex justify-content-end mt-3 mb-3">
                            <button type="button" onClick={() => saveAttachments()} style={{ marginRight: '1%' }}

                                className="btn mx-1 btn-add w-xs waves-effect waves-light">
                                <i className="fa fa-plus"></i>
                                Save
                            </button>
                            <button type="button" className="btn btn-warning w-xs waves-effect waves-light"
                                onClick={reset} ><i className="fa fa-undo"></i><span className="custom-ml-1">Reset</span></button>
                        </div>
                        :
                        <div className=" col-md-12 d-flex justify-content-end mt-3 mb-3">
                            <button type="button" onClick={() => close()} className="btn btn-warning w-xs waves-effect waves-light">Close</button>
                        </div>}

                </div>
            </div>
        </div>
    );
};

export default UpdateAttachmentModal;
