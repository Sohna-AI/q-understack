import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ searchValue, setSearchValue }) {
    const navigate = useNavigate();

    const onFutureFeatureClick = (e) => {
        e.preventDefault();
        return alert('Coming Soon!');
    };

    const handleClick = () => {
        window.scroll(0, 0);
        navigate('/');
    }

    return (
        <>
            <div id="navbar">
                <div id="logo_about_links">
                    <p id="logo" onClick={handleClick}>
                        <img src="/q-understack-logo.png" alt="" />
                    </p>
                    <NavLink onClick={onFutureFeatureClick} to="/about">About</NavLink>
                </div>
                <div>
                    <input
                        type="search"
                        name="search_bar"
                        id="search_bar"
                        placeholder="Search for questions"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
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
