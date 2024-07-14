import { createSelector } from '@reduxjs/toolkit';

const SET_FOLLOW = 'follows/setFollow';
const SET_FOLLOWS = 'follows/setFollows';
const DELETE_FOLLOW = 'follows/deleteFollow';

export const setFollow = (follow) => ({
    type: SET_FOLLOW,
    follow,
});

export const setFollows = (follows) => ({
    type: SET_FOLLOWS,
    follows,
});

export const deleteFollow = (followId) => ({
    type: DELETE_FOLLOW,
    followId,
});

const selectFollowsObj = (state) => state.follows;

export const selectFollows = createSelector([selectFollowsObj], (selectFollowsObj) => ({ ...selectFollowsObj }))

const initialState = { data: {}, allIds: [] };

function followReducer(state = initialState, action) {
    switch (action.type) {

        case SET_FOLLOW: {
            const newState = structuredClone(state);
            newState.data[action.follow.id] = structuredClone(action.follow);
            if (newState.allIds.indexOf(action.follow.id) < 0) {
                newState.allIds.push(action.follow.id);
            }
            return newState;
        }

        case SET_FOLLOWS: {
            const newState = structuredClone(state);
            action.follows.forEach(follow => {
                newState.data[follow.id] = structuredClone(follow);
                if (newState.allIds.indexOf(follow.id) < 0) {
                    newState.allIds.push(follow.id)
                }
            })
            return newState;
        }

        case DELETE_FOLLOW: {
            const newState = structuredClone(state);
            if (newState.data[action.followId]) {
                delete newState.data[action.followId];
            }
            if (newState.allIds.indexOf(action.followId > -1)) {
                newState.allIds.splice(newState.allIds.indexOf(action.followId > -1), 1);
            }
            return newState;
        }

        default:
            return state;
    }
}

export default followReducer;
