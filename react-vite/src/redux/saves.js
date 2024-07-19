import { createSelector } from '@reduxjs/toolkit';

const SET_SAVE = 'saves/setSave';
const SET_SAVES = 'saves/setSaves';
const DELETE_SAVE = 'saves/deleteSave';

export const setSave = (save) => ({
  type: SET_SAVE,
  save,
});

export const setSaves = (saves) => ({
  type: SET_SAVES,
  saves,
});

export const deleteSave = (saveId) => ({
  type: DELETE_SAVE,
  saveId,
});

const selectSavesObj = (state) => state.saves;

export const selectSaves = createSelector([selectSavesObj], (selectSavesObj) => ({ ...selectSavesObj }));

const initialState = { data: { questions: {}, answers: {} }, allIds: { questions: [], answers: [] } };

function saveReducer(state = structuredClone(initialState), action) {
  switch (action.type) {
    case SET_SAVE: {
      const newState = structuredClone(state);
      if (action.save.question) {
        newState.data.questions[action.save.id] = structuredClone(action.save);
        if (newState.allIds.questions.indexOf(action.save.id) < 0) {
          newState.allIds.questions.push(action.save.id);
        }
      } else {
        newState.data.answers[action.save.id] = structuredClone(action.save);
        if (newState.allIds.answers.indexOf(action.save.id) < 0) {
          newState.allIds.answers.push(action.save.id);
        }
      }
      return newState;
    }

    case SET_SAVES: {
      const newState = structuredClone(initialState);
      action.saves.forEach((type) => {
        type.forEach((save) => {
          if (save.question) {
            newState.data.questions[save.id] = structuredClone(save);
            if (newState.allIds.questions.indexOf(save.id) < 0) {
              newState.allIds.questions.push(save.id);
            }
          } else {
            newState.data.answers[save.id] = structuredClone(save);
            if (newState.allIds.answers.indexOf(save.id) < 0) {
              newState.allIds.answers.push(save.id);
            }
          }
        });
      });
      return newState;
    }

    case DELETE_SAVE: {
      const newState = structuredClone(state);
      const { saveId } = action;

      if (newState.data.answers[saveId]) {
        delete newState.data.answers[saveId];
        newState.allIds.answers = newState.allIds.answers.filter((id) => id !== saveId);
      }

      return newState;
    }

    default:
      return state;
  }
}

export default saveReducer;
