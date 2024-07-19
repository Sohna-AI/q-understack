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
        <h1>Update your answer</h1>
        <label>Text</label>
        <input type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        {!confirm && <button onClick={handleDelete}>Delete</button>}
        {confirm &&
            <div className="flex">
                <p>Are you sure?</p>
                <button onClick={handleDelete}>Yes</button>
                <button onClick={() => setConfirm(false)}>No</button>
            </div>
        }
    </div>
    )
}
