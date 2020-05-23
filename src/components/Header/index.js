import React, { useState, useEffect } from 'react';

import {Search} from '../../assets/svg/Search';
import {Details} from '../../assets/svg/Details';
import {Refresh} from '../../assets/svg/Refresh';

import './style.scss';

const Header = (props) => {
  const {currentCity, temperature, weatherIcon, getWeatherType, tempUnit, setTempUnit, getCityName, refreshWeatherData, moreDetails, getMoreDetails} = props;
  const [city, findCity] = useState();
  

  useEffect(() => {
    findCity(currentCity)
  }, [currentCity])
  
  return(
    <header className={moreDetails ? 'more-details-shown' : ''}>
      <div className="refresh" title="Check my weather data" onClick={() => {refreshWeatherData()}}>
        <Refresh />
      </div>
      <div className="unit-change" onClick={e => setTempUnit()}>
        Change to {tempUnit ? 'Celsius' : 'Fahrenheit'}
      </div>
      <div className="city-name">
        <input type="text" id="search" value={city || ''}
          onChange={e => findCity(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
          onKeyDown={e => e.keyCode === 13 ? getCityName(city) : null}/>
        <div className="search" onClick={() => getCityName(city)}>
          <Search />
        </div>
      </div>
      <div className="weather-info">
        <div className="temperature">{parseInt(temperature).toString()}</div>
        <div className="units">
          {tempUnit ? 'F' : 'C'}
          {!moreDetails && weatherIcon}
        </div>
      </div>
      <div className="weather-type">{getWeatherType}</div>

      <p className="more-details" onClick={() => getMoreDetails(!moreDetails)}>More details <Details /></p>
    </header>
  )
}

export default Header;