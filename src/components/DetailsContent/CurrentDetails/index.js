import React from 'react';
import {connect} from 'react-redux';

import {weatherIcon} from '../../../helpers';
import {Wind} from '../../../assets/svg/Wind';
import {Thermometer} from '../../../assets/svg/Thermometer';
import {Clock} from '../../../assets/svg/Clock';

import TwentyFourHourDetails from '../TwentyFourHourDetails';

const CurrentDetails = (props) => {
  const {currentWeatherData} = props;
  const {weather, main, wind} = currentWeatherData ? currentWeatherData : '';
  const {speed} = wind ? wind : '';
  const {pressure, humidity} = main ? main : '';
  const getWeatherType = weather ? weather.map(value => value.main).toString().toLowerCase() : null;

  const currentDeatils = [
    { text: speed + ' m/sec', icon: <Wind /> },
    { text: pressure, icon: <Thermometer /> },
    { text: getWeatherType, icon: weatherIcon(getWeatherType) },
    { text: humidity, icon: <Clock /> }
  ]
  
  return (
    <div>
      <ul className="current-details details">
        {currentDeatils.map((value, key) => {
          return (
            <li key={key}>
              <span className="left">{value.text}</span>
              <span className="right">{value.icon}</span>
            </li>
          )
        })}
      </ul>

      <TwentyFourHourDetails />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentWeatherData: state.currentWeatherData,
  }
}

export default connect(mapStateToProps, null)(CurrentDetails);