import { createSelector } from '@reduxjs/toolkit';

const SET_ANSWER = 'answers/setAnswer';
const SET_ANSWERS = 'answers/setAnswers';
const DELETE_ANSWER = 'answers/deleteAnswer';
const SAVE_ANSWER = 'answers/saveAnswer';
const UNSAVE_ANSWER = 'answers/unsaveAnswer';

export const setAnswer = (answer) => ({
  type: SET_ANSWER,
  answer,
});

export const setAnswers = (answers) => ({
  type: SET_ANSWERS,
  answers,
});

export const deleteAnswer = (answerId) => ({
  type: DELETE_ANSWER,
  answerId,
});

export const saveAnswer = (answerId) => ({
  type: SAVE_ANSWER,
  answerId,
});

export const unsaveAnswer = (answerId) => ({
  type: UNSAVE_ANSWER,
  answerId,
});

const selectAnswersObj = (state) => state.answers;

export const selectAnswers = createSelector([selectAnswersObj], (selectAnswersObj) => ({
  ...selectAnswersObj,
}));

const initialState = { data: {}, allIds: [] };

function answerReducer(state = structuredClone(initialState), action) {
  switch (action.type) {
    case SET_ANSWER: {
      const newState = structuredClone(state);
      newState.data[action.answer.id] = structuredClone(action.answer);
      if (newState.allIds.indexOf(action.answer.id) < 0) {
        newState.allIds.push(action.answer.id);
      }
      return newState;
    }

    case SET_ANSWERS: {
      const newState = structuredClone(initialState);
      action.answers.forEach((answer) => {
        newState.data[answer.id] = structuredClone(answer);
        if (newState.allIds.indexOf(answer.id) < 0) {
          newState.allIds.push(answer.id);
        }
      });
      return newState;
    }

    case DELETE_ANSWER: {
      const newState = structuredClone(state);
      if (newState.data[action.answerId]) {
        delete newState.data[action.answerId];
      }
      if (newState.allIds.indexOf(action.answerId > -1)) {
        newState.allIds.splice(newState.allIds.indexOf(action.answerId > -1), 1);
      }
      return newState;
    }

    case SAVE_ANSWER: {
      const newState = structuredClone(state);
      if (newState.data[action.answerId]) {
        newState.data[action.answerId].user_save = true;
      }
      return newState;
    }

    case UNSAVE_ANSWER: {
      const newState = structuredClone(state);
      if (newState.data[action.answerId]) {
        newState.data[action.answerId].user_save = false;
      }
      return newState;
    }

    default:
      return state;
  }
}

export default answerReducer;
