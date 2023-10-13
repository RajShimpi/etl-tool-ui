import React, { useContext, useState } from "react"
import { confirmAlert, errorAlert } from '../config/alert';
import $ from 'jquery';
import configContext from "../dashboard/config-context";
import { useEffect } from "react";


const AvailableDoc = (props) => {
    const [attachedDocs, setAttachedDocs] = useState([]);
    const contextData = useContext(configContext);
    const chatDisable = props.chatDisable;
    const experimentAccess = props.experimentAccess;

    useEffect(() => {
        setAttachedDocs(props.attachedDocuments)
    }, [props.attachedDocuments])

    const deleteImage = (e, file) => {
        e.stopPropagation();
        confirmAlert("Do you want to delete this file?", () => {
            setAttachedDocs(attachedDocs.filter(x => x.fileName !== file.fileName));
            props.callback(attachedDocs.filter(x => x.fileName !== file.fileName))
        }, () => { return; })
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

    const getSource = (fileType) => {
        if (fileType.includes("image")) {
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

    const openFileDialog = () => {
        $("#schemaFileInput").trigger("click");
    }

    const getSelectedFiles = (e) => {
        let imags = attachedDocs?.length ? attachedDocs : [];
        for (var i = 0; i < e.target.files.length; i++) {
            let fileName = e.target.files[i].name;
            let type = e.target.files[i].type;
            let size = e.target.files[i].size;
            if (size > contextData?.config?.MAX_FILE_SIZE) {
                errorAlert(fileName + ' is out of allowed file size ' + ((contextData?.config?.MAX_FILE_SIZE / 1024) / 1024) + ' MB')
                continue;
            }

            const filereader = new FileReader();
            filereader.readAsDataURL(e.target.files[i]);
            filereader.onload = () => {
                imags.push({ fileName: fileName, size: size, type: type, fileBase64String: filereader.result });
                setAttachedDocs([...imags]);
                props.callback([...imags])
            };
        }
    }

    return (
        <>
            <div className="col-xl-1 col-lg-1 col-md-6 col-sm-12">
                <a>
                    <div className={experimentAccess === "VIEW" || experimentAccess === "REVIEW"  ? "add_exper_information_upload cursor-pointer disabled-component-div": "add_exper_information_upload cursor-pointer"} onClick={(e) => openFileDialog(e)}>
                        <div className="add_information_upload">
                            <span><i className="fa fa-plus"> </i></span>
                        </div>
                        <input type="file" id="schemaFileInput" className='d-none' multiple={true} style={{ opacity: "0", width: "0" }} onChange={(e) => getSelectedFiles(e)}></input>
                        <div className="add_exper_corcreator-tab-btn d-flex justify-content-center">
                            <span>Upload</span>
                        </div>
                    </div>
                </a>
            </div>
            <div className="col-xl-11 col-lg-11 col-md-6 col-sm-12">

                    <div className="avail-doc d-flex justify-content-start">

                        {!chatDisable && attachedDocs?.map((file, index) => (

                                <div key={file.fileName + index} className="doc-img-icon" style={{ paddingLeft: "5px" }}>
                                    {file.type.includes("image") ?
                                        <>
                                            <div className={experimentAccess === "VIEW" || experimentAccess === "REVIEW" ? "overlay disabled-button" : "overlay"}>
                                                {/*data-bs-toggle="modal" data-bs-target=".bs-example-modal-center"*/}
                                                <button className="icon" id="pdficon" title="Remove" onClick={(e) => deleteImage(e, file)}  type='button'>
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </div>
                                            <a key={"anchor" + file.fileName} title={file.fileName} style={{ cursor: 'pointer' }} className="image-popup-no-margins" onClick={(e) => openWindow(file)}>
                                                <img key={"image" + file.fileName} className="img-fluid" style={{ height: "90px", width: "90px", maxHeight: "90px" }} alt={file.fileName} src={file.fileBase64String} />
                                            </a></> :
                                        <>
                                            <div className={experimentAccess === "VIEW" || experimentAccess === "REVIEW" ? "overlay disabled-button" : "overlay"}>
                                                {/*data-bs-toggle="modal" data-bs-target=".bs-example-modal-center"*/}
                                                <button className="icon" id="pdficon" onClick={(e) => deleteImage(e, file)} title="Remove" type='button'>
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </div>
                                            <a key={"anchor" + file.fileName} title={file.fileName} style={{ cursor: 'pointer' }} className="image-popup-no-margins" onClick={(e) => openWindow(file)}>
                                                <img key={"image" + file.fileName} className="img-fluid" alt={file.fileName} src={getSource(file.type)} width={90} height={90} />
                                            </a></>
                                    }
                                    <div style={{ width: '90px', fontSize: "10px", paddingLeft: "5px" }} className="text-truncate">{file.fileName}</div>
                                </div>
                            ))}

                    </div>

            </div>
        </>

    )
}

export default AvailableDoc