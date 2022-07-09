import React, {FC} from "react";
import ReactModal from "react-modal";

//TODO: Add a modal to confirm deleting a note

interface IConfirmDeleteMenuProps {
    showModal: boolean;
    setShowModal: (state: boolean) => void;
    handleDelete: () => void;
}

const ConfirmDeleteMenu: FC<IConfirmDeleteMenuProps> = (props) => {
    return (
        <ReactModal isOpen={props.showModal} ariaHideApp={false} className={"default-overlay-properties cancel-and-delete-overlay"}
                    onRequestClose={() => props.setShowModal(false)}>
            <div className={"w-full h-full flex flex-col items-center"}>
                <h1 className={"text-2xl"}>Are you sure you want to delete this note? <span className={"font-bold"}>This action cannot be undone.</span>
                </h1>
                <div className={"flex self-center md:self-end mt-auto space-x-3"}>
                    <button className={"bg-green-400 rounded-lg p-2 text-lg transition ease-in-out hover:bg-green-700"} onClick={() => props.setShowModal(false)}>
                        Cancel
                    </button>
                    <button className={"bg-red-500 rounded-lg p-2 text-lg font-bold hover:bg-red-600 transition ease-in-out"} onClick={() => {
                        props.handleDelete();
                        props.setShowModal(false);
                    }}>
                        Delete
                    </button>
                </div>
            </div>
        </ReactModal>
    );
}
export default ConfirmDeleteMenu;