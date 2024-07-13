import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSavedQuestions, thunkUnsaveQuestion } from '../../redux/savedQuestion';
import { NavLink } from 'react-router-dom';
import './SavesPage.css';

// TODO Implement pagination
const SavedQuestions = () => {
  const dispatch = useDispatch();
  const savedQuestions = useSelector((state) => state.savedQuestions.questions);
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (user) {
      dispatch(thunkGetSavedQuestions()).then(() => {
        setIsLoaded(true);
      });
    }
  }, [dispatch]);

  const handleUnsave = (questionId) => {
    dispatch(thunkUnsaveQuestion(questionId));
  };

  return (
    <div>
      {isLoaded && (
        <>
          <div>
            {savedQuestions.length ? (
              <div>
                <h3 className="saved-question-counter">
                  {savedQuestions.length} saved {savedQuestions.length === 1 ? 'question' : 'questions'}
                </h3>
                {savedQuestions.map((question) => {
                  return (
                    <div className="saved-question-container" key={question.id}>
                      <div className="saved-question-vote-answer-unsave-container">
                        <div className="saved-question-vote-answer-container">
                          <p
                            className={
                              question.num_votes <= 0
                                ? 'saved-question-vote-negative'
                                : 'saved-question-vote-positive'
                            }
                          >
                            {question.num_votes} Votes
                          </p>
                          <p className={question.num_answers > 0 ? 'saved-question-answered' : ''}>
                            {question.num_answers} {question.num_answers === 1 ? 'Answer' : 'Answers'}
                          </p>
                        </div>
                        <div>
                          <button className="unsave-button" onClick={() => handleUnsave(question.id)}>
                            Unsave
                          </button>
                        </div>
                      </div>
                      <div className="saved-question-title-tag-container">
                        <NavLink to={`/questions/${question.id}`} className="saved-question-title">
                          {question.title}
                        </NavLink>
                        <div className="saved-question-tag-author-container">
                          <div className="saved-question-tag-container">
                            {question.tags.map((tag) => (
                              <p className="saved-question-tag" key={tag.id}>
                                {tag.tag_name}
                              </p>
                            ))}
                          </div>
                          <div className="saved-question-author">{question.author.username}</div>
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
