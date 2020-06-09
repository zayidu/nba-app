import React from 'react';
import { Link } from 'react-router-dom';
import styles from './buttons.css';

const Button = (props) => {
  console.log(props);
  let template = null;
  switch (props.type) {
    case 'loadmore':
      template = (
        <div className={styles.blue_btn} onClick={props.loadmore}>
          {props.cta}
        </div>
      );
      break;

    case 'linkTo':
      template = (
        <Link className={styles.blue_btn} to={props.linkTo}>
          {props.cta}
        </Link>
      );
      break;
    default:
      template = null;
  }
  return template;
};

export default Button;
