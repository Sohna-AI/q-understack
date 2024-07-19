import { Provider as ReduxProvider } from 'react-redux';
import * as questionActions from './redux/questions';
import * as commentActions from './redux/comments';
import { RouterProvider } from 'react-router-dom';
import * as sessionActions from './redux/session';
import * as answerActions from './redux/answers';
import * as followActions from './redux/follows';
import * as saveActions from './redux/saves';
import * as voteActions from './redux/votes';
import * as tagActions from './redux/tags';
import configureStore from './redux/store';
import ReactDOM from 'react-dom/client';
import { router } from './router';
import React from 'react';
import './normalize.css';
import './index.css';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  window.questionActions = questionActions;
  window.sessionActions = sessionActions;
  window.commentActions = commentActions;
  window.answerActions = answerActions;
  window.followActions = followActions;
  window.saveActions = saveActions;
  window.voteActions = voteActions;
  window.tagActions = tagActions;
  window.store = store;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
