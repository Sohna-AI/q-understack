import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import QuestionListPage from '../components/QuestionListPage';
import QuestionDetailPage from '../components/QuestionDetailPage';
import SavedQuestions from '../components/SavesPage/SavesPage';
import UserQuestions from '../components/UserQuestions/UserQuestions';
import UserQuestionSaveNav from '../components/UserQuestionSavePage/UserQuestionSaveNav';
// import TestAnswer from '../components/TestAnswer/TestAnswer';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <LandingPage />,
            },
            {
                path: 'questions',
                children: [
                    {
                        index: true,
                        element: <QuestionListPage />,
                    },
                    {
                        path: ':questionId',
                        element: <QuestionDetailPage />,
                    },
                ],
            },
            {
                path: 'user',
                element: <UserQuestionSaveNav />,
                children: [
                    {
                        path: 'saves',
                        element: <SavedQuestions />,
                    },
                    {
                        path: 'questions',
                        element: <UserQuestions />,
                    },
                ],
            },
            {
                path: 'login',
                element: <LoginFormPage />,
            },
            {
                path: 'signup',
                element: <SignupFormPage />,
            },
            // {
            //     path: "test",
            //     element: <TestAnswer />
            // }
        ],
    },
]);
