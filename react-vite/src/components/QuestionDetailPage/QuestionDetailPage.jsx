import { useDispatch, useSelector } from 'react-redux';
import './QuestionDetailPage.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { thunkGetQuestionDetailsById } from '../../redux/questions';
import OpenModalButton from '../OpenModalButton';
import {
    FaArrowAltCircleDown, FaArrowAltCircleUp,
    FaBookmark,
    FaRegArrowAltCircleDown, FaRegArrowAltCircleUp,
    FaRegBookmark
} from 'react-icons/fa';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

export default function QuestionDetailPage() {
    const dispatch = useDispatch();
    const { questionId } = useParams()
    const sessionUser = useSelector((state) => state.session.user);
    const question = useSelector((state) => state.questions.questions[Number(questionId)])
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(thunkGetQuestionDetailsById(questionId)).then(() => [
            setIsLoaded(true)
        ])
    }, [dispatch, questionId])

    return (
        <>
            {isLoaded &&
                <>
                    <div id='title__container'>
                        <div id='title-date__container'>
                            <h1>{question.title}</h1>
                            {/* TODO fix date format */}
                            <p>Asked {question.created_at}</p>
                        </div>
                        <button>Ask Question</button>
                    </div>
                    <div id='main-content'>
                        <div id='vote-area'>
                            {question.user_vote === true ?
                                <FaArrowAltCircleUp /> :
                                <FaRegArrowAltCircleUp />}
                            <p>{question.num_votes}</p>
                            {question.user_vote === false ?
                                <FaArrowAltCircleDown /> :
                                <FaRegArrowAltCircleDown />}
                            {question.user_save ?
                                <FaBookmark /> :
                                <FaRegBookmark />
                            }
                        </div>
                        <div>
                            <p>{question.details}</p>
                            <p>{question.expectation}</p>
                            <div id='tags-username__container'>
                                <div className="tags__container">
                                    {question.tags.map((tag) => {
                                        return (
                                            <div key={tag.id}>
                                                <p className="tag">{tag.tag_name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <p>{question.author.username}</p>
                            </div>
                        </div>
                        <div id='answer__container'>
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
                    </div>
                </>
            }
            {
                !isLoaded && <div style={{ height: '100vw' }} id="question-card__container"></div>
            }
        </>
    )
}