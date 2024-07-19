import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux';
import questionReducer from './questions';
import commentReducer from './comments';
import sessionReducer from './session';
import answerReducer from './answers';
import followReducer from './follows';
import saveReducer from './saves';
import userReducer from './users';
import voteReducer from './votes';
import tagReducer from './tags';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    questions: questionReducer,
    comments: commentReducer,
    session: sessionReducer,
    answers: answerReducer,
    follows: followReducer,
    saves: saveReducer,
    users: userReducer,
    votes: voteReducer,
    tags: tagReducer,
});

let enhancer;
if (import.meta.env.MODE === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = (await import('redux-logger')).default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
