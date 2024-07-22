import { thunkDeleteAnswer, thunkEditAnswer } from "../../utils/store";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import './UpdateAnswer.css';

export default function UpdateAnswerModal({ answer }) {
    const [textInput, setTextInput] = useState(answer.text);
    const [confirm, setConfirm] = useState(false);
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSave = () => {
        if (textInput !== answer.text) {
            const data = { text: textInput };
            dispatch(thunkEditAnswer(JSON.stringify(data), answer.id, answer.question_id))
                .then(() => closeModal());
        }
    };

    const handleDelete = () => {
        if (!confirm) {
            setConfirm(true);
        } else if (confirm) {
            dispatch(thunkDeleteAnswer(answer.id, answer.question_id))
                .then(() => closeModal());
        }
    };

    return (<div className="flex column main-container">
        <h2>Update your answer</h2>
        <textarea type="text"
            id="update-answer-textarea"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
        />
        <div id="update-answer-buttons" className="flex gap-15">
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
