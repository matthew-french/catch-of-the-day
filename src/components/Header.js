import React from 'react';

const Header = (props) => {
    return (
      <header className="top">
        <h1>
          Catch
          <span className="ofThe">
            <div className="of">of</div>
            <div className="the">the</div>
          </span>
          Day
        </h1>
        <h3 className="tagline"><span>{props.tagline}</span></h3>
      </header>
    )
}

Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}

export default Header;
