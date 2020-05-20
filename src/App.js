import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getLocationData, getGeoLocationWeatherData} from './store/actions';

import Header from './components/Header';

import './App.scss';

const App = (props) => {
  const { getLocationData, getGeoLocationWeatherData, latitude, longitude, weatherData } = props;
  const tempUnit = 'metric';

  useEffect(() => {
    getLocationData();
    if(latitude && longitude) {
      getGeoLocationWeatherData(latitude, longitude, tempUnit)
    }
  }, [getLocationData, latitude, longitude, getGeoLocationWeatherData])

  return (
    <div className="App">
      <main>
        <div className="container">
          <Header {...weatherData}/>
        </div>
      </main>
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
