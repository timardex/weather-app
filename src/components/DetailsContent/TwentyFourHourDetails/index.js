import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getForecast} from '../../../store/actions';
import {weatherIcon} from '../../../helpers';

import './style.scss';

const TwentyFourHourDetails = (props) => {
  const {getForecast, forecastWeatherData, cityName} = props;
  const {list} = forecastWeatherData ? forecastWeatherData : [];
  const oneDayForecast = list ? list.slice(0, 9) : [];

  // count difference between temparetures
  const tempGraph = () => {
    const temp = oneDayForecast.map(value => parseInt(value.main.temp));
    return temp.slice(1).map((n, i) => {
      const number = n - temp[i];
      return number / -1
    })
  }

  useEffect(() => {
    if(cityName !== undefined) {
      getForecast(cityName)
    }
  }, [getForecast, cityName]);

  return (
    <div className="one-day-forecast">
      <p>24 - hours forecast</p>
      <ul className="graph">
        {oneDayForecast.map((parentValue, parentKey) => (
          <li key={parentKey} style={{top: -parseInt(parentValue.main.temp) + 'px'}}>
            {parseInt(parentValue.main.temp)}
            {tempGraph().map((value, key) => (
              parentKey === key && <span className="line" key={key} style={{transform: `rotate(${value}deg)`}}></span>
            ))}
          </li>
        ))}
      </ul>
      <ul className="weather-type">
        {oneDayForecast.map((parentValue, parentKey) => (
          <li key={parentKey}>
            {parentValue.weather.map((value, key) => (
              <span key={key}>{weatherIcon(value.main.toLowerCase())}</span>
            ))}
            <span className="wind">{parentValue.wind.speed} <small>m/sec</small></span>
            <span className="time">{parentValue.dt_txt.split(' ').pop().slice(0,5)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    forecastWeatherData: state.forecastWeatherData,
    cityName: state.cityName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getForecast: (city) => {
      dispatch(getForecast(city))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TwentyFourHourDetails);