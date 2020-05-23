import React, {useEffect, useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {getGeoLocationData, getGeoLocationWeatherData, getCityWeatherData} from './store/actions';

import Main from './components/Main';

import './App.scss';

const App = (props) => {
  const {
    getGeoLocationData,
    getGeoLocationWeatherData,
    getCityWeatherData,
    latitude,
    longitude,
    weatherData,
    cityName } = props;

  const [tempUnit, setTempUnit] = useState({
    unit: 'metric', toggle: false
  });

  const handleTempUnit = useCallback(() => {
    setTempUnit({
      ...tempUnit, toggle: !tempUnit.toggle, unit: tempUnit.toggle ? 'metric' : 'imperial',
    })
  }, [tempUnit])

  useEffect(() => {
    if(cityName === undefined) {
      getGeoLocationData();
      if(latitude && longitude) {
        getGeoLocationWeatherData(latitude, longitude, tempUnit.unit)
      }
    } else {
      getCityWeatherData(cityName, tempUnit.unit)
    }
  }, [getGeoLocationData, latitude, longitude, getGeoLocationWeatherData, tempUnit, handleTempUnit, cityName, getCityWeatherData])

  
  const refreshWeatherData = () => {
    getGeoLocationWeatherData(latitude, longitude, tempUnit.unit);
  }
  
  return (
    <div className="App">
      <Main weatherData={weatherData} refreshWeatherData={refreshWeatherData} setTempUnit={handleTempUnit} tempUnit={tempUnit.toggle}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    weatherData: state.weatherData,
    weatherDataNotFound: state.weatherDataNotFound,
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
    },
    getCityWeatherData: (city, tempUnit) => {
      dispatch(getCityWeatherData(city, tempUnit))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
