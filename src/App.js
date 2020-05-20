import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Header from './components/Header';
import {getLocationData, getGeoLocationWeatherData} from './store/actions';

import './App.scss';

const App = (props) => {
  const { getLocationData, getGeoLocationWeatherData, latitude, longitude, weatherData } = props;

  useEffect(() => {
    getLocationData();
    if(latitude && longitude) {
      getGeoLocationWeatherData(latitude, longitude)
    }
  }, [getLocationData, latitude, longitude, getGeoLocationWeatherData])

  return (
    <div className="App">
      <main>
        <div className="container">
        <Header />
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
    getGeoLocationWeatherData: (latitude, longitude) => {
      dispatch(getGeoLocationWeatherData(latitude, longitude))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
