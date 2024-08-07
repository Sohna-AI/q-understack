import {
  thunkPostAnswer, thunkGetQuestionDetailsById, thunkSaveQuestion,
  thunkUnsaveQuestion, thunkSaveAnswer, thunkUnsaveAnswer,
} from '../../utils/store';
import {
  FaArrowAltCircleDown, FaArrowAltCircleUp, FaRegArrowAltCircleDown,
  FaRegArrowAltCircleUp, FaBookmark, FaRegBookmark
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
import LoginFormModal from '../LoginFormModal';
import { useEffect, useState } from 'react';
import './QuestionDetailPage.css';


export default function QuestionDetailPage() {
  const { questionId } = useParams();
  const question = useSelector(questionActions.selectQuestions)?.data[questionId];
  const user = useSelector(userActions.selectUsers).data[question?.user_id];
  const sessionUser = useSelector((state) => state.session.user);
  const comments = useSelector(commentActions.selectComments);
  const answers = useSelector(answerActions.selectAnswers);
  const tags = useSelector(tagActions.selectTags).data;
  const [answerInput, setAnswerInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = new Date(question?.created_at).toLocaleDateString(undefined, options);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(thunkGetQuestionDetailsById(questionId))
        .then(() => {
          setIsLoaded(true);
        });
    }
  }, [isLoaded, dispatch, questionId]);

  useEffect(() => {
    if (isLoaded && !question) {
      navigate('/error', { state: { error: '404: Page Not Found' } })
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

  const handleChange = (e) => {
    setErrors({});
    setAnswerInput(e.target.value);
  }

  return (
    <div id="main-area">
      {isLoaded && <>
        {question &&
          <>
            <div id="title__container">
              <div id="title-date__container">
                <h1>{question?.title}</h1>
                {/* TODO fix date format */}
                <p>Asked {date}</p>
              </div>
              {sessionUser && <NavLink to="/questions/new">
                <button className="landing-page-login-button">Ask a Question</button>
              </NavLink>}
              {!sessionUser && <button className="landing-page-login-button">
                <OpenModalMenuItem itemText="Ask a Question" modalComponent={<LoginFormModal />} />
              </button>}
            </div>
            <div id="main-content">
              <div id="vote-area">
                {(sessionUser && question.user_vote === true) ? <FaArrowAltCircleUp /> : <FaRegArrowAltCircleUp />}
                <p>{question.num_votes}</p>
                {(sessionUser && question.user_vote === false) ? <FaArrowAltCircleDown /> : <FaRegArrowAltCircleDown />}
                {sessionUser && <>
                  {question.user_save ? (
                    <FaBookmark onClick={handleQuestionUnsave} />
                  ) : (
                    <FaRegBookmark onClick={handleQuestionSave} />
                  )}
                </>
                }
              </div>
              <div id="question-details__container">
                <p>{question.details}</p>
                <p>{question.expectation}</p>
                <div id="tags-username__container">
                  <div className="tags__container">
                    {question?.tags.map((id) => {
                      return (
                        <div key={id}>
                          <p className="tag">{tags[id]?.tag_name}</p>
                        </div>
                      );
                    })}
                  </div>
                  <p>{user?.username}</p>
                </div>
                <div className="question-comments__container">
                  {question.comments?.map((commentId) => {
                    {
                      /* TODO add time since to comments*/
                    }
                    return (
                      <p className="comment" key={`comment-${commentId}`}>
                        {' '}
                        {comments.data[commentId].comment} - {comments.data[commentId].author.username}
                      </p>
                    );
                  })}
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
                      <div className='flex gap-15'>
                        {sessionUser && <>
                          {answer.user_save ? (
                            <FaBookmark onClick={() => handleAnswerUnsave(question.id, answer.id)} />
                          ) : (
                            <FaRegBookmark onClick={() => handleAnswerSave(question.id, answer.id)} />
                          )}
                        </>}
                        <p>
                          {answer.text} - {answer.user.username}
                        </p>
                        {sessionUser?.id === answer.user_id && (
                          <OpenModalButton
                            buttonText={
                              <svg style={{ zIndex: "0" }} height="1em" viewBox="0 0 512 512">
                                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                              </svg>
                            }
                            modalComponent={<UpdateAnswerModal answer={answer} />}
                            editAnswer={true}
                          />
                        )}
                      </div>
                      <div className="answer-comment__container">
                        {answer.comments.map((commentId) => {
                          return (
                            <p className="comment" key={`comment-${commentId}`}>
                              {comments.data[commentId].comment} - {comments.data[commentId].author.username}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div id="post-answer__container">
              <h2>Your Answer</h2>
              <textarea
                name="answer"
                value={answerInput}
                onChange={(e) => handleChange(e)}
                onClick={() => setErrors({})}
                placeholder=" Add your answer here"
                cols={50}
              />
              {errors.text && <p className='errors'>{errors.text}</p>}
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
        }
      </>}
      {!isLoaded && <div style={{ height: '100vw' }} id="question-card__container"></div>}
    </div >
  );
}
