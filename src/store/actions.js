import axios from 'axios';

export const getGeoLocationData = () => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Not Supported'));
        }
        navigator.geolocation.getCurrentPosition((position) => {
            const action = {
                type: 'GET_GEO_LOCATION_DATA',
                payload: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                }
            }
            resolve(position);
            dispatch(action)
        }, () => {
            reject(new Error('Permission denied'));
        });
    });
  }
}

export const getGeoLocationWeatherData = (latitude, longitude, units) => {
  return async function(dispatch) {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=6ee8943c317994588d6fa65bc848deae`
      );
      const action = {
        type: 'GEO_LOCATION_WEATHER_DATA',
        payload: result.data
      }
      dispatch(action)
    } catch (error) {
      return error;
    }
  }
}

export const getCityName = () => {
  return async function(dispatch) {
    try {
      const result = await axios.get(
        `https://restcountries.eu/rest/v2/all`
      );
      const action = {
        type: 'GET_CITY_NAME',
        payload: result.data
      }
      dispatch(action)
    } catch (error) {
      return error;
    }
  }
}