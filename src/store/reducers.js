const reducer = (state = {}, action) => {
  switch(action.type) {
    case 'GET_LOCATION_DATA':
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
    default:
      return state
  }
}

export default reducer;