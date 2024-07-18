import { thunkPostAnswer, thunkGetQuestionDetailsById, thunkSaveQuestion, thunkUnsaveQuestion } from '../../utils/store';
import * as questionActions from '../../redux/questions';
import * as commentActions from '../../redux/comments';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import * as answerActions from '../../redux/answers';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import * as userActions from '../../redux/users';
import * as tagActions from '../../redux/tags';
import LoginFormModal from '../LoginFormModal';
import { useEffect, useState } from 'react';
import './QuestionDetailPage.css';

import {
    FaArrowAltCircleDown, FaArrowAltCircleUp,
    FaRegArrowAltCircleDown, FaRegArrowAltCircleUp,
    FaBookmark, FaRegBookmark
} from 'react-icons/fa';
import UpdateAnswerModal from '../UpdateAnswer/UpdateAnswer';

export default function QuestionDetailPage() {
    const { questionId } = useParams()
    const question = useSelector(questionActions.selectQuestions)?.data[questionId];
    const user = useSelector(userActions.selectUsers).data[question?.user_id];
    const sessionUser = useSelector((state) => state.session.user);
    const comments = useSelector(commentActions.selectComments);
    const answers = useSelector(answerActions.selectAnswers);
    const tags = useSelector(tagActions.selectTags).data;
    const [answerInput, setAnswerInput] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    const date = new Date(question?.created_at).toLocaleDateString(undefined, options)

    useEffect(() => {
        dispatch(thunkGetQuestionDetailsById(questionId)).then(() => {
            setIsLoaded(true)
        })
    }, [dispatch, questionId])


    useEffect(() => {
    }, [question])

    const handlePostAnswer = async () => {
        const data = { text: answerInput };
        dispatch(thunkPostAnswer(JSON.stringify(data), questionId))
        setAnswerInput('');

    const handleSave = () => {
        dispatch(thunkSaveQuestion(questionId));
    }

    const handleUnsave = () => {
        dispatch(thunkUnsaveQuestion(questionId));

    }

    return (
        <div id='main-area'>
            {isLoaded &&
                <>
                    <div id='title__container'>
                        <div id='title-date__container'>
                            <h1>{question?.title}</h1>
                            {/* TODO fix date format */}
                            <p>Asked {date}</p>
                        </div>
                        <NavLink to="/questions/new">
                            <button>Ask Question</button>
                        </NavLink>
                    </div>
                    <div id='main-content'>
                        <div id='vote-area'>
                            {question?.user_vote === true ?
                                <FaArrowAltCircleUp /> :
                                <FaRegArrowAltCircleUp />}
                            <p>{question?.num_votes}</p>
                            {question?.user_vote === false ?
                                <FaArrowAltCircleDown /> :
                                <FaRegArrowAltCircleDown />}
                            {question?.user_save ?
                                <FaBookmark onClick={handleUnsave} /> :
                                <FaRegBookmark onClick={handleSave} />
                            }
                        </div>
                        <div id='question-details__container'>
                            <p>{question?.details}</p>
                            <p>{question?.expectation}</p>
                            <div id='tags-username__container'>
                                <div className="tags__container">
                                    {question?.tags.map((id) => {
                                        return (
                                            <div key={id}>
                                                <p className="tag">{tags[id]?.tag_name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <p>{user?.username}</p>
                            </div>
                            <div className="question-comments__container">
                                {question?.comments.map((commentId) => {
                                    {/* TODO add time since to comments*/ }
                                    return (
                                        < p className='comment' key={`comment-${commentId}`} > {comments.data[commentId].comment} - {comments.data[commentId].author.username}</p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {question?.answers.length &&
                        <h2 className='num_answers'>{question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}</h2>
                    }
                    <div className='answers__container'>
                        {question?.answers.map((answerId) => {
                            return (
                                <div className='answer__container' key={`answer-${answerId}`}>
                                    <div>
                                        <p>{answers?.data[answerId]?.text}  - {answers?.data[answerId]?.user.username}</p>
                                        {(sessionUser.id === answers?.data[answerId]?.user_id) && <OpenModalButton
                                            buttonText={<svg height="1em" viewBox="0 0 512 512">
                                                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                            </svg>}
                                            modalComponent={<UpdateAnswerModal answer={answers.data[answerId]} />}
                                            editAnswer={true}
                                        />}
                                    </div>
                                    <div className='answer-comment__container'>
                                        {answers?.data[answerId]?.comments.map((commentId) => {
                                            return (
                                                <p className='comment' key={`comment-${commentId}`}>{comments.data[commentId].comment}  - {comments.data[commentId].author.username}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div id='post-answer__container'>
                        <h2>Your Answer</h2>
                        <textarea
                            name="answer"
                            value={answerInput}
                            onChange={(e) => setAnswerInput(e.target.value)}
                            placeholder=' Add your answer here'
                            cols={50}
                        />
                        {sessionUser && <button onClick={handlePostAnswer}>Post Your Answer</button>}
                        {!sessionUser &&
                            <span>
                                <OpenModalButton
                                    modalComponent={<SignupFormModal />}
                                    buttonText="Sign up"
                                />
                                {' or '}
                                <OpenModalButton
                                    modalComponent={<LoginFormModal />}
                                    buttonText="Log In"
                                />
                            </span>
                        }
                    </div>
                </>
            }
            {
                !isLoaded && <div style={{ height: '100vw' }} id="question-card__container"></div>
            }
        </div >
    )
}
