import React, {FC} from "react";
import ReactModal from "react-modal";
import {INote} from "../../main/App";
import useShortenTitle from "../../../hooks/useShortenTitle";

interface IEditModalProps extends INote{
    showModal: boolean;
    setShowModal: (state: boolean) => void;
}

const PreviewNoteMenu:FC<IEditModalProps> = (props) => {
    const shortenTitle = useShortenTitle();

    return (
        <ReactModal isOpen={props.showModal} shouldCloseOnOverlayClick={false} ariaHideApp={false} className={"default-overlay-properties edit-and-preview-overlay"} onRequestClose={() => props.setShowModal(false)}>
            <div className={"flex flex-col h-full"}>
                <div className={"flex flex-col overflow-auto space-y-10 items-center"}>
                    <p className={"text-xl text-center md:text-3xl font-bold"}>{shortenTitle(props.title)}</p>
                    <p className={"text-lg md:text-2xl self-start"}>{props.content}</p>
                </div>
                <div className={"flex mt-auto items-end justify-end"}>
                    <button className={"text-xl bg-red-500 h-8 w-16 rounded-lg hover:bg-red-600 transition"}
                            onClick={() => props.setShowModal(false)}>Close
                    </button>
                </div>
            </div>
        </ReactModal>
    )
}

export default PreviewNoteMenu;