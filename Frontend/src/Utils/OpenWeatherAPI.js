const axios = require("axios");

const API_KEY = "de668cda57d2ffe3f3b8fadc3fdeb118"

const getWeather = (res) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=36.8065&lon=10.1815&appid=${API_KEY}&units=metric`)
    .then(response => {
        const { main, weather } = response.data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
          weather[0]["icon"]}.svg`
          console.log(weather)
        console.log(main.temp.toFixed())
        console.log(weather[0].description)
    })
    .catch(error => console.log(error))

}

getWeather()
