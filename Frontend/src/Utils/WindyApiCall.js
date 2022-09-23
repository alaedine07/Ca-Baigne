const axios = require('axios');
const moment = require('moment');

const API_KEY = 's5HiloZx1QJUkyOSpDU1Bo5cpTdu4yaT';
const API_URL = 'https://api.windy.com/api/point-forecast/v2';

function getWindyApiData(la, lo) {
  const requestData = {
    lat: la,
    lon: lo,
    model: 'gfs',
    parameters: ['wind', 'waves'],
    levels: ['surface'],
    key: 's5HiloZx1QJUkyOSpDU1Bo5cpTdu4yaT',
  };
  const promise = axios.post('https://api.windy.com/api/point-forecast/v2', requestData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

function convertDate(timeStamps) {
  const today = moment().format('DD-MM-YYYY HH:mm:ss');
  const todayTimeStamps = [];
  timeStamps.map((element) => {
    const dateTimeString = moment(element).format('DD-MM-YYYY HH:mm:ss');
    if (dateTimeString.split(' ')[0] === today.split(' ')[0]) {
      todayTimeStamps.push(element);
    }
  });
  return todayTimeStamps;
}

function getWindSpeed(stamps, wind_u_array, wind_v_array) {
  const todayWind_u = wind_u_array.slice(0, stamps);
  const todayWind_v = wind_v_array.slice(0, stamps);
  const windSpeedArray = [];
  for (let i = 0; i < stamps; i++) {
    const windSpeed = Math.sqrt(todayWind_u[i] ** 2 + todayWind_v[i] ** 2);
    windSpeedArray.push(windSpeed);
  }
  return windSpeedArray;
}

function getState(windSpeedArray) {
  let sum = 0;
  for (let i = 0; i < windSpeedArray.length; i++) {
    sum += windSpeedArray[i];
  }
  const moy = sum / windSpeedArray.length;
  if (moy < 7) {
    return 'green';
  } if (moy < 10) {
    return 'orange';
  }
  return 'red';
}

const getbeachState = async (la, lo) => {
  const result = await getWindyApiData(la, lo).then((res) => {
    const data = res;
    const timeStamps = data.ts;
    // extract timestamps related to today
    const todayTimeStamps = convertDate(timeStamps);
    const stamps = todayTimeStamps.length;
    const windSpeedArray = getWindSpeed(stamps, data['wind_u-surface'], data['wind_v-surface']);
    const state = getState(windSpeedArray);
    return state;
  }).catch((err) => console.log(err));
  return result;
};

export default getbeachState;

// The component u defines the speed of a wind blowing from the West towards the East
// (a negative value therefore implies the opposite direction).
// The component v similarly defines the speed of a wind blowing from the South towards the North.
