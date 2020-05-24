import React, { useState } from 'react';
import {connect} from 'react-redux';

import HeaderContent from '../HeaderContent';
import DetailsContent from '../DetailsContent';

import {weatherBackground} from '../../helpers/'

import './style.scss';

import {Animated} from "react-animated-css";

const Main = (props) => {
  const {currentWeatherData, dataNotFound} = props;
  const {weather} = currentWeatherData ? currentWeatherData : '';
  const getWeatherType = weather ? weather.map(value => value.main).toString().toLowerCase() : null;

  const [moreDetails, getMoreDetails] = useState(true);
  
  return (
    <main className={!moreDetails ? getWeatherType : 'details-info'}>
      <div className="container">
        <HeaderContent
          moreDetails={moreDetails}
          getMoreDetails={getMoreDetails}/>

        <Animated animationIn="fadeInDown" animationOut="fadeOutUp" isVisible={moreDetails}>
          <DetailsContent />
        </Animated>
      </div>

      {dataNotFound && <div className="weather-data-error">
        {dataNotFound}
      </div>}

      <Animated className="weather-bg" animationIn="fadeInDown" animationOut="fadeOutUp" isVisible={!moreDetails}>
        {weatherBackground(getWeatherType)}
      </Animated>
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