import React from 'react';
import {Search} from '../../assets/svg/Search';

import './style.scss';

const Header = (props) => {
  const {setTempUnit, tempUnit} = props;
  const {/* clouds, */ main, name /* sys, weather, wind */} = props;
  console.log(props)
  const {temp /* feels_like, temp_min, temp_max, pressure, humidity */} = main ? main : '';
  return(
    <header>
      <div className="city-name">
        {name} <Search />
      </div>
      <div className="temperature" onClick={() => setTempUnit()}>
        {parseInt(temp)} <span className="units">{tempUnit ? 'F' : 'C'}</span>
      </div>
    </header>
  )
}

export default Header;