import React from 'react';
import {Details} from '../../assets/svg/Details';

import Options from './Options';
import CitySearch from './CitySearch';
import WeatherInfo from './WeatherInfo';

import './style.scss';

const HeaderContent = (props) => {
  const {moreDetails, getMoreDetails, setLoaded} = props;  
  return(
    <header className={moreDetails ? 'more-details-shown' : ''}>
      <div className="header-content">
        <div className="grid-box">
          <div>
            <CitySearch setLoaded={setLoaded}/>
            <WeatherInfo moreDetails={moreDetails}/>
          </div>
          <Options setLoaded={setLoaded}/>
        </div>
        
        <p
          className="more-details"
          onClick={() => getMoreDetails(!moreDetails)}>
            {!moreDetails ? 'More details' : 'Go back'}
            <Details />
        </p>
      </div>
    </header>
  )
}


export default HeaderContent;