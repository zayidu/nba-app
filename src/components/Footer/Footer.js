import React from 'react';
import styles from './footer.css';
import { Link } from 'react-router-dom';
import { CURRENT_YEAR } from '../../config';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Link to="/" className={styles.logo}>
        <img alt="NBA Logo" src="/images/nba_logo.png" />
      </Link>
      <div className={styles.right}>
        @NBA {CURRENT_YEAR} All rights reserved.{' '}
      </div>
      <a
        href="https://zayidu.github.io/portfolio/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.right}
      >
        © Developed by Zayidu
      </a>
    </div>
  );
};

export default Footer;
