import React, { Fragment } from 'react';
import styles from './announcement.css';

const Announcement = (props) => {
  return (
    <div className={styles.announcement}>
      <p>
        <span role="img">📣</span> "I can't breathe" - George Floyd - #BLACK
        LIVES MATTER <span role="img">📣</span>{' '}
      </p>
    </div>
  );
};

export default Announcement;
