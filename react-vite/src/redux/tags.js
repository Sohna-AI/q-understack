import { createSelector } from '@reduxjs/toolkit';

const SET_TAG = 'tags/setTag';
const SET_TAGS = 'tags/setTags';
const DELETE_TAG = 'tags/deleteTag';

export const setTag = (tag) => ({
    type: SET_TAG,
    tag,
});

export const setTags = (tags) => ({
    type: SET_TAGS,
    tags,
});

export const deleteTag = (tagId) => ({
    type: DELETE_TAG,
    tagId,
});

const selectTagsObj = (state) => state.tags;

export const selectTag = createSelector([selectTagsObj], (selectTagsObj) => ({ ...selectTagsObj }))

const initialState = { data: {}, allIds: [] };

function tagReducer(state = initialState, action) {
    switch (action.type) {

        case SET_TAG: {
            const newState = structuredClone(state);
            newState.data[action.tag.id] = structuredClone(action.tag);
            if (newState.allIds.indexOf(action.tag.id) < 0) {
                newState.allIds.push(action.tag.id);
            }
            return newState;
        }

        case SET_TAGS: {
            const newState = structuredClone(state);
            action.tags.forEach(tag => {
                newState.data[tag.id] = structuredClone(tag);
                if (newState.allIds.indexOf(tag.id) < 0) {
                    newState.allIds.push(tag.id)
                }
            })
            return newState;
        }

        case DELETE_TAG: {
            const newState = structuredClone(state);
            if (newState.data[action.tagId]) {
                delete newState.data[action.tagId];
            }
            if (newState.allIds.indexOf(action.tagId > -1)) {
                newState.allIds.splice(newState.allIds.indexOf(action.tagId > -1), 1);
            }
            return newState;
        }

        default:
            return state;
    }
}

export default tagReducer;
