import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import QuestionListPage from '../components/QuestionListPage';
import QuestionDetailPage from '../components/QuestionDetailPage';
import QuestionForm from '../components/QuestionFormPage';
import Error from '../components/ErrorPage';
// import TestAnswer from '../components/TestAnswer/TestAnswer';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: 'questions',
                children: [
                    {
                        index: true,
                        element: <QuestionListPage />
                    },
                    {
                        path: ':questionId',
                        element: <QuestionDetailPage />
                    },
                    {
                        path: 'new',
                        element: <QuestionForm />
                    }
                ]
            },
            {
                path: "login",
                element: <LoginFormPage />,
            },
            {
                path: "signup",
                element: <SignupFormPage />,
            },
            // {
            //     path: "test",
            //     element: <TestAnswer />
            // }
            {
                path: '*',
                element: <Error />
            }
        ],
    },
]);
