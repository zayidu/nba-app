import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItems from './SideNavItems';

export const SideNavigation = (props) => {
  return (
    <div>
      <SideNav
        showNav={props.showNav}
        onHideNav={props.onClickNav}
        navStyle={{
          background: '#242424',
          maxWidth: '220px',
        }}
      >
        <SideNavItems {...props} />
      </SideNav>{' '}
      .
    </div>
  );
};

export default SideNavigation;
