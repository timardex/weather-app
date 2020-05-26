import axios from 'axios';
import ApiKey from '../helpers/ApiKey';

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

export const getGeoLocationCurrentWeatherData = (latitude, longitude) => {
  return async function(dispatch) {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${ApiKey}`
      );
      const action = {
        type: 'GEO_LOCATION_WEATHER_DATA',
        payload: {
          success: result.data,
          cityName: 'London',
          error: ''
        }
      }
      dispatch(action)
    } catch (error) {
      return error;
    }
  }
}

export const getCityCurrentWeatherData = (city) => {
  return async function(dispatch) {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`
      );
      const action = {
        type: 'CITY_WEATHER_DATA',
        payload: {
          success: result.data,
          error: ''
        }
      }
      dispatch(action)
    } catch (error) {
      const action = {
        type: 'CITY_WEATHER_DATA_NOT_FOUND',
        payload: city === '' ? 'Please enter a city name.' : `No such city like ${city}, please try again.`
      }
      dispatch(action)
    }
  }
}

export const getForecast = (city) => {
  return async function(dispatch) {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${ApiKey}`
      );
      const action = {
        type: 'CITY_FORECAST_DATA',
        payload: result.data
      }
      dispatch(action)
    } catch (error) {
      return error;
    }
  }
}

export const getCityName = (city) => {
  return function(dispatch) {
    const action = {
      type: 'CITY_NAME',
      payload: city
    }
    dispatch(action)
  }
}

export const toggleUnit = (toggle) => {
  return function(dispatch) {
    const action = {
      type: 'TOGGLE_UNIT',
      payload: toggle
    }
    dispatch(action)
  }
}