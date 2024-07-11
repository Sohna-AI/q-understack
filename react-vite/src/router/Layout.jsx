
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer/Footer";

export default function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            <ModalProvider>
                <Navigation />
                <div id="main__container">
                    <Sidebar />
                    {isLoaded && <Outlet />}
                    <Modal />
                </div>
                <Footer />
            </ModalProvider>
        </>
    );
}