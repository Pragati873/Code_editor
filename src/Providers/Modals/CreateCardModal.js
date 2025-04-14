import { useContext } from "react"
import { v4 } from 'uuid';
import "./createPlaygroundModal.scss"
import { ModalContext } from "../ModalProvider"
import { defaultCodes, PlaygroundContext } from "../PlaygroundProvider"
export const CreateCardModal=()=>{
    const {closeModal,modalPayload}=useContext(ModalContext)
    const {createPlayground}=useContext(PlaygroundContext);
    const onSubmitModal=(e)=>{
        e.preventDefault();
        const fileName=e.target.fileName.value;
        const language=e.target.fileName.value;

        const file={
            id:v4(),
            title:fileName,
            language,
            code:defaultCodes[language]
        }
        createPlayground(modalPayload,file);
        closeModal();
    };
    return <div className="modal-container">
        <form className="modal-body" onSubmit={onSubmitModal}>
        <span onClick={closeModal} className="material-icons close">close</span>
        <h1>Create New Playground</h1>

    <div className="item">
        <p>Enter card name</p>
        <input name="fileName" placeholder="Enter card title" required/>
    </div>
    <div>
        <select name="language" required >
            <option value="cpp">CPP</option>
            <option value="java">JAVA</option>
            <option value="javascript">Js</option>
            <option value="Python">Python</option>
        </select>
        <button>
            Create Playground
        </button>
    </div>
        </form>
    </div>
}