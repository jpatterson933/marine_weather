/* 
    Jeffery W. Patterson
    DFBW LLC
*/

require('dotenv').config();



















const axios = require('axios');
const fs = require('fs');
const path = require('path');


let latitude = 34.005;
let longitude = -118.8101;
let savedCity = "Malibu";

// function to write to a file with param fileName and fileData
function writeToFile(fileName, fileData) {



    // fs.writeFile(path, "where the file should go, file name" ./assets/js/surfData.json)
    fs.writeFile(path.join(__dirname, "./assets/js", fileName), JSON.stringify(fileData), (err) => {
        console.log(__dirname)
        if (err) {
            console.log(err);
        } else {
            console.log("100% of Data succssfully saved");
        }
    })
}

const cityFile =`let latitude = ${latitude};
let longitude = -${longitude};
let savedCity = ${JSON.stringify(savedCity)};`

function saveCityInfo (fileName, fileData) {

    fs.writeFile(path.join(__dirname, "./assets/js", fileName), fileData, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("City information saved");
        }
    })
}




const fetchWaveForecastData = (latitude, longitude) => {
    // parameters for surf data request
    const params = 'swellHeight,swellDirection,swellPeriod,waveHeight,wavePeriod,seaLevel,windSpeed,windDirection,currentDirection,currentSpeed';
    // axios options for request
    const options = {
        method: 'GET',
        url: `https://stormglass.p.rapidapi.com/forecast?lat=${latitude}&lng=${longitude}&params=${params}`,
        params: { lng: longitude, lat: latitude },
        headers: {
            "x-rapidapi-host": "stormglass.p.rapidapi.com",
            "x-rapidapi-key": process.env.MARINE_KEY
        }
    };

    // axios request line here
    axios
        .request(options)
        .then((response) => {
            console.log(response, "response");

            return response.data;
        })
        .then((data) => {
            console.log(data)

            writeToFile("surfData.json", data);
            saveCityInfo("cityInfo.js", cityFile)
        })
        .catch((error) => {
            console.log(error);
        });



};

fetchWaveForecastData(latitude, longitude);