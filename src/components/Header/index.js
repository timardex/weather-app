import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import{getCityWeatherData} from '../../store/actions';

import {Search} from '../../assets/svg/Search';
import {Details} from '../../assets/svg/Details';
import {Refresh} from '../../assets/svg/Refresh';

import './style.scss';

const Header = (props) => {
  const {getCityWeatherData, currentCity, temperature, weatherIcon, getWeatherType, getCityName, refreshWeatherData, moreDetails, getMoreDetails} = props;
  const [city, findCity] = useState();
  const [toggleTempUnit, setTempUnit] = useState(true);
  
  useEffect(() => {
    findCity(currentCity)
  }, [currentCity])

  const handleCityWeatherData = () => {
    getCityName(city)
    getCityWeatherData(city)
  }

  const getTemperatureUnit = () => {
    const celsiusToFahrenheit = parseInt((temperature * 1.8) + 32);
    const converted = toggleTempUnit ? parseInt(temperature) : celsiusToFahrenheit;
    return converted.toString();
  }
   
  return(
    <header className={moreDetails ? 'more-details-shown' : ''}>
      <div className="refresh" title="Check my weather data" onClick={() => {refreshWeatherData()}}>
        <Refresh />
      </div>
      <div className="unit-change" onClick={() => setTempUnit(!toggleTempUnit)}>
        Change to {toggleTempUnit ? 'Fahrenheit' : 'Celsius'}
      </div>
      <div className="city-name">
        <input type="text" id="search" value={city || ''}
          onChange={e => findCity(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
          onKeyDown={e => e.keyCode === 13 ? handleCityWeatherData() : null}/>
        <div className="search" onClick={() => handleCityWeatherData()}>
          <Search />
        </div>
      </div>
      <div className="weather-info">
        <div className="temperature">{getTemperatureUnit()}</div>
        <div className="units">
          {toggleTempUnit ? 'C' : 'F'}
          {!moreDetails && weatherIcon}
        </div>
      </div>
      <div className="weather-type">{getWeatherType}</div>

      <p className="more-details" onClick={() => getMoreDetails(!moreDetails)}>More details <Details /></p>
    </header>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCityWeatherData: (city, tempUnit) => {
      dispatch(getCityWeatherData(city, tempUnit))
    }
  }
}

export default connect(null, mapDispatchToProps)(Header);