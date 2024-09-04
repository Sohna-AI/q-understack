import {
  thunkPostAnswer,
  thunkGetQuestionDetailsById,
  thunkSaveQuestion,
  thunkUnsaveQuestion,
  thunkSaveAnswer,
  thunkUnsaveAnswer,
  thunkVoteQuestion,
  thunkGetQuestionVotes,
  thunkRemoveQuestionVote,
} from '../../utils/store';
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaRegArrowAltCircleUp,
  FaBookmark,
  FaRegBookmark,
} from 'react-icons/fa';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import UpdateAnswerModal from '../UpdateAnswer/UpdateAnswer';
import * as questionActions from '../../redux/questions';
import * as commentActions from '../../redux/comments';
import { useDispatch, useSelector } from 'react-redux';
import * as answerActions from '../../redux/answers';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import * as userActions from '../../redux/users';
import * as tagActions from '../../redux/tags';
import * as voteActions from '../../redux/votes';
import LoginFormModal from '../LoginFormModal';
import RenderMarkdown from '../RenderMarkdown';
import { useEffect, useState } from 'react';
import './QuestionDetailPage.css';
import CommentInput from '../CommentInput/CommentInput';
import UpdateCommentModal from '../CommentInput/UpdateCommentModal';

export default function QuestionDetailPage() {
  const { questionId } = useParams();
  const question = useSelector(questionActions.selectQuestions)?.data[questionId];
  const user = useSelector(userActions.selectUsers).data[question?.user_id];
  const sessionUser = useSelector((state) => state.session.user);
  const comments = useSelector(commentActions.selectComments);
  const answers = useSelector(answerActions.selectAnswers);
  const tags = useSelector(tagActions.selectTags).data;
  const totalVotes = useSelector(voteActions.selectVotes);
  const votes = useSelector(voteActions.selectVotesObj);
  const userVote = Object.values(votes).find((vote) => vote.user_id === sessionUser?.id);
  const [answerInput, setAnswerInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const questionAuthor = sessionUser.id === question?.user_id;

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = new Date(question?.created_at).toLocaleDateString(undefined, options);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(thunkGetQuestionDetailsById(questionId)).then(() => setIsLoaded(true));
      dispatch(thunkGetQuestionVotes(questionId)).then(() => setIsLoaded(true));
    }
  }, [isLoaded, dispatch, questionId]);

  useEffect(() => {
    if (isLoaded && !question) {
      navigate('/error', { state: { error: '404: Page Not Found' } });
    }
  }, [isLoaded, question, navigate]);

  const handlePostAnswer = async () => {
    setErrors({});
    const data = { text: answerInput };
    const res = await dispatch(thunkPostAnswer(JSON.stringify(data), questionId));
    if (res.text) setErrors(res);
    setAnswerInput('');
  };

  const handleQuestionSave = async () => {
    setErrors({});
    if (sessionUser) {
      dispatch(thunkSaveQuestion(questionId));
    }
  };

  const handleQuestionUnsave = async () => {
    setErrors({});
    if (sessionUser) {
      dispatch(thunkUnsaveQuestion(questionId, true));
    }
  };

  const handleAnswerSave = async (questionId, answerId) => {
    setErrors({});
    if (sessionUser) {
      dispatch(thunkSaveAnswer(questionId, answerId));
    }
  };

  const handleAnswerUnsave = async (questionId, answerId) => {
    setErrors({});
    if (sessionUser) {
      dispatch(thunkUnsaveAnswer(questionId, answerId, true));
    }
  };

  const handleKeyPress = (e) => {
    setErrors({});
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      setAnswerInput(answerInput.substring(0, start) + '    ' + answerInput.substring(end));
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleVote = async (voteValue, type, id) => {
    if (userVote?.vote === voteValue) {
      const error = await dispatch(thunkRemoveQuestionVote(userVote.id));
      if (error) {
        setErrors(error);
      }
    } else {
      const error = await dispatch(thunkVoteQuestion(type, id, voteValue));
      if (error) {
        setErrors(error);
      }
    }
  };

  return (
    <div id="main-area">
        
      {isLoaded && (
        <>
          {question && (
            <>
              <div id="title__container">
                <div id="title-date__container">
                  <h1>{question?.title}</h1>
                  {/* TODO fix date format */}
                  <p>Asked {date}</p>
                </div>
                {sessionUser && (
                  <NavLink to="/questions/new">
                    <button className="landing-page-login-button">Ask a Question</button>
                  </NavLink>
                )}
                {!sessionUser && (
                  <button className="landing-page-login-button">
                    <OpenModalMenuItem itemText="Ask a Question" modalComponent={<LoginFormModal />} />
                  </button>
                )}
              </div>
              <div id="main-content">
                <div id="vote-area">
                  {sessionUser && userVote?.vote === true ? (
                    <FaArrowAltCircleUp onClick={() => handleVote(true, 'question', question.id)} />
                  ) : (
                    <FaRegArrowAltCircleUp onClick={() => handleVote(true, 'question', question.id)} />
                  )}
                  <p>{totalVotes}</p>
                  {sessionUser && userVote?.vote === false ? (
                    <FaArrowAltCircleDown onClick={() => handleVote(false, 'question', question.id)} />
                  ) : (
                    <FaRegArrowAltCircleDown onClick={() => handleVote(false, 'question', question.id)} />
                  )}
                  {sessionUser && !questionAuthor && (
                    <>
                      {question.user_save ? (
                        <FaBookmark onClick={handleQuestionUnsave} />
                      ) : (
                        <FaRegBookmark onClick={handleQuestionSave} />
                      )}
                    </>
                  )}
                </div>
                <div id="question-details__container">
                  <RenderMarkdown text={question.details} />
                  <RenderMarkdown text={question.expectation} />
                  <div id="tags-username__container" className="flex column">
                    <div className="tags__container">
                      {question?.tags.map((id) => {
                        return (
                          <div key={id}>
                            <p className="tag">{tags[id]?.tag_name}</p>
                          </div>
                        );
                      })}
                    </div>
                    <p className="aselfend">{user?.username}</p>
                  </div>
                  <div className="mleft100 question-comments__container flex column pad10">
                    {question.comments?.map((commentId) => {
                      {
                        /* TODO add time since to comments*/
                      }
                      if (comments.data[commentId]) {
                        const comment = comments.data[commentId];
                        return (
                          <div key={`comment-${commentId}`} className="flex gap-10 acenter btop between">
                            <p>
                              {comment.comment} - {comment.author.username}
                            </p>
                            {sessionUser?.id === comment.author.id && (
                              <div className="flex aselfend acenter">
                                <OpenModalButton
                                  buttonText={
                                    <svg style={{ zIndex: '0' }} height="1em" viewBox="0 0 512 512">
                                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                    </svg>
                                  }
                                  modalComponent={
                                    <UpdateCommentModal comment={comment} questionId={questionId} />
                                  }
                                  editAnswer={true}
                                />
                              </div>
                            )}
                          </div>
                        );
                      }
                    })}
                    <CommentInput type="question" typeId={questionId} questionId={questionId} />
                  </div>
                </div>
              </div>
              {question.answers && (
                <h2 className="num_answers">
                  {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
                </h2>
              )}
              <div className="answers__container">
                {question.answers?.map((answerId) => {
                  if (answers.data[answerId]) {
                    const answer = answers.data[answerId];
                    return (
                      <div className="answer__container" key={`answer-${answerId}`}>
                        <div className="flex gap-15 column">
                          {sessionUser && (
                            <>
                              {answer.user_save ? (
                                <FaBookmark onClick={() => handleAnswerUnsave(question.id, answer.id)} />
                              ) : (
                                <FaRegBookmark onClick={() => handleAnswerSave(question.id, answer.id)} />
                              )}
                            </>
                          )}
                          <div className="flex column">
                            <RenderMarkdown text={answer.text} />
                            <p className="aselfend">{answer.user.username}</p>
                          </div>
                          {sessionUser?.id === answer.user_id && (
                            <div className="aselfend">
                              <OpenModalButton
                                buttonText={
                                  <svg style={{ zIndex: '0' }} height="1em" viewBox="0 0 512 512">
                                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                  </svg>
                                }
                                modalComponent={<UpdateAnswerModal answer={answer} />}
                                editAnswer={true}
                              />
                            </div>
                          )}
                        </div>
                        <div className="mleft100 answer-comment__container flex column">
                          {answer.comments.map((commentId) => {
                            if (comments.data[commentId]) {
                              const comment = comments.data[commentId];
                              return (
                                <div
                                  key={`comment-${commentId}`}
                                  className="flex gap-10 acenter btop between"
                                >
                                  <p>
                                    {comment.comment} - {comment.author.username}
                                  </p>
                                  {sessionUser?.id === comment.author.id && (
                                    <div className="flex aselfend acenter">
                                      <OpenModalButton
                                        buttonText={
                                          <svg style={{ zIndex: '0' }} height="1em" viewBox="0 0 512 512">
                                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                          </svg>
                                        }
                                        modalComponent={
                                          <UpdateCommentModal comment={comment} questionId={questionId} />
                                        }
                                        editAnswer={true}
                                      />
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })}
                          <CommentInput type="answer" typeId={answerId} questionId={questionId} />
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div id="post-answer__container">
                <h2>Your Answer</h2>
                {answerInput && (
                  <div>
                    <RenderMarkdown text={answerInput} />
                  </div>
                )}
                <textarea
                  name="answer"
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  onClick={() => setErrors({})}
                  onKeyDown={handleKeyPress}
                  placeholder=" Add your answer here"
                  cols={75}
                />
                {errors.text && <p className="errors">{errors.text}</p>}
                {sessionUser && <button onClick={handlePostAnswer}>Post Your Answer</button>}
                {!sessionUser && (
                  <span>
                    <OpenModalButton modalComponent={<SignupFormModal />} buttonText="Sign up" />
                    {' or '}
                    <OpenModalButton modalComponent={<LoginFormModal />} buttonText="Log In" />
                  </span>
                )}
              </div>
            </>
          )}
        </>
      )}
      {!isLoaded && <div style={{ height: '100vw' }} id="question-card__container"></div>}
    </div>
  );
}
