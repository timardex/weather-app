import React from 'react';

import {Wind} from '../../../assets/svg/Wind';
import {Thermometer} from '../../../assets/svg/Thermometer';
import {Clock} from '../../../assets/svg/Clock';

const CurrentDetails = (props) => {
  const {wind, pressure, humidity, getWeatherType, weatherIcon} = props;
  const {speed} = wind ? wind : ''

  const currentDeatils = [
    { text: speed + ' km/h', icon: <Wind /> },
    { text: pressure, icon: <Thermometer /> },
    { text: getWeatherType, icon: weatherIcon },
    { text: humidity, icon: <Clock /> }
  ]
  return (
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
  )
}

export default CurrentDetails;