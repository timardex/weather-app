import React, {useEffect, useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {getLocationData, getGeoLocationWeatherData} from './store/actions';

import Main from './components/Main';

import './App.scss';

const App = (props) => {
  const { getLocationData, getGeoLocationWeatherData, latitude, longitude, weatherData } = props;
  const [tempUnit, setTempUnit] = useState({
    unit: 'metric',
    toggle: false
  });

  const handleTempUnit = useCallback(() => {
    setTempUnit({
      ...tempUnit,
      toggle: !tempUnit.toggle,
      unit: tempUnit.toggle ? 'metric' : 'imperial',
    })
  }, [tempUnit])

  useEffect(() => {
    getLocationData();
    if(latitude && longitude) {
      getGeoLocationWeatherData(latitude, longitude, tempUnit.unit)
    }
  }, [getLocationData, latitude, longitude, getGeoLocationWeatherData, tempUnit])

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
    getLocationData: () => {
      dispatch(getLocationData())
    },
    getGeoLocationWeatherData: (latitude, longitude, tempUnit) => {
      dispatch(getGeoLocationWeatherData(latitude, longitude, tempUnit))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
