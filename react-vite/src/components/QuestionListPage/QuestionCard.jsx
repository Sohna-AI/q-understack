import { useNavigate } from "react-router-dom";

export default function QuestionCard({ id, title, details, tags, num_votes,
    numAnswers, author, homePage }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/questions/${id}`)
    }

    return (
        <div className="question-card">
            <div className="votes-answers__container">
                <p>{num_votes} Votes</p>
                <p className={numAnswers > 0 ? 'answered' : ''}>
                    {numAnswers} {numAnswers === 1 ? 'Answer' : 'Answers'}
                </p>
            </div>
            <div className="title-tags__container">
                <h2 onClick={handleClick}>{title}</h2>
                {!homePage && <p>{details}</p>}
                <div className="tags__container">
                    {tags.map((tag) => {
                        return (
                            <div key={tag.id}>
                                <p className="tag">{tag.tag_name}</p>
                            </div>
                        )
                    })}
                </div>
                <p className="author">{author.username}</p>
            </div>
        </div>
    )
}