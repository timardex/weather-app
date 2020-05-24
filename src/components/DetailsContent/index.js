import React, {useState} from 'react';
import {Details} from '../../assets/svg/Details';

import CurrentDetails from './Details/CurrentDeatils';
import TwentyFourHourDetails from './Details/TwentyFourHourDetails';
import NextDaysDetails from './Details/NextDaysDetails';

import './style.scss';

const DetailsContent = (props) => {
  const tabmenu = [
    {title: 'Details', component: <CurrentDetails />},
    {title: '24 - hours forecast', component: <TwentyFourHourDetails />},
    {title: 'Next days', component: <NextDaysDetails />},
  ]

  const [page, setPage] = useState(0);

  return (
    <div className="details-content">
      {tabmenu.map((value, key) => (
        <div className={`tab ${key === page ? 'active' : ''}`} key={key} onClick={() => setPage(key)}>
          {value.title} <Details />
          <div className="content">{value.component}</div>
        </div>
      ))}
    </div>
  )
}

export default DetailsContent