import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

import HeaderContent from '../HeaderContent';
import DetailsContent from '../DetailsContent';

import {Loading} from '../../assets/svg/Loading';
import {weatherBackground, weatherType} from '../../helpers/'

import './style.scss';

const Main = (props) => {
  const {currentWeatherData, dataNotFound} = props;
  const {weather} = currentWeatherData ? currentWeatherData : '';
  const getWeatherType = weatherType(weather);

  const [moreDetails, getMoreDetails] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(currentWeatherData !== undefined)
  }, [currentWeatherData])
  
  return (
    <main className={!moreDetails ? getWeatherType : 'details-info'}>
      {!loaded && <div className="loading">
        <Loading />
      </div>}

      {loaded && <div>
        <HeaderContent
          moreDetails={moreDetails}
          getMoreDetails={getMoreDetails}/>

        <div className="container">
          <DetailsContent moreDetails={moreDetails}/>
        </div>

        {dataNotFound && <div className="weather-data-error">
          {dataNotFound}
        </div>}

        <div className={`weather-bg animated from-left ${!moreDetails ? 'active' : ''}`}>{weatherBackground(getWeatherType)}</div>
      </div>}
    </main>
  )
}

const mapStateToProps = (state) => {
  return {
    currentWeatherData: state.currentWeatherData,
    dataNotFound: state.dataNotFound,
  }
}

export default connect(mapStateToProps, null)(Main);