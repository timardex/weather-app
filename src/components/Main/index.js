import React, { useState } from 'react';
import {connect} from 'react-redux';

import HeaderContent from '../HeaderContent';
import DetailsContent from '../DetailsContent';

import {weatherBackground, weatherType} from '../../helpers/'

import './style.scss';

const Main = (props) => {
  const {currentWeatherData, dataNotFound} = props;
  const {weather} = currentWeatherData ? currentWeatherData : '';
  const getWeatherType = weatherType(weather);

  const [moreDetails, getMoreDetails] = useState(false);
  
  return (
    <main className={!moreDetails ? getWeatherType : 'details-info'}>
      <div className="container">
        <HeaderContent
          moreDetails={moreDetails}
          getMoreDetails={getMoreDetails}/>

        <DetailsContent moreDetails={moreDetails}/>
      </div>

      {dataNotFound && <div className="weather-data-error">
        {dataNotFound}
      </div>}

      <div className={`weather-bg animated from-left ${!moreDetails ? 'active' : ''}`}>{weatherBackground(getWeatherType)}</div>
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