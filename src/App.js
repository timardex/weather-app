import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {getGeoLocationData, getGeoLocationWeatherData} from './store/actions';

import Main from './components/Main';

import './App.scss';

const App = (props) => {
  const {
    getGeoLocationData,
    getGeoLocationWeatherData,
    latitude,
    longitude,
    weatherData} = props;

  const refreshWeatherData = () => {
    getGeoLocationWeatherData(latitude, longitude);
  };

  useEffect(() => {
    getGeoLocationData();
    if(latitude && longitude) {
      getGeoLocationWeatherData(latitude, longitude)
    }    
  }, [getGeoLocationData, latitude, longitude, getGeoLocationWeatherData])
  
  return (
    <div className="App">
      <Main
        weatherData={weatherData}
        refreshWeatherData={refreshWeatherData}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    weatherData: state.weatherData,
    cityName: state.cityName,
    latitude: state.latitude,
    longitude: state.longitude
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGeoLocationData: () => {
      dispatch(getGeoLocationData())
    },
    getGeoLocationWeatherData: (latitude, longitude, tempUnit) => {
      dispatch(getGeoLocationWeatherData(latitude, longitude, tempUnit))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
