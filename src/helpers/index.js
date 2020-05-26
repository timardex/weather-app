import React from 'react';

import {Clouds} from '../assets/svg/Clouds';
import {Sun} from '../assets/svg/Sun';
import {Rain} from '../assets/svg/Rain';
import {CloudsBig} from '../assets/svg/CloudsBig';
import {SunBig} from '../assets/svg/SunBig';
import {RainBig} from '../assets/svg/RainBig';

export const weatherIcon = (getWeatherType) => {
  switch(getWeatherType) {
    case 'clouds':
      return <Clouds />
    case 'mist':
      return <Clouds />
    case 'rain':
      return <Rain />
    case 'thunderstorm':
      return <Rain />
    case 'clear':
        return <Sun />
    default:
      return <Sun />
  }
}

export const weatherBackground = (getWeatherType) => {
  switch(getWeatherType) {
    case 'clouds':
      return <CloudsBig />
    case 'mist':
      return <CloudsBig />
    case 'rain':
      return <RainBig />
    case 'thunderstorm':
      return <RainBig />
    case 'clear':
        return <SunBig />
    default:
      return <SunBig />
  }
}

export const weatherType = (type) => {
  return type ? type.map(value => value.main).toString().toLowerCase().split(',')[0] : null;
}

export const toggleTemperature = (value, toggle) => {
  const celsiusToFahrenheit = parseInt((value * 1.8) + 32);
  const converted = toggle ? celsiusToFahrenheit : parseInt(value);
  return value !== undefined ? converted.toString() : '22';
}

export const toggleSpeed = (value, toggle) => {
  const kmToMiles = parseInt(value * 1.6093);
  const converted = toggle ? kmToMiles : parseInt(value);
  return value !== undefined ? converted.toString() : '';
}