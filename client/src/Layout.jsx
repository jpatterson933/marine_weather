import React, { useEffect, useState } from "react";
// bring in necessary components
import { Login } from "./components/Login";
import { Footer } from "./components/Footer";


const ShowLogin = () => {
    const [stateManagement, setStateManagement] = useState();
    useEffect(() => {
        let existToke = sessionStorage.getItem("seshToke");
        if (existToke) {
            setStateManagement(true);
        } else if (!existToke) {
            setStateManagement(false)
        }
    }, [])


    return (
        (!stateManagement) ?
            <>
                <h1>Please Login</h1>
                <Login />
            </>
            :
            <h1>Sesh in progress.</h1>
    );

};

const Layout = ({ children }) => {

    return (
        <>
            <nav>
                <ul>
                    <ShowLogin />
                </ul>
            </nav>

            {children}
            {/* This is the footer component located on /component/Footer/index.js */}
            <Footer />
        </>

    );
};

export default Layout;
