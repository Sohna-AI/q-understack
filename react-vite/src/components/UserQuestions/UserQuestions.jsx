import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetUserQuestions } from '../../utils/store';
import { NavLink } from 'react-router-dom';
import * as questionActions from '../../redux/questions';
import * as tagActions from '../../redux/tags';
import './UserQuestion.css';
import DeleteQuestionModal from '../DeleteQuestionModal/DeleteQuestionModal';
import OpenModalButton from '../OpenModalButton';

// TODO Implement pagination
const UserQuestions = () => {
  const dispatch = useDispatch();
  const questions = useSelector(questionActions.selectQuestions);
  const tags = useSelector(tagActions.selectTags);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (sessionUser) {
      dispatch(thunkGetUserQuestions()).then(() => {
        setIsLoaded(true);
      });
    }
  }, [dispatch, sessionUser]);

  return (
    <div>
      {isLoaded && (
        <>
          <div>
            {questions.allIds.length ? (
              <div>
                <h3 className="user-question-counter">
                  {questions.allIds.length} {questions.allIds.length === 1 ? 'question' : 'questions'}
                </h3>
                {questions.allIds.map((id) => {
                  return (
                    <div className="user-question-container" key={id}>
                      <div className="user-question-vote-answer-edit-container">
                        <div className="user-question-vote-answer-container">
                          <div
                            className={
                              questions.data[id].num_votes <= 0
                                ? 'user-question-vote-negative'
                                : 'user-question-vote-positive'
                            }
                          >
                            {questions.data[id].num_votes} Votes
                          </div>
                          <div
                            className={
                              questions.data[id].num_answers <= 0
                                ? 'user-question-answered-negative'
                                : 'user-question-answered-positive'
                            }
                          >
                            {questions.data[id].num_answers}{' '}
                            {questions.data[id].num_answers === 1 ? 'Answer' : 'Answers'}
                          </div>
                        </div>
                        <div>
                          <NavLink to={`/questions/${id}/edit`}>
                            <button className="user-question-edit-button">
                              <svg height="1em" viewBox="0 0 512 512">
                                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                              </svg>
                            </button>
                          </NavLink>
                        </div>
                      </div>
                      <div className="user-question-title-tag-container">
                        <NavLink to={`/questions/${id}`} className="user-question-title">
                          {questions.data[id].title}
                        </NavLink>
                        <div className="user-question-tag-delete-container">
                          <div className="user-question-tag-container">
                            {questions.data[id].tags.map((id) => (
                              <p className="user-question-tag" key={id}>
                                {tags.data[id].tag_name}
                              </p>
                            ))}
                          </div>
                          <div>
                            <OpenModalButton modalComponent={<DeleteQuestionModal questionId={id} />}>
                              <svg
                                className="bin-top"
                                viewBox="0 0 39 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4"></line>
                                <line
                                  x1="12"
                                  y1="1.5"
                                  x2="26.0357"
                                  y2="1.5"
                                  stroke="white"
                                  strokeWidth="3"
                                ></line>
                              </svg>
                              <svg
                                className="bin-bottom"
                                viewBox="0 0 33 39"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <mask id="path-1-inside-1_8_19" fill="white">
                                  <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                                </mask>
                                <path
                                  d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                  fill="white"
                                  mask="url(#path-1-inside-1_8_19)"
                                ></path>
                                <path d="M12 6L12 29" stroke="white" strokeWidth="4"></path>
                                <path d="M21 6V29" stroke="white" strokeWidth="4"></path>
                              </svg>
                            </OpenModalButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>You have not asked any question</p>
            )}
          </div>
        </>
      )}
      {!isLoaded && <div style={{ height: '100vh' }} className="user-question-container" />}
    </div>
  );
};

export default UserQuestions;
