import React from 'react';

const Header = (props) => {
  const {clouds, main, name, sys, weather, wind} = props;
  console.log(props)
  return(
    <header>
      <div className="city-name">
        {name}
      </div>
    </header>
  )
}

export default Header;