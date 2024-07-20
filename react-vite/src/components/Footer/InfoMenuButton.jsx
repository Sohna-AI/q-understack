import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

function InfoMenuButton({ text, data }) {
    const [showMenu, setShowMenu] = useState(false);
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

    return (
        <>
            <button onClick={toggleMenu}>{text}</button>
            {showMenu && (
                <div className={`${text}-link-container`}>
                    {data?.map((developer) => {
                        return (
                            <div key={`key${developer.name}`}>
                                <NavLink to={developer.link}>
                                    <p>{developer.name}</p>
                                </NavLink>
                            </div>
                        )
                    })
                    }
                </div>
            )}
        </>
    );
}

export default InfoMenuButton;
