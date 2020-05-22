import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

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
  const {weatherDataNotFound, weatherData, setTempUnit, tempUnit, refreshWeatherData} = props;
  const {weather, main, name/* , sys, clouds, wind */} = weatherData ? weatherData : '';
  const {temp/* , feels_like, temp_min, temp_max, pressure, humidity */} = main ? main : '';

  const getWeatherType = weather ? weather.map(value => value.main).toString().toLowerCase() : null;
  const weatherIcon = () => {
    switch(getWeatherType) {
      case 'clouds':
        return <Clouds />
      case 'rain':
        return <Rain />
      case 'thunderstorm':
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
      case 'thunderstorm':
        return <RainBig />
      case 'clear':
          return <SunBig />
      default:
        return null
    }
  }

  const [toggleError, setToggleError] = useState(false)
  useEffect(() => {
    setToggleError(weatherDataNotFound !== undefined)
  }, [setToggleError, weatherDataNotFound])
  
  return (
    <main className={getWeatherType}>
      <div className="container">
        <Header
          currentCity={name}
          refreshWeatherData={refreshWeatherData}
          temperature={temp}
          weatherIcon={weatherIcon}
          getWeatherType={getWeatherType}
          setTempUnit={setTempUnit}
          tempUnit={tempUnit}/>
        <p className="more-details">More details <Details /></p>
      </div>

      <div className="weather-bg">
        {weatherBackground()}
      </div>

      {toggleError && <div className="weather-data-error" onClick={() => setToggleError(false)}>
        <p>{weatherDataNotFound}</p>
      </div>}
    </main>
  )
}

const mapStateToProps = (state) => {
  return {
    weatherDataNotFound: state.weatherDataNotFound,
  }
}

export default connect(mapStateToProps, null)(Main);