import React from 'react';
import style from './sideNav.css';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';
import { firebase } from '../../../firebase';

const SideNavItems = (props) => {
  console.log(props);
  const items = [
    {
      type: style.option,
      icon: 'home',
      text: 'Home',
      link: '/',
      login: '',
    },
    {
      type: style.option,
      icon: 'file-text-o',
      text: 'News',
      link: '/news',
      login: '',
    },
    {
      type: style.option,
      icon: 'play',
      text: 'Videos',
      link: '/videos',
      login: '',
    },

    // Show if Logged-In
    {
      type: style.option,
      icon: 'sign-in',
      text: 'Dashboard',
      link: '/dashboard',
      login: false,
    },
    // Show if Logged-Out

    {
      type: style.option,
      icon: 'sign-in',
      text: 'Sign-in',
      link: '/sign-in',
      login: true,
    },

    // Show if Logged-In

    {
      type: style.option,
      icon: 'sign-out',
      text: 'Sign-out',
      link: '/sign-out',
      login: false,
    },
  ];

  const element = (item, index) => (
    <div key={index} className={item.type}>
      <Link to={item.link}>
        <FontAwesome name={item.icon} />
        {item.text}
      </Link>
    </div>
  );

  const restricted = (item, index) => {
    let template = null;

    // Show if Logged-Out
    if (props.user === null && item.login) {
      template = element(item, index);
    }

    // Show if Logged-In
    if (props.user !== null && !item.login) {
      if (item.link === '/sign-out') {
        template = (
          <div
            key={index}
            className={item.type}
            onClick={(e) => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  props.history.push('/');
                });
            }}
          >
            <FontAwesome name={item.icon} />
            {item.text}
          </div>
        );
      } else {
        template = element(item, index);
      }
    }

    return template;
  };

  const showItems = () => {
    return items.map((item, index) => {
      return item.login !== '' ? restricted(item, index) : element(item, index);
    });
  };

  return <div>{showItems()}</div>;
};

export default withRouter(SideNavItems);
