import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        closeMenu();
        return navigate('/')
    };

    return (
        <>
            <button id="profile_button" onClick={toggleMenu}>
                <FaUserCircle /> My Profile
            </button>
            {showMenu && (
                <ul className={"profile-dropdown"} ref={ulRef}>
                    {user ? (
                        <>
                            <li>{user.username}</li>
                            <li>{user.email}</li>
                            <li><p className="dropdown-links" onClick={() => navigate('/user/questions')}>Your questions</p></li>
                            <li>
                                <button id="logout_button" onClick={logout}>Log Out</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <OpenModalMenuItem
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </>
                    )}
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
