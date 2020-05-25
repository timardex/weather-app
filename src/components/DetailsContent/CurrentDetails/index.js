import React from 'react';

import {Wind} from '../../../assets/svg/Wind';
import {Thermometer} from '../../../assets/svg/Thermometer';
import {Clock} from '../../../assets/svg/Clock';
import {weatherType} from '../../../helpers/'
import ForecastDetails from '../ForecastDetails';

const CurrentDetails = (props) => {
  const {currentWeather, forecast, weatherIcon} = props;
  const {weather, main, wind} = currentWeather ? currentWeather : '';
  const {speed} = wind ? wind : '';
  const {pressure, humidity} = main ? main : '';
  const getWeatherType = weatherType(weather);

  const currentDeatils = [
    { text: speed + ' m/sec', icon: <Wind /> },
    { text: pressure, icon: <Thermometer /> },
    { text: getWeatherType, icon: weatherIcon(getWeatherType) },
    { text: humidity, icon: <Clock /> }
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

      <ForecastDetails forecast={forecast} weatherIcon={weatherIcon} showWind={true} showTime={true} description={'24 - hours forecast'}/>
    </div>
  )
}

export default CurrentDetails;