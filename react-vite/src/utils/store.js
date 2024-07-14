import * as questionActions from '../redux/questions';
// import * as commentActions from '../redux/comments';
// import * as sessionActions from '../redux/sessions';
import * as answerActions from '../redux/answers';
// import * as followActions from '../redux/follows';
// import * as saveActions from '../redux/saves';
import * as userActions from '../redux/users';
// import * as voteActions from '../redux/votes';
import * as tagActions from '../redux/tags';

const separateQuestionData = (data) => async (dispatch) => {
    const ids = { tag: [], user: [] }
    const separatedData = { tags: [], questions: [], users: [], answers: [], comments: [] };
    data.questions.forEach((question) => {
        const newData = structuredClone(question);
        for (let i = 0; i < newData.tags.length; i++) {
            const tag = newData.tags[i]
            if (ids.tag.indexOf(tag.id) < 0) {
                ids.tag.push(tag.id);
                separatedData.tags.push(structuredClone(tag));
            }
            newData.tags[i] = tag.id
        }
        if (ids.user.indexOf(question.user_id) < 0) {
            separatedData.users.push(structuredClone(question.author));
            ids.user.push(question.user_id);
        }
        delete newData.author;
        if (question.answers) {
            separatedData.answers = structuredClone(question.answers);
            delete newData.answers;
        }
        if (question.comments) {
            separatedData.comments = structuredClone(question.comments);
            delete newData.comments;
        }
        separatedData.questions.push(newData);
    });
    if (separatedData.questions.length > 0) await dispatch(questionActions.setQuestions(separatedData.questions));
    if (separatedData.answers.length > 0) await dispatch(answerActions.setAnswers(separatedData.answers));
    if (separatedData.users.length > 0) await dispatch(userActions.setUsers(separatedData.users));
    if (separatedData.tags.length > 0) await dispatch(tagActions.setTags(separatedData.tags));
    return;
};

export const thunkGetAllQuestions = () => async (dispatch) => {
    const response = await fetch('/api/questions');
    if (response.ok) {
        const data = await response.json();
        return await dispatch(separateQuestionData(data));
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
        return await dispatch(separateQuestionData({ questions: [data] }));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: 'Something went wrong. Please try again' };
    }
};

export const thunkCreateQuestion = (question) => async (dispatch) => {
    const response = await fetch(
        '/api/questions',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: question
        })
    if (response.ok) {
        const data = await response.json();
        return await dispatch(separateQuestionData({ questions: [data] }));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: 'Something went wrong. Please try again' };
    }
}

export const thunkGetUserQuestions = () => async (dispatch) => {
    const response = await fetch('/api/questions/current');
    if (response.ok) {
        const data = await response.json();
        return await dispatch(separateQuestionData(data));
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

export const thunkGetSavedQuestions = () => async (dispatch) => {
    const response = await fetch('/api/questions/saves');
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        return await dispatch(separateQuestionData(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: 'Something went wrong. Please try again' };
    }
};

export const thunkUnsaveQuestion = (questionId) => async (dispatch) => {
    const response = await fetch(`/api/questions/${questionId}/save`, {
        method: 'DELETE',
    });
    if (response.ok) {
        // dispatch(unsaveQuestion(questionId));
    }
};
