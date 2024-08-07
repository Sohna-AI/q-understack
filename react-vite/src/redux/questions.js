import { createSelector } from '@reduxjs/toolkit';

const SET_QUESTION = 'questions/setQuestion';
const SET_QUESTIONS = 'questions/setQuestions';
const DELETE_QUESTION = 'questions/deleteQuestion';
const SAVE_QUESTION = 'questions/saveQuestion';
const UNSAVE_QUESTION = 'questions/unsaveQuestion';

export const setQuestion = (question) => ({
    type: SET_QUESTION,
    question,
});

export const setQuestions = (questions) => ({
    type: SET_QUESTIONS,
    questions,
});

export const deleteQuestion = (questionId) => ({
    type: DELETE_QUESTION,
    questionId,
});

export const saveQuestion = (questionId) => ({
    type: SAVE_QUESTION,
    questionId
})

export const unsaveQuestion = (questionId) => ({
    type: UNSAVE_QUESTION,
    questionId
})

const selectQuestionsObj = (state) => state.questions;

export const selectQuestions = createSelector([selectQuestionsObj], (selectQuestionsObj) => ({ ...selectQuestionsObj }))

const initialState = { data: {}, allIds: [] };

function questionReducer(state = structuredClone(initialState), action) {
    switch (action.type) {

        case SET_QUESTION: {
            const newState = structuredClone(state);
            newState.data[action.question.id] = structuredClone(action.question);
            if (newState.allIds.indexOf(action.question.id) < 0) {
                newState.allIds.push(action.question.id);
            }
            return newState;
        }

        case SET_QUESTIONS: {
            const newState = structuredClone(initialState);
            action.questions.forEach(question => {
                newState.data[question.id] = structuredClone(question);
                if (newState.allIds.indexOf(question.id) < 0) {
                    newState.allIds.push(question.id)
                }
            })
            return newState;
        }

        case DELETE_QUESTION: {
            const newState = structuredClone(state);
            if (newState.data[action.questionId]) {
                delete newState.data[action.questionId];
            }
            if (newState.allIds.indexOf(action.questionId > -1)) {
                newState.allIds.splice(newState.allIds.indexOf(action.questionId), 1);
            }
            return newState;
        }

        case SAVE_QUESTION: {
            const newState = structuredClone(state);
            if (newState.data[action.questionId]) {
                newState.data[action.questionId].user_save = true;
            }
            return newState;
        }

        case UNSAVE_QUESTION: {
            const newState = structuredClone(state);
            if (newState.data[action.questionId]) {
                newState.data[action.questionId].user_save = false;
            }
            return newState;
        }

        default:
            return state;
    }
}

export default questionReducer;
