import { useModal } from '../../context/Modal';
import './OpenModalButton.css';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  children,
  editAnswer,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === 'function') onButtonClick();
  };

  return (
    <>
      {(!editAnswer && buttonText) && (
        <button className="modal_button button" onClick={onClick}>
          {buttonText}
        </button>
      )}
      {(!editAnswer && children) && (
        <button className="modal_button_delete" onClick={onClick}>
          {children}
        </button>
      )}
      {editAnswer && (
        <button className="modal_button user-answer-edit-button" onClick={onClick}>
          {buttonText}
        </button>
      )}
    </>
  );
}

export default OpenModalButton;
