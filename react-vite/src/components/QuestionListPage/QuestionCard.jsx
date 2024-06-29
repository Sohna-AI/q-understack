export default function QuestionCard({ title, details, tags, upVotes, downVotes,
    numAnswers, author, userId, createdAt, updatedAt, homePage }) {
    return (
        <div className="question-card">
            <div className="votes-answers__container">
                <p>{upVotes - downVotes} Votes</p>
                <p className={numAnswers > 0 ? 'answered' : ''}>
                    {numAnswers} {numAnswers === 1 ? 'Answer' : 'Answers'}
                </p>
            </div>
            <div className="title-tags__container">
                <h2>{title}</h2>
                {!homePage && <p>{details}</p>}
                <div className="tags__container">
                    {tags.map((tag) => {
                        return (
                            <div>
                                <p key={tag.id} className="tag">{tag.tag_name}</p>
                            </div>
                        )
                    })}
                </div>
                <p className="author">{author.username}</p>
            </div>
        </div>
    )
}