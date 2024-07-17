import { NavLink, useNavigate } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
  const navigate = useNavigate();

  return (
    <>
      <div id="navbar">
        <div id="logo_about_links">
          <p id="logo" onClick={() => navigate('/')}>
            <img src="../../../public/q-understack-logo.png" alt=""/>
          </p>
          <NavLink to="/about">About</NavLink>
        </div>
        <div>
          <input type="search" name="search_bar" id="search_bar" placeholder="Search..." />
        </div>
        <div id="home_profile_links">
          <NavLink to="/">Home</NavLink>
          <ProfileButton />
        </div>
      </div>
      <div className="split"></div>
    </>
  );
}

export default Navigation;
