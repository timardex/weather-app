import React from 'react';
import Header from '../Header';

import {Clouds} from '../../assets/svg/Clouds';
import {Sun} from '../../assets/svg/Sun';
import {Rain} from '../../assets/svg/Rain';

import {CloudsBig} from '../../assets/svg/CloudsBig';
import {SunBig} from '../../assets/svg/SunBig';
import {RainBig} from '../../assets/svg/RainBig';

import {Details} from '../../assets/svg/Details';

import './style.scss';

const Main = (props) => {
  const {weatherData, setTempUnit, tempUnit} = props;
  const {weather, main, name/* , sys, clouds, wind */} = weatherData ? weatherData : '';
  const {temp/* , feels_like, temp_min, temp_max, pressure, humidity */} = main ? main : '';

  const getWeatherType = weather ? weather.map(value => value.main).toString().toLowerCase() : null;
  const weatherIcon = () => {
    switch(getWeatherType) {
      case 'clouds':
        return <Clouds />
      case 'rain':
        return <Rain />
      case 'clear':
          return <Sun />
      default:
        return null
    }
  }

  const weatherBackground = () => {
    switch(getWeatherType) {
      case 'clouds':
        return <CloudsBig />
      case 'rain':
        return <RainBig />
      case 'clear':
          return <SunBig />
      default:
        return null
    }
  }

  return (
    <main className={getWeatherType}>
      <div className="unit-change" onClick={() => setTempUnit()}>
        Change to {tempUnit ? 'Celsius' : 'Fahrenheit'}
      </div>
      <div className="container">
        <Header currentCity={name} temperature={temp} weatherIcon={weatherIcon} getWeatherType={getWeatherType} tempUnit={tempUnit}/>
        <p className="more-details">More details <Details /></p>
      </div>

      <div className="weather-bg">
        {weatherBackground()}
      </div>
    </main>
  )
}

export default Main;