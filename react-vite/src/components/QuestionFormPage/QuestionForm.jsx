import { useEffect, useState } from "react";

export default function QuestionForm({ question }) {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [expectations, setExpectations] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (question) {
            setTitle(question.title);
            setDetails(question.details);
            setExpectations(question.expectations);
            setTags(question.tags);
        }

    }, [question])

    const handleSubmit = () => {

    }

    return (
        <>
            <div>
                <h1>Ask a question</h1>
                <h2>Don&apos;t ask well formed questions.  Expect wild answers.</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>What are the details of your problem?</label>
                    <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>What did you try? What were you expecting?</label>
                    <textarea
                        value={expectations}
                        onChange={(e) => setExpectations(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Tags</label>
                    <div>
                        {tags.map((tag) => <p key={tag}>tag</p>)}
                    </div>
                </div>
            </form>
        </>
    )
}
