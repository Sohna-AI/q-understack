import { thunkGetQuestionDetailsById, thunkSaveQuestion, thunkUnsaveQuestion } from '../../utils/store';
import * as questionActions from '../../redux/questions';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import * as userActions from '../../redux/users';
import * as tagActions from '../../redux/tags';
import * as answerActions from '../../redux/answers';
import * as commentActions from '../../redux/comments';
import LoginFormModal from '../LoginFormModal';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './QuestionDetailPage.css';

import {
    FaArrowAltCircleDown, FaArrowAltCircleUp,
    FaRegArrowAltCircleDown, FaRegArrowAltCircleUp,
    FaBookmark, FaRegBookmark
} from 'react-icons/fa';

export default function QuestionDetailPage() {
    const { questionId } = useParams()
    const question = useSelector(questionActions.selectQuestions)?.data[questionId];
    const answers = useSelector(answerActions.selectAnswers);
    const comments = useSelector(commentActions.selectComments);
    const user = useSelector(userActions.selectUsers).data[question?.user_id];
    const sessionUser = useSelector((state) => state.session.user);
    const tags = useSelector(tagActions.selectTags).data;
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
                        <button>Ask Question</button>
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
                                {question.comments.map((commentId) => {
                                    {/* TODO add time since to comments*/ }
                                    return (
                                        < p className='comment' key={`comment-${commentId}`} > {comments.data[commentId].comment} - {comments.data[commentId].author.username}</p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {question.answers.length &&
                        <h2 className='num_answers'>{question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}</h2>
                    }
                    <div className='answers__container'>
                        {question.answers.map((answerId) => {
                            return (
                                <div className='answer__container' key={`answer-${answerId}`}>
                                    <p>{answers.data[answerId].text}  - {answers.data[answerId].user.username}</p>
                                    <div className='answer-comment__container'>
                                        {answers.data[answerId].comments.map((commentId) => {
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
                        <textarea name="answer" cols={50}></textarea>
                        {sessionUser && <button >Post Your Answer</button>}
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
