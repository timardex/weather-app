import React, {useEffect, useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {getGeoLocationData, getGeoLocationWeatherData, getCityName} from './store/actions';

import Main from './components/Main';

import './App.scss';

const App = (props) => {
  const {
    getGeoLocationData,
    getGeoLocationWeatherData,
    getCityName,
    latitude,
    longitude,
    weatherData } = props;

  const [tempUnit, setTempUnit] = useState({
    unit: 'metric', toggle: false
  });

  const handleTempUnit = useCallback(() => {
    setTempUnit({
      ...tempUnit, toggle: !tempUnit.toggle, unit: tempUnit.toggle ? 'metric' : 'imperial',
    })
  }, [tempUnit])

  useEffect(() => {
    getCityName();
    getGeoLocationData();
    if(latitude && longitude) {
      getGeoLocationWeatherData(latitude, longitude, tempUnit.unit)
    }
  }, [getGeoLocationData, latitude, longitude, getGeoLocationWeatherData, tempUnit, getCityName])

  return (
    <div className="App">
      <Main weatherData={weatherData} setTempUnit={handleTempUnit} tempUnit={tempUnit.toggle}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    weatherData: state.weatherData,
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
    getCityName: () => {
      dispatch(getCityName())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
