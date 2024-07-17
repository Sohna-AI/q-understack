import * as questionActions from '../../redux/questions';
import { thunkCreateQuestion, thunkGetQuestionDetailsById, thunkUpdateQuestion } from "../../utils/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './QuestionForm.css';

export default function QuestionForm({ edit }) {
    const editId = useParams()['questionId'];
    const questions = useSelector(questionActions.selectQuestions).data[editId];
    const [expectations, setExpectations] = useState('');
    const [isCreated, setIsCreated] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [details, setDetails] = useState('');
    const [errors, setErrors] = useState({});
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // TODO check sessionUser validity

    useEffect(() => {
        if (edit) {
            dispatch(thunkGetQuestionDetailsById(+editId)).then((data) => {
                const tags = [];
                for (let tag of data.tags) {
                    tags.push(tag.tag_name)
                }
                setExpectations(data.expectation);
                setDetails(data.details);
                setTitle(data.title);
                setTags(tags);
            })
        }
    }, [editId, dispatch, edit, navigate]);

    useEffect(() => {
        if (isCreated && !edit) {
            const id = questions.data[questions.allIds[questions.allIds.length - 1]].id
            navigate(`/questions/${id}`)
        } else if (isCreated) {
            navigate(`/questions/${editId}`)
        }
    }, [isCreated, navigate, questions, edit, editId])

    const addTag = (e) => {
        setErrors({});
        e.preventDefault();
        if (tags.length < 5 && tagInput.length > 1) {
            setTags([...tags, tagInput]);
            setTagInput('');
        } else if (tagInput.length <= 1) {
            setErrors({ tags: 'Tag name too short.' })
        } else {
            setErrors({ tags: 'Too many tags.' });
        }
    };

    const removeTag = (e) => {
        setErrors({});
        const tag = e.target.previousSibling.innerText
        const index = tags.indexOf(tag)
        let arr = tags.slice();
        arr.splice(index, 1);
        setTags(arr);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const data = {
            title: title,
            details: details,
            expectation: expectations,
            tags: tags
        };
        if (edit) {
            await dispatch(thunkUpdateQuestion(JSON.stringify(data), editId))
                .then(() => setIsCreated(true))
        } else {
            await dispatch(thunkCreateQuestion(JSON.stringify(data)))
                .then(() => setIsCreated(true))
        }
    };

    return (
        <div id="question-form-page" className="flex column">
            <div>
                {edit ? <h1>Update question</h1> : <h1>Ask a question</h1>}
                <h2>Don&apos;t ask well formed questions.  Expect wild answers.</h2>
            </div>
            <form className="flex column gap-15" onSubmit={handleSubmit}>
                <div className="flex column gap-15">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {errors.title && <p className="errors">{errors.title}</p>}
                </div>
                <div className="flex column gap-15">
                    <label>What are the details of your problem?</label>
                    <textarea
                        className="question-textarea"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required
                    />
                    {errors.details && <p className="errors">{errors.details}</p>}
                </div>
                <div className="flex column gap-15">
                    <label>What did you try? What were you expecting?</label>
                    <textarea
                        className="question-textarea"
                        value={expectations}
                        onChange={(e) => setExpectations(e.target.value)}
                        required
                    />
                    {errors.expectations && <p className="errors">{errors.expectations}</p>}
                </div>
                <div className="flex column gap-15">
                    <label>Tags</label>
                    <div className="flex column gap-15">
                        <div className="flex gap-15">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                            />
                            <button className="button" onClick={addTag}>Add tag</button>
                        </div>
                        <div className="flex gap-15">
                            {tags.map((tag, i) => {
                                return (
                                    <div key={`${i}:${tag}`} name={i} className="tag flex">
                                        <p className="no-margin tag-text">{tag}</p>
                                        <p onClick={removeTag} className="no-margin x-button">X</p>
                                    </div>
                                )
                            })}
                        </div>
                        {errors.tags && <p className="errors">{errors.tags}</p>}
                    </div>
                </div>
                <button className="button" type="submit">Submit</button>
            </form>
        </div>
    );
}
