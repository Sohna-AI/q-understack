import { NavLink, useNavigate } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
    const navigate = useNavigate();

    const onFutureFeatureClick = (e) => {
        e.preventDefault();
        return alert('Coming Soon!');
    };

    return (
        <>
            <div id="navbar">
                <div id="logo_about_links">
                    <p id="logo" onClick={() => navigate('/')}>
                        <img src="/q-understack-logo.png" alt="" />
                    </p>
                    <NavLink onClick={onFutureFeatureClick} to="/about">About</NavLink>
                </div>
                <div>
                    <input type="search" name="search_bar" id="search_bar" placeholder="Feature coming soon..." />
                </div>
                <div id="home_profile_links">
                    <ProfileButton />
                </div>
            </div>
            <div className="split"></div>
        </>
    );
}

export default Navigation;
