import { createSelector } from '@reduxjs/toolkit';

const SET_VOTE = 'votes/setVote';
const SET_VOTES = 'votes/setVotes';
const DELETE_VOTE = 'votes/deleteVote';

export const setVote = (vote) => ({
    type: SET_VOTE,
    vote,
});

export const setVotes = (votes) => ({
    type: SET_VOTES,
    votes,
});

export const deleteVote = (voteId) => ({
    type: DELETE_VOTE,
    voteId,
});

const selectVotesObj = (state) => state.votes;

export const selectVote = createSelector([selectVotesObj], (selectVotesObj) => ({ ...selectVotesObj }))

const initialState = { data: {}, allIds: [] };

function voteReducer(state = initialState, action) {
    switch (action.type) {

        case SET_VOTE: {
            const newState = structuredClone(state);
            newState.data[action.vote.id] = structuredClone(action.vote);
            if (newState.allIds.indexOf(action.vote.id) < 0) {
                newState.allIds.push(action.vote.id);
            }
            return newState;
        }

        case SET_VOTES: {
            const newState = structuredClone(state);
            action.votes.forEach(vote => {
                newState.data[vote.id] = structuredClone(vote);
                if (newState.allIds.indexOf(vote.id) < 0) {
                    newState.allIds.push(vote.id)
                }
            })
            return newState;
        }

        case DELETE_VOTE: {
            const newState = structuredClone(state);
            if (newState.data[action.voteId]) {
                delete newState.data[action.voteId];
            }
            if (newState.allIds.indexOf(action.voteId > -1)) {
                newState.allIds.splice(newState.allIds.indexOf(action.voteId > -1), 1);
            }
            return newState;
        }

        default:
            return state;
    }
}

export default voteReducer;
