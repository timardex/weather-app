import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Search} from '../../assets/svg/Search';

import {getCityName} from '../../store/actions';

import './style.scss';

const Header = (props) => {
  const {currentCity, temperature, weatherIcon, getWeatherType, tempUnit, getCityName} = props;
  const [city, findCity] = useState();

  useEffect(() => {
    findCity(currentCity)
  }, [currentCity])

  return(
    <header>
      <div className="city-name">
        <input type="text" id="search" defaultValue={currentCity || ''}
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
          {weatherIcon()}
        </div>
      </div>
      <div className="weather-type">{getWeatherType}</div>
    </header>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCityName: (city) => {
      dispatch(getCityName(city))
    }
  }
}

export default connect(null, mapDispatchToProps)(Header);