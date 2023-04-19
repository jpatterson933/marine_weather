import React, { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import API from "./utils/api";



export const Login = () => {
    const [surfer, setSurfer] = useState();

    const handleFormSubmit = (event) => {
        // event.preventDefault();

        API.login({
            username: surfer.username,
            password: surfer.password
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleInputChange = (event) => {
        const existingSurfer = { ...surfer }
        existingSurfer[event.target.name] = event.target.value;
        setSurfer(existingSurfer)
    }

    return (
        <>
            <form>
                <input
                    name="username"
                    type="text"
                    onChange={(event) => handleInputChange(event)}
                />
                <input
                    name="password"
                    type="password"
                    onChange={(event) => handleInputChange(event)}
                />
                <button type="button" onClick={handleFormSubmit}>Submit</button>
            </form>
        </>
    )
}



const ShowLogin = () => {
    const [stateManagement, setStateManagement] = useState();
    const [tokenExpiration, setTokenExpiration] = useState(null);
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
