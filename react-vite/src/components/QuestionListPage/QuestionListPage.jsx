import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { thunkGetAllQuestions } from "../../utils/store";
import * as questionActions from '../../redux/questions';
import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../../redux/users';
import * as tagActions from '../../redux/tags';
import { useNavigate } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import './QuestionListPage.css';

// TODO Implement pagination
function QuestionListPage({ homePage }) {
    const questions = useSelector(questionActions.selectQuestions);
    const sessionUser = useSelector((state) => state.session.user);
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
        <div id="question-card__container">
            <div id="question-list__header">
                <h1>{homePage ? 'Top Questions' : 'All Questions'}</h1>
                <div>
                    {sessionUser && <button onClick={handleClick}>Ask a Question</button>}
                    {!sessionUser && <button className="landing-page-login-button">
                        <OpenModalMenuItem itemText="Ask a Question" modalComponent={<LoginFormModal />} />
                    </button>}
                </div>
            </div>
            {isLoaded &&
                <div>
                    {
                        questions.allIds?.map((questionId) => {
                            const question = questions.data[questionId]
                            return (
                                <QuestionCard
                                    key={questionId}
                                    id={questionId}
                                    title={question.title}
                                    details={question.details}
                                    tags={question.tags.map((tagId) => tags.data[tagId])}
                                    num_votes={question.num_votes}
                                    numAnswers={question.num_answers}
                                    author={users.data[question.user_id].username}
                                    userId={question.user_id}
                                    homePage={homePage}
                                />
                            )
                        })
                    }
                </div>
            }
            {
                !isLoaded && <div style={{ height: '100vh' }} id="question-card__container"></div>
            }
        </div>
    )
}

export default QuestionListPage;
