import { useContext } from "react"
import "./createPlaygroundModal.scss"
import { ModalContext } from "../ModalProvider"
import { createFolderStyles } from "./CreateFolderModal"
import { PlaygroundContext } from "../PlaygroundProvider"

export const UpdateFileTitleModal = () => {
    const { closeModal, modalPayload } = useContext(ModalContext);
    const { editFileTitle } = useContext(PlaygroundContext);

    const onSubmitModal = (e) => {
        e.preventDefault();
        const fileName = e.target.fileName.value;
        editFileTitle(fileName, modalPayload.folderId, modalPayload.fileId);
        closeModal();
    }

    return (
        <div className="modal-container">
            <form className="modal-body" onSubmit={onSubmitModal}>
                <span onClick={closeModal} className="material-icons close">close</span>
                <h1>Update File Title</h1>
                <div style={createFolderStyles.inputContainer}>
                    <input
                        required
                        name="fileName"
                        defaultValue={modalPayload?.fileTitle}  // ✅ Pre-filling input
                        style={createFolderStyles.input}
                        placeholder="Enter file name"
                    />
                    <button type="submit">Update</button> {/* ✅ Clearer button label */}
                </div>
            </form>
        </div>
    )
}
