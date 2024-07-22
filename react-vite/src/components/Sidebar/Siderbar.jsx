import { FaBookmark, FaHome, FaQuestionCircle, FaTag } from 'react-icons/fa';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    const onFutureFeatureClick = (e) => {
        e.preventDefault();
        return alert('Coming Soon!');
    };

    return (
        <div id="sidebar">
            <div id="sidebar__main-links">
                <NavLink to="/" onClick={() => window.scroll(0, 0)}>
                    <FaHome style={{ fontSize: 16 }} />
                    Home
                </NavLink>
                <NavLink to="/questions" onClick={() => window.scroll(0, 0)}>
                    <FaQuestionCircle style={{ fontSize: 16 }} />
                    Questions
                </NavLink>
                <NavLink to="/tags" onClick={onFutureFeatureClick}>
                    <FaTag style={{ fontSize: 16 }} /> Tags
                </NavLink>
            </div>
            <div id="sidebar__sub-links">
                <NavLink to="/user/saves" onClick={() => window.scroll(0, 0)}>
                    <FaBookmark style={{ fontSize: 16 }} /> Saves
                </NavLink>
            </div>
        </div>
    );
}
