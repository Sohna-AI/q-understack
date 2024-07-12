
const SET_QUESTIONS = 'questions/setQuestions';
const SET_CURRENT_QUESTION = 'question/setCurrentQuestion';

const setQuestions = (questions) => ({
    type: SET_QUESTIONS,
    payload: questions
})

const setCurrentQuestion = (question) => ({
    type: SET_CURRENT_QUESTION,
    payload: question
})

export const thunkGetAllQuestions = () => async (dispatch) => {
    const response = await fetch('/api/questions');
    if (response.ok) {
        const data = await response.json();
        dispatch(setQuestions(data))
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}

export const thunkGetQuestionDetailsById = (questionId) => async (dispatch) => {
    const response = await fetch(`/api/questions/${questionId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentQuestion(data))
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}

export const thunkCreateQuestion = (data) => {
    const response = await fetch('/api/questions',
        {

        }
    )
}

const initialState = { questions: {} }

function questionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            return { ...state, questions: action.payload.questions }

        case SET_CURRENT_QUESTION:
            return {
                ...state, questions: {
                    ...state.questions,
                    [action.payload.id]:
                        { ...state.questions[action.payload.id], ...action.payload }
                }
            }

        default:
            return state;
    }
}

export default questionReducer
