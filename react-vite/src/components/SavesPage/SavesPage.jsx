import { thunkGetSavedQuestions, thunkUnsaveQuestion } from '../../utils/store';
import * as questionActions from '../../redux/questions';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../redux/users';
import * as tagActions from '../../redux/tags';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SavesPage.css';

// TODO Implement pagination
const SavedQuestions = () => {
    const questions = useSelector(questionActions.selectQuestions);
    const sessionUser = useSelector((state) => state.session.user);
    const users = useSelector(userActions.selectUsers);
    const tags = useSelector(tagActions.selectTags);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionUser) {
            dispatch(thunkGetSavedQuestions()).then(() => {
                setIsLoaded(true);
            });
        }
    }, [dispatch, sessionUser]);

    const handleUnsave = (questionId) => {
        dispatch(thunkUnsaveQuestion(questionId));
    };

    return (
        <div>
            {isLoaded && (
                <>
                    <div>
                        {questions.allIds.length ? (
                            <div>
                                <h3 className="saved-question-counter">
                                    {questions.allIds.length} saved {questions.allIds.length === 1 ? 'question' : 'questions'}
                                </h3>
                                {questions.allIds.map((id) => {
                                    return (
                                        <div className="saved-question-container" key={questions.data[id].id}>
                                            <div className="saved-question-vote-answer-unsave-container">
                                                <div className="saved-question-vote-answer-container">
                                                    <p
                                                        className={
                                                            questions.data[id].num_votes <= 0
                                                                ? 'saved-question-vote-negative'
                                                                : 'saved-question-vote-positive'
                                                        }
                                                    >
                                                        {questions.data[id].num_votes} Votes
                                                    </p>
                                                    <p className={questions.data[id].num_answers > 0 ? 'saved-question-answered' : ''}>
                                                        {questions.data[id].num_answers} {questions.data[id].num_answers === 1 ? 'Answer' : 'Answers'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <button className="unsave-button" onClick={() => handleUnsave(questions.data[id].id)}>
                                                        Unsave
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="saved-question-title-tag-container">
                                                <NavLink to={`/questions/${questions.data[id].id}`} className="saved-question-title">
                                                    {questions.data[id].title}
                                                </NavLink>
                                                <div className="saved-question-tag-author-container">
                                                    <div className="saved-question-tag-container">
                                                        {questions.data[id].tags.map((id) => (
                                                            <p className="saved-question-tag" key={id}>
                                                                {tags.data[id].tag_name}
                                                            </p>
                                                        ))}
                                                    </div>
                                                    <div className="saved-question-author">{users.data[questions.data[id].user_id].username}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p>No Saved questions</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default SavedQuestions;
