import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkUnsaveQuestion } from '../../utils/store';
import './UnsaveQuestionModal.css';

const UnsaveQuestionModal = ({ questionId, navigateOnDelete, detailsPage }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleUnsave = () => {
    dispatch(thunkUnsaveQuestion(questionId));
    closeModal();
    if (detailsPage) {
      return navigateOnDelete;
    }
  };

  return (
    <>
      <div>
        <div className="unsave-question-modal-container">
          <h1 className="title">Confirm Unsave</h1>
          <h3 className="subtitle">Are you sure you want to unsave this question?</h3>
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

export default UnsaveQuestionModal;
