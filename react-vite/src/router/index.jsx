import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import QuestionListPage from '../components/QuestionListPage';
import QuestionDetailPage from '../components/QuestionDetailPage';
import QuestionForm from '../components/QuestionFormPage';
import Error from '../components/ErrorPage';
import SavesPage from '../components/SavesPage/SavesPage';
import UserQuestions from '../components/UserQuestions/UserQuestions';
import UserQuestionSaveNav from '../components/UserQuestionSavePage/UserQuestionSaveNav';

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
          {
            path: 'new',
            element: <QuestionForm />,
          },
        ],
      },
      {
        path: 'user',
        element: <UserQuestionSaveNav />,
        children: [
          {
            path: 'saves',
            element: <SavesPage />,
          },
          {
            path: 'questions',
            element: <UserQuestions />,
          },
        ],
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);
