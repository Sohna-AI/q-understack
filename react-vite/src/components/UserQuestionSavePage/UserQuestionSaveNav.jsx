import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import './UserQuestionSaveNav.css';

const UserQuestionSaveNav = ({ children }) => {
    const user = useSelector((state) => state.session.user);
    return (
        <div>
            <header>
                <h1 className='user-save-page-username'>{user.username}</h1>
                <nav>
                    <div className="user-save-questions-nav-links-container">
                        <NavLink
                            to="/user/questions"
                            className={({ isActive }) =>
                                isActive ? 'active user-question-button-link' : 'user-question-button-link'
                            }
                        >
                            <button className="user-question-button-link">Questions</button>
                        </NavLink>

                        <NavLink
                            to="/user/saves"
                            className={({ isActive }) =>
                                isActive ? 'active user-saves-button-link' : 'user-saves-button-link'
                            }
                        >
                            <button className="user-saves-button-link">Saves</button>
                        </NavLink>
                    </div>
                </nav>
            </header>
            <main>{children}</main>
            <Outlet />
        </div>
    );
};

export default UserQuestionSaveNav;
