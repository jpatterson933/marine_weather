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
                const utcString = response.headers.date;
                const dateObj = new Date(utcString);
                const unixTimestamp = Math.floor(dateObj.getTime() / 1000);
                localStorage.setItem("loggedDate", unixTimestamp)
                setSurfer({
                    user: response.data.user.userName
                })

            })
            .catch(error => {
                console.error(error);
            })
    }
    console.log(new Date())
    const handleInputChange = (event) => {
        const existingSurfer = { ...surfer }
        existingSurfer[event.target.name] = event.target.value;
        setSurfer(existingSurfer)
    }

    return (
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
    )
}



const ShowLogin = () => {
    const [stateManagement, setStateManagement] = useState();

    // const [tokenExpiration, setTokenExpiration] = useState(null);
    useEffect(() => {
    const loggedTime = localStorage.getItem("loggedDate")
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    const timeDifference = currentTimeStamp - loggedTime;
    console.log(timeDifference)
        if (loggedTime && timeDifference < 300) {
            setStateManagement(true);
        } else if (!loggedTime || timeDifference > 300) {
            localStorage.removeItem("loggedDate");
            setStateManagement(false);
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
