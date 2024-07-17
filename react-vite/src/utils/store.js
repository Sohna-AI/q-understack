import * as questionActions from '../redux/questions';
import * as commentActions from '../redux/comments';
// import * as sessionActions from '../redux/sessions';
import * as answerActions from '../redux/answers';
// import * as followActions from '../redux/follows';
import * as saveActions from '../redux/saves';
import * as userActions from '../redux/users';
// import * as voteActions from '../redux/votes';
import * as tagActions from '../redux/tags';

const separateData = (data) => async (dispatch) => {
  const ids = { tag: [], user: [], comment: [], answer: [] };
  const separatedData = { tags: [], questions: [], users: [], answers: [], comments: [], saves: [] };
  const separateAuthor = (author) => {
    if (ids.user.indexOf(author.id) < 0) {
      separatedData.users.push(structuredClone(author));
      ids.user.push(author.id);
    }
  };
  const separateComment = (comment) => {
    if (ids.comment.indexOf(comment.id) < 0) {
      separatedData.comments.push(structuredClone(comment));
      ids.comment.push(comment.id);
    }
  };
  const separateAnswers = (answers) => {
    answers.forEach((answer) => {
      const newAnswer = structuredClone(answer);
      if (ids.answer.indexOf(newAnswer.id) < 0) {
        if (newAnswer.author) {
          separateAuthor(newAnswer.author);
          delete newAnswer.author;
        }
        if (newAnswer.comments) {
          for (let i = 0; i < newAnswer.comments.length; i++) {
            separateComment(newAnswer.comments[i]);
            newAnswer.comments[i] = newAnswer.comments[i].id;
          }
        }
        separatedData.answers.push(newAnswer);
        ids.answer.push(newAnswer.id);
      }
    });
  };
  data.questions.forEach((question) => {
    const newData = structuredClone(question);
    for (let i = 0; i < newData.tags.length; i++) {
      const tag = newData.tags[i];
      if (ids.tag.indexOf(tag.id) < 0) {
        ids.tag.push(tag.id);
        separatedData.tags.push(structuredClone(tag));
      }
      newData.tags[i] = tag.id;
    }
    if (newData.author) separateAuthor(newData.author);
    delete newData.author;
    if (newData.comments) {
      for (let i = 0; i < newData.comments.length; i++) {
        separateComment(newData.comments[i]);
        newData.comments[i] = newData.comments[i].id;
      }
    }
    if (newData.answers) {
      separateAnswers(newData.answers);
      for (let i = 0; i < newData.answers.length; i++) {
        newData.answers[i] = newData.answers[i].id;
      }
    }
    separatedData.questions.push(newData);
  });
  if (data.answers) separateAnswers(data.answers);
  if (data.saves?.length) separatedData.saves = structuredClone(data.saves);
  await dispatch(questionActions.setQuestions(separatedData.questions));
  await dispatch(answerActions.setAnswers(separatedData.answers));
  await dispatch(commentActions.setComments(separatedData.comments));
  await dispatch(userActions.setUsers(separatedData.users));
  await dispatch(saveActions.setSaves(separatedData.saves));
  await dispatch(tagActions.setTags(separatedData.tags));
};

export const thunkGetAllQuestions = () => async (dispatch) => {
  const response = await fetch('/api/questions');
  if (response.ok) {
    const data = await response.json();
    return await dispatch(separateData(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkGetQuestionDetailsById = (questionId) => async (dispatch) => {
  const response = await fetch(`/api/questions/${questionId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(separateData({ questions: [data] }));
    return data;
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkCreateQuestion = (question) => async (dispatch) => {
  const response = await fetch('/api/questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: question,
  });
  if (response.ok) {
    const data = await response.json();
    return await dispatch(separateData({ questions: [data] }));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkUpdateQuestion = (question, questionId) => async (dispatch) => {
  const response = await fetch(`/api/questions/${questionId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: question,
  });
  if (response.ok) {
    const data = await response.json();
    return await dispatch(separateData({ questions: [data] }));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkGetUserQuestions = () => async (dispatch) => {
  const response = await fetch('/api/questions/current');
  if (response.ok) {
    const data = await response.json();
    return await dispatch(separateData(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkDeleteQuestion = (questionId) => async (dispatch) => {
  const response = await fetch(`/api/questions/${questionId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(questionActions.deleteQuestion(questionId));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkGetSaves = () => async (dispatch) => {
  const response = await fetch('/api/saves');
  if (response.ok) {
    const data = await response.json();
    return await dispatch(separateData(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkSaveQuestion = (questionId) => async (dispatch) => {
  const response = await fetch(`/api/questions/${questionId}/save`, {
    method: 'POST',
  });
  if (response.ok) {
    return await dispatch(questionActions.saveQuestion(questionId));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkUnsaveQuestion = (questionId, savesPage) => async (dispatch) => {
  const response = await fetch(`/api/questions/${questionId}/save`, {
    method: 'DELETE',
  });
  if (response.ok) {
    if (response.ok) {
      await dispatch(questionActions.unsaveQuestion(questionId));
      if (savesPage) {
        return dispatch(questionActions.deleteQuestion(questionId));
      }
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: 'Something went wrong. Please try again' };
    }
  }
};

export const thunkSaveAnswer = (answerId) => async (dispatch) => {
  const response = await fetch(`/api/answers/${answerId}/save`, {
    method: 'POST',
  });

  if (response.ok) {
    await dispatch(answerActions.saveAnswer(answerId));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkUnsaveAnswer = (answerId, savesPage) => async (dispatch) => {
  const response = await fetch(`/api/answers/${answerId}/save`, {
    method: 'DELETE',
  });

  if (response.ok) {
    await dispatch(answerActions.unsaveAnswer(answerId));
    if (savesPage) {
      await dispatch(answerActions.deleteAnswer(answerId));
      window.location.reload();
    }
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkDeleteComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    await dispatch(commentActions.deleteComment(commentId));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};
