import React from 'react';
import {connect} from 'react-redux';
import {getGeoLocationCurrentWeatherData, toggleUnit} from '../../../store/actions';
import {Refresh} from '../../../assets/svg/Refresh';

import './style.scss';

const Options = (props) => {
  const {toggleUnitValue, toggleUnit, getGeoLocationCurrentWeatherData, latitude, longitude, setLoaded} = props;

  const handleRefresh = () => {
    setLoaded(false);
    setTimeout(() => {
      getGeoLocationCurrentWeatherData(latitude, longitude);
      setLoaded(true);
    }, 1000)
  }

  return (
    <div className="options">
      <div className="unit-change">
        <span onClick={() => toggleUnit(toggleUnitValue)}>Switch to {toggleUnitValue ? 'Celsius' : 'Fahrenheit'}</span>
      </div>

      <div className="refresh" title="Check my weather data">
        <span onClick={() => handleRefresh()}><Refresh /></span>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    latitude: state.latitude,
    longitude: state.longitude,
    toggleUnitValue: state.toggleUnitValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGeoLocationCurrentWeatherData: (latitude, longitude) => {
      dispatch(getGeoLocationCurrentWeatherData(latitude, longitude))
    },
    toggleUnit: (toggle) => {
      dispatch(toggleUnit(toggle))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);