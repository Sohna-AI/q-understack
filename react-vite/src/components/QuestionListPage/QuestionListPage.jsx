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
import { FaCaretLeft, FaCaretRight, FaCaretSquareLeft, FaRegCaretSquareLeft } from "react-icons/fa";

function QuestionListPage({ homePage }) {
    const questions = useSelector(questionActions.selectQuestions);
    const sessionUser = useSelector((state) => state.session.user);
    const users = useSelector(userActions.selectUsers);
    const tags = useSelector(tagActions.selectTags);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [page, setPage] = useState(() => {
        const savedPage = sessionStorage.getItem('page');
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const [perPage, setPerPage] = useState(() => {
        const savedPerPage = localStorage.getItem('perPage');
        return savedPerPage ? parseInt(savedPerPage, 10) : 10;
    });
    const [totalPages, setTotalPages] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(thunkGetAllQuestions(page, perPage))
            .then((data) => {
                setTotalQuestions(data.total);
                setTotalPages(data.pages);
                setIsLoaded(true);
            });
    }, [dispatch, setIsLoaded, page, perPage])

    // * Saves page and perPage to session / local storage whenever they change
    useEffect(() => {
        sessionStorage.setItem('page', page);
        localStorage.setItem('perPage', perPage);
    }, [page, perPage])

    const handlePerPageChange = (e) => {
        setPage(1)
        setPerPage(e.target.value);
        // TODO refine logic for when not to refresh
        if (perPage > e.target.value || totalQuestions > e.target.value) {
            setIsLoaded(false);
        }
    }

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
            setIsLoaded(false);
        }
        scrollTo(0, 0)
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
            setIsLoaded(false)
        }
    }

    const handleClick = () => {
        navigate('/questions/new');
    }

    const startQuestion = (page - 1) * perPage + 1;
    const endQuestion = Math.min(page * perPage, totalQuestions);

    return (
        <div id="question-card__container">
            <div id="question-list__header">
                <h1>{homePage ? 'Top Questions' : 'All Questions'}</h1>
                <div>
                    <select
                        id="perPage"
                        value={perPage}
                        onChange={handlePerPageChange}
                    >
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                        <option value={100}>100 per page</option>
                    </select>
                    {sessionUser && <button onClick={handleClick}>Ask a Question</button>}
                    {!sessionUser && <button className="landing-page-login-button">
                        <OpenModalMenuItem itemText="Ask a Question" modalComponent={<LoginFormModal />} />
                    </button>}
                </div>
            </div>
            {isLoaded &&
                <>
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
                    <div id="pagination">
                        <div>
                            <button
                                onClick={handlePreviousPage} disabled={page === 1}
                            >
                                <FaCaretLeft />Prev
                            </button>
                            <span>Page {page} of {totalPages}</span>
                            <button
                                onClick={handleNextPage} disabled={page === totalPages || totalPages === 0}
                            >
                                Next<FaCaretRight />
                            </button>
                        </div>
                        <p>{startQuestion} - {endQuestion} of {totalQuestions}</p>
                    </div>
                </>
            }
            {
                !isLoaded && <div style={{ height: '100vh' }} id="question-card__container"></div>
            }
        </div>
    )
}

export default QuestionListPage;
