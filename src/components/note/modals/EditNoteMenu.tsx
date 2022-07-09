import React, {FC, useEffect, useState} from "react";
import ReactModal from "react-modal";
import {INote} from "../../main/App";
import CancelEditingMenu from "./CancelEditingMenu";

type FormInput = HTMLInputElement | HTMLTextAreaElement;
type ErrorMessage = "Fields cannot be empty" | "You must edit something before saving" | undefined;

interface IEditModalProps extends INote {
    showModal: boolean;
    setShowModal: (state: boolean) => void;
    handleEdit: (title: string, content: string) => void;
}

const EditNoteMenu: FC<IEditModalProps> = (props) => {
    const [editContent, setEditContent] = useState<INote>({title: props.title, content: props.content});
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>(undefined);
    const [cancelModal, setCancelModal] = useState<boolean>(false);
    const handleChange = (event: React.ChangeEvent<FormInput>) => {
        const {name, value} = event.target;
        setEditContent(prevData => ({...prevData, [name]: value}));
    }

    useEffect((): void => {
        if (editContent.title.length === 0 || editContent.content.length === 0) {
            setErrorMessage("Fields cannot be empty");
            return;
        }
        if (editContent.title === props.title && editContent.content === props.content) {
            setErrorMessage("You must edit something before saving");
            return;
        }
        setErrorMessage(undefined);
    }, [editContent]);

    const validateChanges = (): boolean => {
        if (editContent.title.length === 0 || editContent.content.length === 0) return false;
        return !(editContent.title === props.title && editContent.content === props.content);
    }

    const handleRequestClose = (): void => {
        if (props.title !== editContent.title || props.content !== editContent.content) {
            setCancelModal(true);
        } else {
            props.setShowModal(false);
        }
    }

    return (
        <ReactModal isOpen={props.showModal} onRequestClose={handleRequestClose} ariaHideApp={false}
                    shouldCloseOnOverlayClick={false} className={"default-overlay-properties edit-and-preview-overlay"}>
            <div className={"flex flex-col h-full w-full"}>
                <section className={"h-4/5"}>
                    <div className={"flex flex-col md:flex-row items-center md:space-x-3 justify-center"}>
                        <label htmlFor={"title"} className={"tex-xl md:text-3xl font-bold"}>Editing:</label>
                        <input type="text" name="title" value={editContent.title} className={"h-6 md:h-10 w-5/6 md:w-auto text-base md:text-3xl"}
                               onChange={handleChange}/>
                    </div>
                    <div className={"flex flex-col items-center justify-center space-y-2 h-full"}>
                        <label htmlFor={"content"} className={"text-base md:text-3xl font-bold"}>Content</label>
                        <textarea name="content" value={editContent.content}
                                  className={"text-base md:text-2xl h-4/5 md:h-full w-5/6 resize-none"} onChange={handleChange}/>
                    </div>
                </section>
                <div className={"flex mt-auto justify-center md:justify-end space-x-6"}>
                    <div className={"group flex flex-col justify-center items-center w-max"}>
                        <div
                            className={"flex items-center justify-center absolute bg-gray-800 bottom-20 text-white invisible group-hover:visible transition-all ease-in-out rounded-lg"}>
                            {errorMessage && <p className={"text-center px-3"}>{errorMessage}</p>}
                        </div>
                        <button
                            className={"text-xl bg-green-400 h-10 w-20 rounded-lg enabled:hover:bg-green-700 transition disabled:opacity-75"}
                            disabled={!validateChanges()}
                            onClick={() => {
                                props.handleEdit(editContent.title, editContent.content);
                                props.setShowModal(false);
                            }}>Save
                        </button>
                    </div>

                    <button className={"text-xl bg-red-500 h-10 w-20 rounded-lg hover:bg-red-600 transition"}
                            onClick={handleRequestClose}>Cancel
                    </button>
                </div>
            </div>
            <CancelEditingMenu showModal={cancelModal} setShowModal={setCancelModal}
                               resetForm={() => setEditContent({title: props.title, content: props.content})}
                               closeEditModal={() => props.setShowModal(false)}/>
        </ReactModal>
    )
}

export default EditNoteMenu;