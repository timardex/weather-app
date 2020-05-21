import React, { useState } from 'react';
import {connect} from 'react-redux';
import {Search} from '../../assets/svg/Search';

import './style.scss';

const Header = (props) => {
  const {currentCity, temperature, weatherIcon, getWeatherType, tempUnit, restCityName} = props;

  const [city, findCity] = useState();

  const getCapital = () => {
    return restCityName ? restCityName.map(value => value.capital.toLowerCase()).filter(value => value.includes(city)) : []
  }

  return(
    <header>
      <div className="city-name">
        <input type="text" id="search" defaultValue={currentCity || ''} onChange={e => findCity(e.target.value.toLowerCase())} /> <Search />
        <ul>
          {getCapital().map((value, key) => {
            return (<li key={key}>{value}</li>)
          })}
        </ul>
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

const mapStateToProps = (state) => {
  return {
    restCityName: state.restCityName
  }
}

export default connect(mapStateToProps)(Header);