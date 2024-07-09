import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllQuestions } from "../../redux/questions";
import QuestionCard from "./QuestionCard";
import './QuestionListPage.css';

// TODO Implement pagination
function QuestionListPage({ homePage }) {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)
    const questions = useSelector((state) => state.questions.questions);

    useEffect(() => {
        dispatch(thunkGetAllQuestions()).then(() => {
            setIsLoaded(true)
        });
    }, [dispatch, setIsLoaded])

    return (
        <>
            <div id="question-card__container">
                <div id="question-list__header">
                    <h1>{homePage ? 'Top Questions' : 'All Questions'}</h1>
                    <div>
                        <button>Ask a Question</button>
                    </div>
                </div>
                {isLoaded &&
                    <>
                        <div>
                            {
                                questions.map((question) => {
                                    return (
                                        <QuestionCard
                                            key={question.id}
                                            id={question.id}
                                            title={question.title}
                                            details={question.details}
                                            tags={question.tags}
                                            upVotes={question.up_votes}
                                            downVotes={question.down_votes}
                                            numAnswers={question.num_answers}
                                            author={question.author}
                                            userId={question.user_id}
                                            homePage={homePage}
                                        />
                                    )
                                })
                            }
                        </div>
                    </>
                }
                {
                    !isLoaded && <div style={{ height: '100vw' }} id="question-card__container"></div>
                }
            </div>
        </>
    )
}

export default QuestionListPage;