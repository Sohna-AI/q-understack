import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import QuestionListPage from '../components/QuestionListPage';

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
                element: <QuestionListPage />,
                children: [
                    {
                        path: 'answers'
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
        ],
    },
]);