import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { thunkPostComment } from "../../utils/store";

export default function CommentInput({ type, typeId, questionId }) {
    const sessionUser = useSelector((state) => state.session.user);
    const [commentInput, setCommentInput] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleKeyPress = (e) => {
        setErrors({});
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            setCommentInput(commentInput.substring(0, start) + '    ' + commentInput.substring(end));
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 4;
            }, 0)
        }
    }

    const handlePostComment = async () => {
        setErrors({});
        const data = { comment: commentInput, type, typeId };
        const res = await dispatch(thunkPostComment(JSON.stringify(data), questionId));
        if (res.comment) setErrors(res);
        setCommentInput('');
    };

    return (<div className="mleft100 flex column gap-15 mtop15">
        <textarea
            name="comment"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onClick={() => setErrors({})}
            onKeyDown={handleKeyPress}
            placeholder={`Comment on ${type} here`}
            cols={50}
        />
        {errors.comment && <p className='errors'>{errors.comment}</p>}
        {sessionUser && <button className="button aselfend" onClick={handlePostComment}>comment</button>}
        {!sessionUser && (
            <span className="flex gap-10 aselfend acenter">
                <OpenModalButton modalComponent={<SignupFormModal />} buttonText="Sign up" />
                {' or '}
                <OpenModalButton modalComponent={<LoginFormModal />} buttonText="Log In" />
            </span>
        )}
    </div>)
}
