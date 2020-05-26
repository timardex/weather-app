import React from 'react';
import {connect} from 'react-redux';
import {weatherType, weatherIcon, toggleMetricImperial} from '../../../helpers/'
import ForecastDetails from '../ForecastDetails';

import {Wind} from '../../../assets/svg/Wind';
import {Thermometer} from '../../../assets/svg/Thermometer';
import {Clock} from '../../../assets/svg/Clock';

import './style.scss';

const CurrentDetails = (props) => {
  const {currentWeather, forecast, toggleUnitValue} = props;
  const {weather, main, wind} = currentWeather ? currentWeather : '';
  const {speed} = wind ? wind : '';
  const {pressure, humidity} = main ? main : '';
  const getWeatherType = weatherType(weather);

  const currentDeatils = [
    { text: toggleMetricImperial(speed, toggleUnitValue) + `${toggleUnitValue ? ' miles/h' : ' meter/s'}`, icon: <Wind /> },
    { text: pressure, icon: <Thermometer /> },
    { text: getWeatherType, icon: weatherIcon(getWeatherType) },
    { text: humidity + '%', icon: <Clock /> }
  ]
  
  return (
    <div>
      <ul className="current-details">
        {currentDeatils.map((value, key) => {
          return (
            <li key={key}>
              <span className="left">{value.text}</span>
              <span className="right">{value.icon}</span>
            </li>
          )
        })}
      </ul>

      <ForecastDetails forecast={forecast} showWind={true} showTime={true} description={'24 - hours forecast'}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    toggleUnitValue: state.toggleUnitValue
  }
}

export default connect(mapStateToProps, null)(CurrentDetails);