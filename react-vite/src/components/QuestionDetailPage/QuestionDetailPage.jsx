import { thunkGetQuestionDetailsById } from '../../utils/store';
import * as questionActions from '../../redux/questions';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import * as userActions from '../../redux/users';
import * as tagActions from '../../redux/tags';
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
    const user = useSelector(userActions.selectUsers).data[question?.user_id];
    const sessionUser = useSelector((state) => state.session.user);
    const tags = useSelector(tagActions.selectTags).data;
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetQuestionDetailsById(questionId)).then(() => {
            setIsLoaded(true)
        })
    }, [dispatch, questionId])

    return (
        <div>
            {isLoaded &&
                <>
                    <div id='title__container'>
                        <div id='title-date__container'>
                            <h1>{question?.title}</h1>
                            {/* TODO fix date format */}
                            <p>Asked {question?.created_at}</p>
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
                                <FaBookmark /> :
                                <FaRegBookmark />
                            }
                        </div>
                        <div>
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
        </div>
    )
}
