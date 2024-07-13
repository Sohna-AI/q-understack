const SET_SAVED_QUESTIONS = 'savedQuestions/setSavedQuestions';
const UNSAVE_QUESTION = 'savedQuestions/unsaveQuestion';

const setSavedQuestions = (questions) => ({
  type: SET_SAVED_QUESTIONS,
  payload: questions,
});

const unsaveQuestion = (questionId) => ({
  type: UNSAVE_QUESTION,
  questionId,
});

export const thunkGetSavedQuestions = () => async (dispatch) => {
  const response = await fetch('/api/questions/saves');
  if (response.ok) {
    const data = await response.json();
    dispatch(setSavedQuestions(data.questions));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkUnsaveQuestion = (questionId) => async (dispatch) => {
  const response = await fetch(`/api/questions/${questionId}/save`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(unsaveQuestion(questionId));
  }
};

const initialState = { questions: [] };

function savedQuestionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SAVED_QUESTIONS:
      return { ...state, questions: action.payload };
    case UNSAVE_QUESTION:
      return { ...state, questions: state.questions.filter((question) => question.id !== action.questionId) };
    default:
      return state;
  }
}

export default savedQuestionsReducer;
