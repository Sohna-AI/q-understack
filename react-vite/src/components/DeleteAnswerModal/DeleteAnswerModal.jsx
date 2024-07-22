import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkUnsaveAnswer } from '../../utils/store';
import './DeleteAnswerModal.css';

const DeleteAnswerModal = ({ questionId, answerId, navigateOnDelete, detailsPage }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleUnsave = () => {
    dispatch(thunkUnsaveAnswer(questionId, answerId));
    closeModal();
    if (detailsPage) {
      return navigateOnDelete;
    }
  };

  return (
    <>
      <div>
        <div className="unsave-answer-modal-container">
          <h1 className="title">Confirm Unsave</h1>
          <h3 className="subtitle">Are you sure you want to unsave this answer?</h3>
          <div className="unsave-cancel-button-container">
            <div className="unsave-answwer-button-container">
              <button onClick={handleUnsave} className="unsave-answer-button">
                Unsave
              </button>
            </div>
            <div className="unsave-answer-cancel-button-container">
              <button onClick={closeModal} className="unsave-answer-cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAnswerModal;
