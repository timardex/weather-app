import React, {useEffect, useState, useCallback} from 'react';
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

  const [tempUnit, setTempUnit] = useState({
    unit: 'metric', toggle: false
  });

  const handleTempUnit = useCallback(() => {
    setTempUnit({
      ...tempUnit, toggle: !tempUnit.toggle, unit: tempUnit.toggle ? 'metric' : 'imperial',
    })
  }, [tempUnit]);

  const refreshWeatherData = () => {
    getGeoLocationWeatherData(latitude, longitude, tempUnit.unit);
  };

  useEffect(() => {
    getGeoLocationData();
    if(latitude && longitude) {
      getGeoLocationWeatherData(latitude, longitude, tempUnit.unit)
    }    
  }, [getGeoLocationData, latitude, longitude, getGeoLocationWeatherData, tempUnit.unit])
  
  return (
    <div className="App">
      <Main
        weatherData={weatherData}
        refreshWeatherData={refreshWeatherData}
        setTempUnit={handleTempUnit}
        tempUnit={tempUnit}/>
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
