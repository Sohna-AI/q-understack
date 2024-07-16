import { thunkGetAllQuestions } from "../../utils/store";
import { useDispatch, useSelector } from "react-redux";
import * as questionActions from '../../redux/questions';
import * as userActions from '../../redux/users';
import * as tagActions from '../../redux/tags';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import './QuestionListPage.css';

// TODO Implement pagination
function QuestionListPage({ homePage }) {
    const questions = useSelector(questionActions.selectQuestions);
    const users = useSelector(userActions.selectUsers);
    const tags = useSelector(tagActions.selectTags);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(thunkGetAllQuestions())
            .then(() => {
                setIsLoaded(true)
            });
    }, [dispatch, setIsLoaded])

    const handleClick = () => {
        navigate('/questions/new');
    }

    return (
        <>
            <div id="question-card__container">
                <div id="question-list__header">
                    <h1>{homePage ? 'Top Questions' : 'All Questions'}</h1>
                    <div>
                        <button onClick={handleClick}>Ask a Question</button>
                    </div>
                </div>
                {isLoaded &&
                    <>
                        <div>
                            {
                                questions.allIds?.map((qId) => {
                                    return (
                                        <QuestionCard
                                            key={qId}
                                            id={qId}
                                            title={questions.data[qId].title}
                                            details={questions.data[qId].details}
                                            tags={questions.data[qId].tags.map((tagId) => tags.data[tagId])}
                                            num_votes={questions.data[qId].num_votes}
                                            numAnswers={questions.data[qId].num_answers}
                                            author={users.data[questions.data[qId].user_id].username}
                                            userId={questions.data[qId].user_id}
                                            homePage={homePage}
                                        />
                                    )
                                })
                            }
                        </div>
                    </>
                }
                {
                    !isLoaded && <div style={{ height: '100vh' }} id="question-card__container"></div>
                }
            </div>
        </>
    )
}

export default QuestionListPage;
