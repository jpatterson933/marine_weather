import React, { useState } from "react";
import API from "../../utils/api";

export const Login = () => {
    const [surfer, setSurfer] = useState();

    const handleFormSubmit = (event) => {
        // event.preventDefault();

        API.login({
            username: surfer.username,
            password: surfer.password
        })
            .then(response => {
                const token = response.data.token;
                sessionStorage.setItem('seshToke', token);
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
                <input
                    name="submit"
                    type="submit"
                    onClick={handleFormSubmit}
                />
            </form>
        </>
    )
}