import { createSelector } from '@reduxjs/toolkit';

const SET_USER = 'users/setUser';
const SET_USERS = 'users/setUsers';
const DELETE_USER = 'users/deleteUser';

export const setUser = (user) => ({
    type: SET_USER,
    user,
});

export const setUsers = (users) => ({
    type: SET_USERS,
    users,
});

export const deleteUser = (userId) => ({
    type: DELETE_USER,
    userId,
});

const selectUsersObj = (state) => state.users;

export const selectUsers = createSelector([selectUsersObj], (selectUsersObj) => ({ ...selectUsersObj }))

const initialState = { data: {}, allIds: [] };

function userReducer(state = initialState, action) {
    switch (action.type) {

        case SET_USER: {
            const newState = structuredClone(state);
            newState.data[action.user.id] = structuredClone(action.user);
            if (newState.allIds.indexOf(action.user.id) < 0) {
                newState.allIds.push(action.user.id);
            }
            return newState;
        }

        case SET_USERS: {
            const newState = structuredClone(state);
            action.users.forEach(user => {
                newState.data[user.id] = structuredClone(user);
                if (newState.allIds.indexOf(user.id) < 0) {
                    newState.allIds.push(user.id)
                }
            })
            return newState;
        }

        case DELETE_USER: {
            const newState = structuredClone(state);
            if (newState.data[action.userId]) {
                delete newState.data[action.userId];
            }
            if (newState.allIds.indexOf(action.userId > -1)) {
                newState.allIds.splice(newState.allIds.indexOf(action.userId > -1), 1);
            }
            return newState;
        }

        default:
            return state;
    }
}

export default userReducer;
