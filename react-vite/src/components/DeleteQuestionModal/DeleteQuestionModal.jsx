import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteQuestion } from '../../utils/store';
import './DeleteQuestionModal.css';

const DeleteQuestionModal = ({ questionId, navigateOnDelete, detailsPage }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const confirmDelete = () => {
    dispatch(thunkDeleteQuestion(questionId));
    closeModal();
    if (detailsPage) {
      return navigateOnDelete();
    }
  };

  return (
    <>
      <div>
        <div className="delete-modal-container">
          <h1 className="title">Confirm Delete</h1>
          <h3 className="subtitle">Are you sure you want to delete this question?</h3>
          <div className='delete-cancel-button-container'>
            <div className="delete-question-button-container">
              <button onClick={confirmDelete} className="delete-question-button">
                Delete
              </button>
            </div>
            <div className="delete-question-cancel-button-container">
              <button onClick={closeModal} className="delete-question-cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteQuestionModal;
