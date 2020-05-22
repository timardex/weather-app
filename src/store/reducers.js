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
        weatherData: action.payload
      }
    case 'CITY_NAME':
      return {
        ...state,
        cityName: action.payload
      }
    case 'CITY_WEATHER_DATA':
      return {
        ...state,
        weatherData: action.payload
      }
    case 'CITY_WEATHER_DATA_NOT_FOUND':
      return {
        ...state,
        weatherDataNotFound: action.payload
      }
    default:
      return state
  }
}

export default reducer;