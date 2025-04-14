import { useContext,  memo , useState} from "react";
import "./index.scss";
import { PlaygroundContext } from "../../../Providers/PlaygroundProvider";
import { modalConstants, ModalContext } from "../../../Providers/ModalProvider";
import { useNavigate } from "react-router-dom";

const Folder = memo(({ folderId, cards }) => {
  const { folders, deleteFolder ,deleteFile} = useContext(PlaygroundContext);
  const { openModal, setModalPayload } = useContext(ModalContext);
  const navigate=useNavigate();
  const folder = folders.find((f) => f.id === folderId); // Corrected here

  const onDeleteFolder = () => {
    deleteFolder(folderId); // Corrected here
  };

  const onEditFolderTitle = () => {
    setModalPayload(folderId); // Corrected here
    openModal(modalConstants.UPDATE_FOLDER_TITLE);
  };
   
  const openCreateCardModal=()=>{
    setModalPayload(folderId);
    openModal(modalConstants.CREATE_CARD);
  }
  return (
    <div className="folder-container">
      <div className="folder-header">
        <div className="folder-header-item">
          <span className="material-icons" style={{ color: "#FFA500" }}>
            folder
          </span>
          <span>{folder?.title}</span>
        </div>
        <div>
          <span className="material-icons" onClick={onDeleteFolder}>
            delete
          </span>
          <span className="material-icons" onClick={onEditFolderTitle}>
            edit
          </span>
          <button onClick={openCreateCardModal}>
          <span className="material-icons">add</span>
          <span>New Playground</span>
          </button>
        </div>
      </div>
      <div className="cards-container">
        {cards?.map((file, index) => {
          const onEditFile = () => {
            setModalPayload({ fileId: file.id, folderId });
            openModal(modalConstants.UPDATE_FILE_TITLE); 
          };
          
        const onDeleteFile=()=>{
          deleteFile(folderId,file.id);
        }
        const navigateToPlaygroundScreen=()=>{
          //TODO:navigate to next screen by passing the fileId,and folderId
          navigate(`/playground/${file.id}/${folderId}`)
        }
          return (
            <div className="card" key={index} onClick={navigateToPlaygroundScreen}>
              <img alt="Card Logo" />
              <div className="title-container">
                <span>{file?.title}</span>
                <span>Language: {file?.language}</span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <span className="material-icons" onClick={onDeleteFile}>delete</span>
                <span className="material-icons" onClick={onEditFile}>edit</span>
                <button onClick={openCreateCardModal}>
                  <span className="material-icons">add</span>
                  <span>New Playground</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});




export const RightContainer = () => {
  const { folders = [] } = useContext(PlaygroundContext); // Ensure folders is not undefined
  const modalFeatures = useContext(ModalContext);

  const handleAddFolder = () => {
    modalFeatures.openModal(modalConstants.CREATE_FOLDER);
  };

  return (
    <div className="right-container">
      <div className="header">
        <div className="title">
          <span>My</span> Playground
        </div>
        <button className="add-folder" onClick={handleAddFolder}>
          <span className="material-icons">add</span>
          <span>New Folder</span>
        </button>
      </div>
      {folders?.map((folder, index) => (
        <Folder folderTitle={folder?.title} cards={folder?.files} key={folder.id} folderId={folder.id} />
      ))}
    </div>
  );
};
