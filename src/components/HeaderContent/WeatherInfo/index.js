import React from 'react';
import {connect} from 'react-redux';
import {weatherIcon, weatherType, toggleMetricImperial} from '../../../helpers/';

import './style.scss';

const WeatherInfo = (props) => {
  const {currentWeatherData, moreDetails, toggleUnitValue} = props;
  const {weather, main} = currentWeatherData ? currentWeatherData : '';
  const {temp} = main ? main : '';
  const getWeatherType = weatherType(weather);
  
  return (
    <div className="weather-info">
      <div className="temperature">{toggleMetricImperial(temp, toggleUnitValue)}</div>
      <div className="units">
        {toggleUnitValue ? 'F' : 'C'}
        {!moreDetails && weatherIcon(getWeatherType)}
      </div>

      <div className="weather-type">{getWeatherType}</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentWeatherData: state.currentWeatherData,
    toggleUnitValue: state.toggleUnitValue
  }
}

export default connect(mapStateToProps, null)(WeatherInfo);