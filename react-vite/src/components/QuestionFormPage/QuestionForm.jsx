import { useEffect, useState } from "react";
import './QuestionForm.css';

export default function QuestionForm({ question }) {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [expectations, setExpectations] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (question) {
            setTitle(question.title);
            setDetails(question.details);
            setExpectations(question.expectations);
            setTags(question.tags);
        }

    }, [question]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
    };

    return (
        <div id="question-form-page" className="flex column">
            <div>
                {question ? <h1>Update question</h1> : <h1>Ask a question</h1>}
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
