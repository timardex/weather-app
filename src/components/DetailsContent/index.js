import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getForecast} from '../../store/actions';

import {Details} from '../../assets/svg/Details';
import CurrentDetails from './CurrentDetails';
import ForecastDetails from './ForecastDetails';

import './style.scss';

const DetailsContent = (props) => {
  const {getForecast, forecastWeatherData, currentWeatherData, cityName, moreDetails} = props;
  const {list} = forecastWeatherData ? forecastWeatherData : [];
  const oneDayForecast = list ? list.slice(0, 9) : [];
  const fourDayForecast = list ? list.slice(8) : [];

  const getForecastForNoon = () => {
    const forecast = fourDayForecast.filter(value => (
      value.dt_txt.includes('12:00') ? value : null
    ))
    return forecast;
  }

  const tabmenu = [
    {
      title: 'Details',
      component: <CurrentDetails forecast={oneDayForecast} currentWeather={currentWeatherData}/>},
    {
      title: 'Next days',
      component: <ForecastDetails forecast={getForecastForNoon()} showWind={false} showTime={false} description={''}/>},
  ]
  const [page, setPage] = useState(0);

  useEffect(() => {
    if(cityName !== undefined) {
      getForecast(cityName)
    }
  }, [getForecast, cityName]);

  return (
    <div className={`details-content animated from-left ${moreDetails ? 'active' : ''}`}>
      {tabmenu.map((value, key) => (
        <div className={`tab ${key === page ? 'active' : ''}`} key={key} >
          <div className="btn" onClick={() => setPage(key)}>{value.title} <Details /></div>
          <div className={`animated from-bottom ${key === page ? 'active' : ''}`}>{value.component}</div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    forecastWeatherData: state.forecastWeatherData,
    currentWeatherData: state.currentWeatherData,
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContent);