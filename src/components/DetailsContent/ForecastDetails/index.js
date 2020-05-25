import React from 'react';

import './style.scss';

const ForecastDetails = (props) => {
  const {forecast, weatherIcon, showWind, showTime, description} = props;

  // count difference between temparetures
  const tempGraph = () => {
    const temp = forecast.map(value => parseInt(value.main.temp));
    return temp.slice(1).map((n, i) => {
      const number = n - temp[i];
      return number / -1
    })
  }

  return (
    <div className="forecast">
      {description && <p>{description}</p>}
      <ul className="graph">
        {forecast.map((parentValue, parentKey) => (
          <li key={parentKey} style={{top: -parseInt(parentValue.main.temp) + 'px'}}>
            {parseInt(parentValue.main.temp)}
            {tempGraph().map((value, key) => (
              parentKey === key && <span className="line" key={key} style={{transform: `rotate(${value}deg)`}}></span>
            ))}
          </li>
        ))}
      </ul>
      <ul className="weather-type">
        {forecast.map((parentValue, parentKey) => (
          <li key={parentKey}>
            {parentValue.weather.map((value, key) => (
              <span key={key}>{weatherIcon(value.main.toLowerCase())}</span>
            ))}
            {showWind && <span className="wind">{parentValue.wind.speed} <small>m/sec</small></span>}
            {showTime && <span className="time">{parentValue.dt_txt.split(' ').pop().slice(0,5)}</span>}
            {!showTime && <span className="date">{parentValue.dt_txt.split(' ').shift().slice(5,10).replace(/-/g, '/')}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ForecastDetails;