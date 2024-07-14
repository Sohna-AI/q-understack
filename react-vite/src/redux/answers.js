import { createSelector } from '@reduxjs/toolkit';

const SET_ANSWER = 'answers/setAnswer';
const SET_ANSWERS = 'answers/setAnswers';
const DELETE_ANSWER = 'answers/deleteAnswer';

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

const selectAnswersObj = (state) => state.answers;

export const selectAnswers = createSelector([selectAnswersObj], (selectAnswersObj) => ({ ...selectAnswersObj }))

const initialState = { data: {}, allIds: [] };

function answerReducer(state = initialState, action) {
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
            const newState = structuredClone(state);
            action.answers.forEach(answer => {
                newState.data[answer.id] = structuredClone(answer);
                if (newState.allIds.indexOf(answer.id) < 0) {
                    newState.allIds.push(answer.id)
                }
            })
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

        default:
            return state;
    }
}

export default answerReducer;
