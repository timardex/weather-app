import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getGeoLocationData, getGeoLocationCurrentWeatherData} from './store/actions';

import Main from './components/Main';

import './App.scss';

const App = (props) => {
  const {
    getGeoLocationData,
    getGeoLocationCurrentWeatherData,
    latitude,
    longitude } = props;

  useEffect(() => {
    getGeoLocationData();
    if(latitude && longitude) {
      getGeoLocationCurrentWeatherData(latitude, longitude);
    }
  }, [getGeoLocationData, latitude, longitude, getGeoLocationCurrentWeatherData])
  
  return (
    <div className="App">
      <Main />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    latitude: state.latitude,
    longitude: state.longitude
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGeoLocationData: () => {
      dispatch(getGeoLocationData())
    },
    getGeoLocationCurrentWeatherData: (latitude, longitude) => {
      dispatch(getGeoLocationCurrentWeatherData(latitude, longitude))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
