import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

import Header from '../Header';

import {weatherIcon, weatherBackground} from '../../helpers/'
import {getCityName} from '../../store/actions';

import './style.scss';

const Main = (props) => {
  const {weatherDataNotFound, weatherData, setTempUnit, tempUnit, refreshWeatherData, getCityName} = props;
  const {weather, main, name/* clouds , sys, clouds, wind */} = weatherData ? weatherData : '';
  const {temp/* , feels_like, temp_min, temp_max, pressure, humidity */} = main ? main : '';

  const getWeatherType = weather ? weather.map(value => value.main).toString().toLowerCase() : null;

  const [toggleError, setToggleError] = useState(false);
  const [moreDetails, getMoreDetails] = useState(false);

  useEffect(() => {
    setToggleError(weatherDataNotFound !== undefined);
  }, [setToggleError, weatherDataNotFound])

  useEffect(() => {
    getCityName(name)
  }, [getCityName, name])
  
  return (
    <main className={getWeatherType}>
      <div className="container">
        <Header
          currentCity={name}
          refreshWeatherData={refreshWeatherData}
          temperature={temp}
          weatherIcon={weatherIcon(getWeatherType)}
          getWeatherType={getWeatherType}
          getCityName={getCityName}
          setTempUnit={setTempUnit}
          tempUnit={tempUnit}
          moreDetails={moreDetails}
          getMoreDetails={getMoreDetails}/>
      </div>

      {!moreDetails && <div className="weather-bg">
        {weatherBackground(getWeatherType)}
      </div>}

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

const mapDispatchToProps = (dispatch) => {
  return {
    getCityName: (city) => {
      dispatch(getCityName(city))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);