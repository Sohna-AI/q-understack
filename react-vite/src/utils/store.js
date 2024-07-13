// import * as questionActions from '../redux/questions';
// import * as commentActions from '../redux/comments';
// import * as sessionActions from '../redux/sessions';
// import * as answerActions from '../redux/answers';
// import * as followActions from '../redux/follows';
// import * as saveActions from '../redux/saves';
// import * as userActions from '../redux/users';
// import * as voteActions from '../redux/votes';
// import * as tagActions from '../redux/tags';

// export const thunkGetAllQuestions = () => async (dispatch) => {
//     const response = await fetch('/api/questions');
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(setQuestions(data));
//     } else if (response.status < 500) {
//         const errorMessages = await response.json();
//         return errorMessages;
//     } else {
//         return { server: 'Something went wrong. Please try again' };
//     }
// };

// export const thunkGetQuestionDetailsById = (questionId) => async (dispatch) => {
//     const response = await fetch(`/api/questions/${questionId}`);
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(setCurrentQuestion(data));
//     } else if (response.status < 500) {
//         const errorMessages = await response.json();
//         return errorMessages;
//     } else {
//         return { server: 'Something went wrong. Please try again' };
//     }
// };

// export const thunkCreateQuestion = (data) => async (dispatch) => {
//     const response = await fetch(
//         '/api/questions',
//         {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         })
//     if (response.ok) {
//         const data = response.json();
//         console.log(data);
//     }
// }

// export const thunkGetUserQuestions = () => async (dispatch) => {
//     const response = await fetch('/api/questions/current');
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(setUserQuestions(data.questions));
//     } else if (response.status < 500) {
//         const errorMessages = await response.json();
//         return errorMessages;
//     } else {
//         return { server: 'Something went wrong. Please try again' };
//     }
// };

// export const thunkDeleteQuestion = (questionId) => async (dispatch) => {
//     const response = await fetch(`/api/questions/${questionId}`, {
//         method: 'DELETE',
//     });
//     if (response.ok) {
//         dispatch(deleteQuestion(questionId));
//     } else if (response.status < 500) {
//         const errorMessages = await response.json();
//         return errorMessages;
//     } else {
//         return { server: 'Something went wrong. Please try again' };
//     }
// };

// export const thunkGetSavedQuestions = () => async (dispatch) => {
//     const response = await fetch('/api/questions/saves');
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(setSavedQuestions(data.questions));
//     } else if (response.status < 500) {
//         const errorMessages = await response.json();
//         return errorMessages;
//     } else {
//         return { server: 'Something went wrong. Please try again' };
//     }
// };

// export const thunkUnsaveQuestion = (questionId) => async (dispatch) => {
//     const response = await fetch(`/api/questions/${questionId}/save`, {
//         method: 'DELETE',
//     });
//     if (response.ok) {
//         dispatch(unsaveQuestion(questionId));
//     }
// };
