import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getGeoLocationData, getGeoLocationCurrentWeatherData} from './store/actions';
import {Loading} from './assets/svg/Loading';
import Main from './components/Main';

import './App.scss';

const App = (props) => {
  const {
    getGeoLocationData,
    getGeoLocationCurrentWeatherData,
    latitude,
    longitude,
    currentWeatherData } = props;

  const [loaded, setLoading] = useState(false);

  useEffect(() => {
    getGeoLocationData();
    if(latitude && longitude) {
      getGeoLocationCurrentWeatherData(latitude, longitude);
    }
  }, [getGeoLocationData, latitude, longitude, getGeoLocationCurrentWeatherData])

  useEffect(() => {
    setLoading(currentWeatherData !== undefined)
  }, [currentWeatherData])
  
  return (
    <div className="App">
      {!loaded && <div className="loading">
        <Loading />
      </div>}
      {loaded && <Main />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentWeatherData: state.currentWeatherData,
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
