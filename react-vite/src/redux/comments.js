import { createSelector } from '@reduxjs/toolkit';

const SET_COMMENT = 'comments/setComment';
const SET_COMMENTS = 'comments/setComments';
const DELETE_COMMENT = 'comments/deleteComment';

export const setComment = (comment) => ({
    type: SET_COMMENT,
    comment,
});

export const setComments = (comments) => ({
    type: SET_COMMENTS,
    comments,
});

export const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId,
});

const selectCommentsObj = (state) => state.comments;

export const selectComment = createSelector([selectCommentsObj], (selectCommentsObj) => ({ ...selectCommentsObj }))

const initialState = { data: {}, allIds: [] };

function commentReducer(state = initialState, action) {
    switch (action.type) {

        case SET_COMMENT: {
            const newState = structuredClone(state);
            newState.data[action.comment.id] = structuredClone(action.comment);
            if (newState.allIds.indexOf(action.comment.id) < 0) {
                newState.allIds.push(action.comment.id);
            }
            return newState;
        }

        case SET_COMMENTS: {
            const newState = structuredClone(state);
            action.comments.forEach(comment => {
                newState.data[comment.id] = structuredClone(comment);
                if (newState.allIds.indexOf(comment.id) < 0) {
                    newState.allIds.push(comment.id)
                }
            })
            return newState;
        }

        case DELETE_COMMENT: {
            const newState = structuredClone(state);
            if (newState.data[action.commentId]) {
                delete newState.data[action.commentId];
            }
            if (newState.allIds.indexOf(action.commentId > -1)) {
                newState.allIds.splice(newState.allIds.indexOf(action.commentId > -1), 1);
            }
            return newState;
        }

        default:
            return state;
    }
}

export default commentReducer;
