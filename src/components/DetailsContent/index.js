import React, {useState} from 'react';
import {Details} from '../../assets/svg/Details';

import CurrentDetails from './CurrentDetails';
/* import NextDaysDetails from './NextDaysDetails'; */

import './style.scss';

const DetailsContent = () => {
  const tabmenu = [
    {title: 'Details', component: <CurrentDetails />},
    /* {title: 'Next days', component: <NextDaysDetails />}, */
  ]

  const [page, setPage] = useState(0);

  return (
    <div className="details-content">
      {tabmenu.map((value, key) => (
        <div className={`tab ${key === page ? 'active' : ''}`} key={key} >
          <div className="btn" onClick={() => setPage(key)}>{value.title} <Details /></div>
          {key === page && <div className="content">{value.component}</div>}
        </div>
      ))}
    </div>
  )
}

export default DetailsContent