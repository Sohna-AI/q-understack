const SET_QUESTIONS = 'questions/setQuestions';

const setQuestions = (questions) => ({
    type: SET_QUESTIONS,
    payload: questions
})

export const thunkGetAllQuestions = () => async (dispatch) => {
    const response = await fetch('/api/questions');
    if (response.ok) {
        const data = await response.json();
        dispatch(setQuestions(data))
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}

const initialState = { questions: {} }

function questionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            return { ...state, questions: action.payload.questions }

        default:
            return state;
    }
}

export default questionReducer