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

export const selectSaves = createSelector([selectSavesObj], (selectSavesObj) => ({ ...selectSavesObj }))

const initialState = { data: {}, allIds: [] };

function saveReducer(state = initialState, action) {
    switch (action.type) {

        case SET_SAVE: {
            const newState = structuredClone(state);
            newState.data[action.save.id] = structuredClone(action.save);
            if (newState.allIds.indexOf(action.save.id) < 0) {
                newState.allIds.push(action.save.id);
            }
            return newState;
        }

        case SET_SAVES: {
            const newState = structuredClone(state);
            action.saves.forEach(save => {
                newState.data[save.id] = structuredClone(save);
                if (newState.allIds.indexOf(save.id) < 0) {
                    newState.allIds.push(save.id)
                }
            })
            return newState;
        }

        case DELETE_SAVE: {
            const newState = structuredClone(state);
            if (newState.data[action.saveId]) {
                delete newState.data[action.saveId];
            }
            if (newState.allIds.indexOf(action.saveId > -1)) {
                newState.allIds.splice(newState.allIds.indexOf(action.saveId > -1), 1);
            }
            return newState;
        }

        default:
            return state;
    }
}

export default saveReducer;
