import React from "react";
import "./index.css";



export const Search = () => {
    return (
        <div id="weather-search-card">
            <div className="row">
                <div id="search-bar-header">
                    <h1>Enter a City Name</h1>
                    <input type="text" id="city-name"></input>
                        <button id="button-search" data-toggle="modal">Search</button>
                </div>
            </div>
        </div>
    )
}


