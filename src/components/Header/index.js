import React from 'react';
import {Search} from '../../assets/svg/Search';

import './style.scss';

const Header = (props) => {
  const {cityName, temperature, weatherIcon, getWeatherType, tempUnit} = props;

  return(
    <header>
      <div className="city-name">
        <input type="text" id="search" defaultValue={cityName || ''} /> <Search />
      </div>
      <div className="weather-info">
        <div className="temperature">{parseInt(temperature).toString()}</div>
        <div className="units">
          {tempUnit ? 'F' : 'C'}
          {weatherIcon()}
        </div>
      </div>
      <div className="weather-type">{getWeatherType}</div>
    </header>
  )
}

export default Header;