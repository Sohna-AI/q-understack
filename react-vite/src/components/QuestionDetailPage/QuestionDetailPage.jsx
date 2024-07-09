import { useDispatch, useSelector } from 'react-redux';
import './QuestionDetailPage.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { thunkGetQuestionDetailsById } from '../../redux/questions';
import {
    FaArrowAltCircleDown, FaArrowAltCircleUp,
    FaBookmark,
    FaRegArrowAltCircleDown, FaRegArrowAltCircleUp,
    FaRegBookmark
} from 'react-icons/fa';

export default function QuestionDetailPage() {
    const dispatch = useDispatch();
    const { questionId } = useParams()
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
                            <FaArrowAltCircleUp />
                            <FaRegArrowAltCircleUp />
                            <p>{question.up_votes - question.down_votes}</p>
                            <FaRegArrowAltCircleDown />
                            <FaArrowAltCircleDown />
                            <FaBookmark />
                            <FaRegBookmark />
                        </div>
                        <div>
                            <p>{question.details}</p>
                            <p>{question.expectation}</p>
                            <div>
                                {/* TODO add tags and username here */}
                            </div>
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