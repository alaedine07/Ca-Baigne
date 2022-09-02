const axios = require("axios");
const moment = require("moment");

const API_KEY = "s5HiloZx1QJUkyOSpDU1Bo5cpTdu4yaT";
const API_URL = "https://api.windy.com/api/point-forecast/v2"

function getWindyApiData () {
    requestData =  {
        "lat": 37.334,
        "lon": 9.844,
        "model": "gfs",
        "parameters": ["wind", "waves"],
        "levels": ["surface"],
        "key": "s5HiloZx1QJUkyOSpDU1Bo5cpTdu4yaT"
    }
    console.log(requestData);
    const promise = axios.post("https://api.windy.com/api/point-forecast/v2", requestData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
}

function convertDate(timeStamps) {
    const today = moment().format("DD-MM-YYYY HH:mm:ss");
    todayTimeStamps = []
    timeStamps.map(function (element) {
        const dateTimeString = moment(element).format("DD-MM-YYYY HH:mm:ss");
        if (dateTimeString.split(' ')[0] === today.split(' ')[0])
        {
            todayTimeStamps.push(element)
        }
    })
    return todayTimeStamps
}

function getWindSpeed(stamps, wind_u_array, wind_v_array) {
    const todayWind_u = wind_u_array.slice(0, stamps);
    const todayWind_v = wind_v_array.slice(0, stamps);
    const windSpeedArray = [];
    for (let i = 0; i < stamps; i++) {
        const windSpeed = Math.sqrt( Math.pow(todayWind_u[i], 2) + Math.pow(todayWind_v[i], 2));
        windSpeedArray.push(windSpeed);
    }
    return windSpeedArray;
}

getWindyApiData().then(res => {
    const data = res;
    const timeStamps = data.ts;
    // extract timestamps related to today
    todayTimeStamps = convertDate(timeStamps);
    stamps = todayTimeStamps.length;
    windSpeedArray = getWindSpeed(stamps, data["wind_u-surface"], data["wind_v-surface"]);
    console.log(windSpeedArray);
}).catch(err => console.log(err));


// The component u defines the speed of a wind blowing from the West towards the East 
// (a negative value therefore implies the opposite direction). 
// The component v similarly defines the speed of a wind blowing from the South towards the North.
