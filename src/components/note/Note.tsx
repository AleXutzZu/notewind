import React, {FC, useState} from "react";
import {INote} from "../main/App";
import EditNoteMenu from "./modals/EditNoteMenu";
import PreviewNoteMenu from "./modals/PreviewNoteMenu";
import useShortenTitle from "../../hooks/useShortenTitle";
import ConfirmDeleteMenu from "./modals/ConfirmDeleteMenu";

interface INoteProps extends INote {
    handleDelete: () => void;
    handleEdit: (title: string, content: string) => void;
}

const Note: FC<INoteProps> = (props) => {
    const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const shortenTitle = useShortenTitle();

    return (
        <>
            <div
                className={"flex-shrink-0 mx-auto h-12 w-2/3 h-16 md:w-1/3 flex flex-col md:flex-row items-center justify-between bg-blue-400 mb-2.5 rounded-lg"}
                onClick={() => setShowPreviewModal(true)}>
                <div className={"flex relative items-center group justify-center"}>
                    <h3 className={"text-xl ml-2 text-blue-50 cursor-pointer"}>{shortenTitle(props.title)}</h3>
                    <span
                        className={"h-6 w-20 bg-gray-800 text-blue-50 rounded-lg absolute text-center bottom-6 invisible group-hover:visible transition-all duration-100 ease-in-out"}>Preview</span>
                </div>
                <div className={"flex space-x-10 md:space-x-3 md:mr-2 items-center justify-center"}>
                    <div className={"group relative flex items-center justify-center"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" viewBox="0 0 20 20"
                             fill="currentColor" onClick={event => {
                            event.stopPropagation();
                            setShowEditModal(true);
                        }}>
                            <path
                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                        </svg>
                        <span
                            className={"h-6 w-16 bg-gray-800 text-blue-50 rounded-lg absolute text-center bottom-6 invisible group-hover:visible transition-all duration-100 ease-in-out"}>Edit</span>
                    </div>
                    <div className={"group relative flex items-center justify-center"}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="h-5 w-5 cursor-pointer hover:fill-red-500 transition" viewBox="0 0 20 20"
                             fill="currentColor"
                             onClick={event => {
                                 event.stopPropagation();
                                 setShowDeleteModal(true);
                             }}>
                            <path fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"/>
                        </svg>
                        <span
                            className={"h-6 w-16 bg-gray-800 text-blue-50 rounded-lg absolute text-center bottom-6 invisible group-hover:visible transition-all duration-100 ease-in-out"}>Delete</span>
                    </div>

                </div>
            </div>
            <EditNoteMenu showModal={showEditModal} setShowModal={setShowEditModal} handleEdit={props.handleEdit}
                          title={props.title} content={props.content}/>
            <PreviewNoteMenu showModal={showPreviewModal} setShowModal={setShowPreviewModal} title={props.title}
                             content={props.content}/>
            <ConfirmDeleteMenu showModal={showDeleteModal} setShowModal={setShowDeleteModal} handleDelete={props.handleDelete}/>
        </>
    );
}

export default Note;