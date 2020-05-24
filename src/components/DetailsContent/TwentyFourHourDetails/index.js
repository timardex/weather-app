import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getForecast} from '../../../store/actions';

const TwentyFourHourDetails = (props) => {
  const {getForecast, forecastWeatherData, cityName} = props;
  const {list} = forecastWeatherData ? forecastWeatherData : [];
  const oneDayForecast = list ? list.slice(0, 9) : [];

  console.log(oneDayForecast)

  useEffect(() => {
    getForecast(cityName)
  }, [getForecast, cityName]);

  return (
    <div>
      24 - hours forecast
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