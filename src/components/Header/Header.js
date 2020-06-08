import React from 'react';
import { Link } from 'react-router-dom';
import style from './header.css';

import FontAwesome from 'react-fontawesome';
import SideNav from './SideNav/SideNav';

const Header = (props) => {
  const navBars = () => (
    <div className={style.navBar}>
      <FontAwesome
        name="bars"
        onClick={props.onClickNav}
        style={{
          color: '#dfdfdf',
          padding: '10px',
          cursor: 'pointer',
        }}
      />
      {/* <i className="fa fa-bars navBar" aria-hidden="true"></i> */}
    </div>
  );

  const logo = () => (
    <Link to="/" className={style.logo}>
      <img alt="NBA Logo" src="/images/nba_logo.png" />
    </Link>
  );

  return (
    <header className={style.header}>
      <SideNav {...props} />
      <div className={style.headerOpt}>
        {navBars()}
        {logo()}
      </div>
    </header>
  );
};

export default Header;
