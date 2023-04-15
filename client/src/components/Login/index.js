import React, { useState } from "react";

import API from "../../utils/api";

export const Login = () => {
    const [surfer, setSurfer] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        API.login({
            username: surfer.username,
            password: surfer.password
        })
            .then(response => {
                console.log(response, "you are logged in?")
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
                <input
                    name="submit"
                    type="submit"
                    onClick={handleFormSubmit}
                />
            </form>


        </>
    )
}