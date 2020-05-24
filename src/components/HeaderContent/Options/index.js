import React from 'react';
import {connect} from 'react-redux';
import {getGeoLocationCurrentWeatherData} from '../../../store/actions';
import {Refresh} from '../../../assets/svg/Refresh';

import './style.scss';

const Options = (props) => {
  const {toggleTempUnit, setTempUnit, getGeoLocationCurrentWeatherData, latitude, longitude} = props;
  return (
    <div className="options">
      <div className="unit-change" onClick={() => setTempUnit(!toggleTempUnit)}>
        {toggleTempUnit ? 'Fahrenheit' : 'Celsius'}
      </div>

      <div className="refresh" title="Check my weather data" onClick={() => getGeoLocationCurrentWeatherData(latitude, longitude)}>
        <Refresh />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    latitude: state.latitude,
    longitude: state.longitude
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGeoLocationCurrentWeatherData: (latitude, longitude) => {
      dispatch(getGeoLocationCurrentWeatherData(latitude, longitude))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);