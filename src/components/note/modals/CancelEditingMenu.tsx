import React, {FC} from "react";
import ReactModal from "react-modal";

interface ICancelProps {
    showModal: boolean;
    setShowModal: (state: boolean) => void;
    resetForm: () => void;
    closeEditModal: () => void;
}


const CancelEditingMenu: FC<ICancelProps> = (props) => {
    return (
        <ReactModal isOpen={props.showModal} className={"default-overlay-properties cancel-and-delete-overlay"}
                    onRequestClose={() => props.setShowModal(false)} ariaHideApp={false}
                    shouldCloseOnOverlayClick={false}>
            <div className={"flex flex-col items-center h-full w-full"}>
                <h1 className={"text-2xl"}>Are you sure you want to cancel editing? <span className={"font-bold"}>Unsaved data will be lost.</span>
                </h1>
                <div className={"flex self-center md:self-end mt-auto space-x-3"}>
                    <button className={"bg-green-400 rounded-lg p-2 text-lg transition ease-in-out hover:bg-green-700"}
                            onClick={() => props.setShowModal(false)}>Keep editing
                    </button>
                    <button
                        className={"bg-red-500 rounded-lg p-2 text-lg font-bold hover:bg-red-600 transition ease-in-out"}
                        onClick={() => {
                            props.setShowModal(false);
                            props.resetForm();
                            props.closeEditModal();
                        }}>Cancel
                    </button>
                </div>
            </div>
        </ReactModal>
    )
}

export default CancelEditingMenu;