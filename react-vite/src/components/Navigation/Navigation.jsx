import { NavLink, redirect } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
    return (
        <>
            <div id="navbar">
                <div id="logo_about_links">
                    <p
                        id="logo"
                        onClick={() => redirect('/')}
                    >LOGO PLACEHOLDER</p>
                    <NavLink to='/about'>About</NavLink>
                </div>
                <div>
                    <input
                        type="search"
                        name="search_bar"
                        id="search_bar"
                        placeholder='Search...'
                    />
                </div>
                <div id="home_profile_links">
                    <NavLink to='/'>Home</NavLink>
                    <ProfileButton />
                </div>
            </div>
            <div className="split"></div>
        </>
    );
}

export default Navigation;
