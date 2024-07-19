import { thunkGetSaves } from '../../utils/store';
import * as questionActions from '../../redux/questions';
import { useDispatch, useSelector } from 'react-redux';
import * as answerActions from '../../redux/answers';
import * as userActions from '../../redux/users';
import * as tagActions from '../../redux/tags';
import * as saveActions from '../../redux/saves';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SavesPage.css';
import OpenModalButton from '../OpenModalButton';
import UnsaveQuestionModal from '../UnsaveQuestionModal/UnsaveQuestionModal.jsx';
import DeleteAnswerModal from '../DeleteAnswerModal/DeleteAnswerModal.jsx';

// TODO Implement pagination
const SavesPage = () => {
  const questions = useSelector(questionActions.selectQuestions);
  const sessionUser = useSelector((state) => state.session.user);
  const answers = useSelector(answerActions.selectAnswers);
  const users = useSelector(userActions.selectUsers);
  const tags = useSelector(tagActions.selectTags);
  const saves = useSelector(saveActions.selectSaves);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionUser) {
      dispatch(thunkGetSaves()).then(() => {
        setIsLoaded(true);
      });
    }
  }, [dispatch, sessionUser]);

  useEffect(() => { }, [answers]);

  return (
    <div>
      {isLoaded && (
        <>
          <div>
            {saves.allIds.questions.length ? (
              <div>
                <h3 className="saved-question-counter">
                  {saves.allIds.questions.length} saved{' '}
                  {saves.allIds.questions.length === 1 ? 'question' : 'questions'}
                </h3>
                <div id="saved-questions__container">
                  {saves.allIds.questions.map((id) => {
                    return (
                      <div className="saved-question-container" key={id}>
                        <div className="saved-question-vote-answer-unsave-container">
                          <div className="saved-question-vote-answer-container">
                            <div
                              className={
                                questions.data[saves.data.questions[id].question]?.num_votes <= 0
                                  ? 'saved-question-vote-negative'
                                  : 'saved-question-vote-positive'
                              }
                            >
                              <span style={{ paddingRight: '3px' }}>
                                {questions.data[saves.data.questions[id].question]?.num_votes}
                              </span>
                              {questions.data[saves.data.questions[id].question]?.num_votes <= 1
                                ? 'vote'
                                : 'votes'}
                            </div>
                            <p
                              className={
                                questions.data[saves.data.questions[id].question]?.answers.length > 0
                                  ? 'saved-question-answered'
                                  : ''
                              }
                            >
                              {questions.data[saves.data.questions[id].question]?.answers.length}{' '}
                              {questions.data[saves.data.questions[id].question]?.answers.length === 1
                                ? 'Answer'
                                : 'Answers'}
                            </p>
                          </div>
                          <div>
                            <OpenModalButton
                              modalComponent={
                                <UnsaveQuestionModal
                                  questionId={questions.data[saves.data.questions[id].question]?.id}
                                />
                              }
                            >
                              <svg viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path>
                              </svg>
                            </OpenModalButton>
                          </div>
                        </div>
                        <div className="saved-question-title-tag-container">
                          <NavLink
                            to={`/questions/${saves.data.questions[id].question}`}
                            className="saved-question-title"
                          >
                            {questions.data[saves.data.questions[id].question]?.title}
                          </NavLink>
                          <div className="saved-question-tag-author-container">
                            <div className="saved-question-tag-container">
                              {questions.data[saves.data.questions[id].question]?.tags.map((id) => (
                                <p className="saved-question-tag" key={id}>
                                  {tags.data[id].tag_name}
                                </p>
                              ))}
                            </div>
                            <div className="saved-question-author">
                              {
                                users.data[questions.data[saves.data.questions[id].question]?.user_id]?.username
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="saved-question-container">No Saved questions</p>
            )}
            {isLoaded && (
              <>
                {saves.allIds.answers.length > 0 ? (
                  <div>
                    <h3 className="saved-answer-counter">
                      {saves.allIds.answers.length} saved{' '}
                      {saves.allIds.answers.length === 1 ? 'answer' : 'answers'}
                    </h3>
                    {saves.allIds.answers.map((id) => {
                      return (
                        <div className="saved-answer-container" key={id}>
                          <div className="saved-answer-vote-answer-unsave-container">
                            <div className="saved-answer-vote-answer-container">
                              <div
                                className={
                                  answers.data[saves.data.answers[id].answer]?.num_votes <= 0
                                    ? 'saved-answer-vote-negative'
                                    : 'saved-answer-vote-positive'
                                }
                              >
                                <span style={{ paddingRight: '3px' }}>
                                  {answers.data[saves.data.answers[id].answer]?.num_votes}
                                </span>
                                {answers.data[saves.data.answers[id].answer]?.num_votes <= 1
                                  ? 'vote'
                                  : 'votes'}
                              </div>
                              <p
                                className={
                                  answers.data[saves.data.answers[id].answer]?.comments > 0
                                    ? 'saved-answer-commented'
                                    : ''
                                }
                              >
                                {answers.data[saves.data.answers[id].answer]?.comments}{' '}
                                {answers.data[saves.data.answers[id].answer]?.comments === 1
                                  ? 'Comment'
                                  : 'Comments'}
                              </p>
                            </div>
                            <div>
                              <OpenModalButton
                                modalComponent={
                                  <DeleteAnswerModal
                                    answerId={answers.data[saves.data.answers[id].answer]?.id}
                                  />
                                }
                              >
                                <svg viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path>
                                </svg>
                              </OpenModalButton>
                            </div>
                          </div>
                          <div className="saved-answer-title-tag-container">
                            <NavLink
                              to={`/answers/${answers.data[saves.data.answers[id].answer]?.id}`}
                              className="saved-answer-title"
                            >
                              {answers.data[saves.data.answers[id].answer]?.text}
                            </NavLink>
                            <div className="saved-answer-title-author-container">
                              <div className="saved-answer-question-title-container">
                                <div>
                                  <div className="question-marker">Question:</div>
                                  <NavLink
                                    to={`/questions/${saves.data.answers[id].answer
                                      }`}
                                    className="saved-answer-question-title"
                                  >
                                    {answers.data[saves.data.answers[id].answer]?.question.title}
                                  </NavLink>
                                </div>
                                <div className="saved-answer-author">
                                  <div>{answers.data[saves.data.answers[id].answer]?.user.username}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="saved-answer-container saved-question-container">No Saved answers.</p>
                )}
              </>
            )}
          </div>
        </>
      )}
      {!isLoaded && <div className="saved-question-container">Loading...</div>}
    </div>
  );
};

export default SavesPage;
