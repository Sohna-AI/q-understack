import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllQuestions } from "../../redux/questions";
import QuestionCard from "./QuestionCard";
import './QuestionListPage.css';

function QuestionListPage({ homePage }) {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const questions = useSelector((state) => state.questions.questions);

    useEffect(() => {
        dispatch(thunkGetAllQuestions()).then(() => {
            setIsLoaded(true)
        })
    }, [dispatch])

    return (
        <>
            {isLoaded &&
                <>
                    <div id="question-card__container">
                        <div id="question-list__header">
                            <h1>Top Questions</h1>
                            <div>
                                <button>Ask a Question</button>
                            </div>
                        </div>
                        <div>
                            {
                                questions.map((question) => {
                                    return (
                                        <QuestionCard
                                            key={question.id}
                                            title={question.title}
                                            details={question.details}
                                            // tags={question.tags}
                                            tags={[{ tag_name: 'hugging-face-transformers' }, { tag_name: 'machine-learning' }, { tag_name: 'large-language-model' }, { tag_name: 'virtual-machines' }, { tag_name: 'react-redux' }]}
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
                    </div>
                </>
            }
        </>
    )
}

export default QuestionListPage;