import { useState } from "react"
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkEditAnswer } from "../../utils/store";

export default function UpdateAnswerModal({ answer }) {
    const [textInput, setTextInput] = useState(answer.text)
    const { closeModal } = useModal()
    const dispatch = useDispatch();

    const handleSave = () => {
        if (textInput !== answer.text) {
            const data = { text: textInput }
            dispatch(thunkEditAnswer(JSON.stringify(data), answer.id, answer.question_id))
                .then(() => closeModal())
        }
    };

    return (<div className="flex column">
        <h1>Update your answer</h1>
        <label>Text</label>
        <input type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
    </div>
    )
}
