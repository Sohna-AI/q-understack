import { thunkDeleteComment, thunkEditComment } from "../../utils/store";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import './UpdateComment.css';

export default function UpdateCommentModal({ comment, questionId }) {
    const [textInput, setTextInput] = useState(comment.comment);
    const [confirm, setConfirm] = useState(false);
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSave = () => {
        if (textInput !== comment.comment) {
            const data = { comment: textInput };
            dispatch(thunkEditComment(JSON.stringify(data), comment.id, questionId))
                .then(() => closeModal());
        }
    };

    const handleDelete = () => {
        if (!confirm) {
            setConfirm(true);
        } else if (confirm) {
            dispatch(thunkDeleteComment(comment.id, questionId))
                .then(() => closeModal());
        }
    };

    return (<div className="flex column main-container gap-15 pad20">
        <h2>Update your comment</h2>
        <textarea type="text"
            id="update-comment-textarea"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
        />
        <div id="update-comment-buttons" className="flex gap-15">
            {!confirm && <>
                <button className="button" onClick={handleSave}>Save</button>
                <button className="button red" onClick={handleDelete}>Delete</button>
            </>
            }
            {confirm &&
                <div id="confirmation-container" className="flex gap-10 no-margin">
                    <p className="no-margin">Are you sure?</p>
                    <button className="button" onClick={handleDelete}>Yes</button>
                    <button className="button red" onClick={() => setConfirm(false)}>No</button>
                </div>
            }
        </div>
    </div>
    )
}
