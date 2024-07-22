import { useSelector } from 'react-redux';
import QuestionListPage from '../QuestionListPage';
import './LandingPage.css';
import { NavLink } from 'react-router-dom';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

export default function LandingPage() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      {!sessionUser ? (
        <div className="landing-page-container">
          <div className="landing-page-main-logo-container">
            <img src="/q-understack-main-logo.png" alt="" className="landing-page-main-logo" />
          </div>
          <div className="landing-page-buttons-container">
            <div className="landing-page-questions-button-container button">
              <NavLink to="/questions">
                <button className="landing-page-questions-button button">View all questions</button>
              </NavLink>
            </div>
            <div className="landing-page-login-button-container">
              <span>Already have an account?</span>
              <button className="landing-page-login-button button">
                <OpenModalMenuItem itemText="Log In" modalComponent={<LoginFormModal />} />
              </button>
            </div>
            <div className="landing-page-signup-button-container">
              <span>Don&apos;t have an account?</span>
              <button className="landing-page-signup-button button">
                <OpenModalMenuItem itemText="Sign Up" modalComponent={<SignupFormModal />} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <QuestionListPage homePage={true} />
      )}
    </>
  );
}
