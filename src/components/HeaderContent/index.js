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
        <CitySearch />
        <Options toggleTempUnit={toggleTempUnit} setTempUnit={setTempUnit}/>
        <WeatherInfo toggleTempUnit={toggleTempUnit} moreDetails={moreDetails}/>
        
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