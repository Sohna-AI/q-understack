import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteComment } from '../../utils/store';

const DeleteCommentModal = ({ commentId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(thunkDeleteComment(commentId));
    closeModal();
  };

  return (
    <>
      <div>
        <div className="delete-comment-modal-container">
          <h1 className="title">Confirm Unsave</h1>
          <h3 className="subtitle">Are you sure you want to unsave this comment?</h3>
          <div className="delete-cancel-button-container">
            <div className="delete-comment-button-container">
              <button onClick={handleDelete} className="delete-comment-button">
                Unsave
              </button>
            </div>
            <div className="delete-comment-cancel-button-container">
              <button onClick={closeModal} className="delete-comment-cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCommentModal;
