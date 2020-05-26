const reducer = (state = {}, action) => {
  switch(action.type) {
    case 'GET_GEO_LOCATION_DATA':
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      }
    case 'GEO_LOCATION_WEATHER_DATA':
      return {
        ...state,
        currentWeatherData: action.payload.success,
        cityName: action.payload.cityName,
        dataNotFound: action.payload.error
      }
    case 'CITY_FORECAST_DATA':
      return {
        ...state,
        forecastWeatherData: action.payload
      }
    case 'CITY_WEATHER_DATA':
      return {
        ...state,
        currentWeatherData: action.payload.success,
        dataNotFound: action.payload.error
      }
    case 'CITY_WEATHER_DATA_NOT_FOUND':
      return {
        ...state,
        dataNotFound: action.payload
      }
    case 'CITY_NAME':
      return {
        ...state,
        cityName: action.payload
      }
    case 'TOGGLE_UNIT':
      return {
        ...state,
        toggleUnitValue: !action.payload
      }
    default:
      return state
  }
}

export default reducer;