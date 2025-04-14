import { useContext } from "react";
import { modalConstants, ModalContext } from "../../Providers/ModalProvider";
import { Modal } from "../../Providers/Modals/Modal";
import "./index.scss";
import { RightContainer } from "./RightContainer";
export const HomeScreen = () => {
  const modalFeatures = useContext(ModalContext);
  const openCreatePlaygroundModal = () =>{
    modalFeatures.openModal(modalConstants.CREATE_PLAYGROUND);
  };
  return (
    <div className="home-container">
      <div className="left-container">
        <div className="items-container">
          {/* <img scr=""></img> */}
          <h1>Accijoin</h1>
          <h2>Code.Compile.Debug</h2>
          <button onClick={openCreatePlaygroundModal}>
            <span className="material-icons"></span>
            <span>Create Playground</span>
          </button>
        </div>
      </div>
      <RightContainer />
      <Modal />
    </div>
  );
};
