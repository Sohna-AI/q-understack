import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import TestAnswer from '../components/TestAnswer'
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import QuestionListPage from '../components/QuestionListPage';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "",
                element: <LandingPage />,
            },
            {
                path: 'questions',
                children: [
                    {
                        path: "",
                        element: <QuestionListPage />,
                    },
                    {
                        path: ':question_id',
                        children: [
                            {
                                path: "",
                                element: <h1>question page</h1>
                            },
                            {
                                path: "answers",
                                element: <TestAnswer />
                            }
                        ]
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
