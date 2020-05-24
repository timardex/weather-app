import React from 'react';
import {connect} from 'react-redux';
import {weatherIcon} from '../../../helpers/';

import './style.scss';

const WeatherInfo = (props) => {
  const {currentWeatherData, moreDetails, toggleTempUnit} = props;
  const {weather, main} = currentWeatherData ? currentWeatherData : '';
  const {temp} = main ? main : '';
  const getWeatherType = weather ? weather.map(value => value.main).toString().toLowerCase() : null;

  const getTemperatureUnit = () => {
    const celsiusToFahrenheit = parseInt((temp * 1.8) + 32);
    const converted = toggleTempUnit ? parseInt(temp) : celsiusToFahrenheit;
    return converted.toString();
  }

  return (
    <div className="weather-info">
      <div className="temperature">{getTemperatureUnit()}</div>
      <div className="units">
        {toggleTempUnit ? 'C' : 'F'}
        {!moreDetails && weatherIcon(getWeatherType)}
      </div>

      <div className="weather-type">{getWeatherType}</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentWeatherData: state.currentWeatherData,
  }
}

export default connect(mapStateToProps, null)(WeatherInfo);