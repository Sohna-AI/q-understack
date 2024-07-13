const SET_QUESTIONS = 'questions/setQuestions';
const SET_CURRENT_QUESTION = 'question/setCurrentQuestion';
const SET_USER_QUESTIONS = 'questions/setUserQuestions';
const DELETE_QUESTION = 'questions/deleteQuestion';

const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  payload: questions,
});

const setCurrentQuestion = (question) => ({
  type: SET_CURRENT_QUESTION,
  payload: question,
});

const setUserQuestions = (questions) => ({
  type: SET_USER_QUESTIONS,
  payload: questions,
});

const deleteQuestion = (questionId) => ({
  type: DELETE_QUESTION,
  payload: questionId,
});

export const thunkGetAllQuestions = () => async (dispatch) => {
  const response = await fetch('/api/questions');
  if (response.ok) {
    const data = await response.json();
    dispatch(setQuestions(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkGetQuestionDetailsById = (questionId) => async (dispatch) => {
  const response = await fetch(`/api/questions/${questionId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setCurrentQuestion(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkGetUserQuestions = () => async (dispatch) => {
  const response = await fetch('/api/questions/current');
  if (response.ok) {
    const data = await response.json();
    dispatch(setUserQuestions(data.questions));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkDeleteQuestion = (questionId) => async (dispatch) => {
  const response = await fetch(`/api/questions/${questionId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteQuestion(questionId));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

const initialState = { questions: {}, userQuestions: [] };

function questionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return { ...state, questions: action.payload.questions };

    case SET_CURRENT_QUESTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.payload.id]: { ...state.questions[action.payload.id], ...action.payload },
        },
      };

    case SET_USER_QUESTIONS:
      return { ...state, userQuestions: action.payload };
    case DELETE_QUESTION:
      const newState = { ...state };
      delete newState.questions[action.payload];
      return newState;

    default:
      return state;
  }
}

export default questionReducer;
