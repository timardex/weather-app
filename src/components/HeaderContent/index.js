import React, { useState } from 'react';
import {Details} from '../../assets/svg/Details';

import Options from './Options';
import CitySearch from './CitySearch';
import WeatherInfo from './WeatherInfo';

import './style.scss';

const HeaderContent = (props) => {
  const {moreDetails, getMoreDetails} = props;
  const [toggleTempUnit, setTempUnit] = useState(true);
  return(
    <header>
      <div className={`header-content ${moreDetails ? 'more-details-shown' : ''}`}>
        <Options toggleTempUnit={toggleTempUnit} setTempUnit={setTempUnit}/>
        <CitySearch />
        <WeatherInfo toggleTempUnit={toggleTempUnit}/>
        
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