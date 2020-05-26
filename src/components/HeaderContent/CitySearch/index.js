import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getCityName, getCityCurrentWeatherData} from '../../../store/actions';
import {Search} from '../../../assets/svg/Search';

import './style.scss';

const CitySearch = (props) => {
  const {getCityName, getCityCurrentWeatherData, currentWeatherData, setLoaded} = props;
  const {name} = currentWeatherData ? currentWeatherData : '';
  
  const [city, findCity] = useState();

  useEffect(() => {
    findCity(name);
    getCityName(name)
  }, [name, getCityName])

  const handleCitycurrentWeatherData = () => {
    setLoaded(false);
    setTimeout(() => {
      getCityName(city);
      getCityCurrentWeatherData(city);
      setLoaded(true)
    }, 1000)
  }  

  return (
    <div className="city-search">
      <input type="text" id="search" value={city || 'London'}
        onChange={e => findCity(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
        onKeyDown={e => e.keyCode === 13 ? handleCitycurrentWeatherData() : null}/>
      <div className="search" onClick={() => handleCitycurrentWeatherData()}>
        <Search />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentWeatherData: state.currentWeatherData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCityName: (city) => {
      dispatch(getCityName(city))
    },
    getCityCurrentWeatherData: (city) => {
      dispatch(getCityCurrentWeatherData(city))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitySearch);