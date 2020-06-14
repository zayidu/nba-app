import React from 'react';
import styles from './announcement.css';

const Announcement = (props) => {
  return (
    <div className={styles.announcement}>
      <p>
        <span aria-label="announce" role="img">
          📣
        </span>{' '}
        "I can't breathe" - George Floyd - #BLACK LIVES MATTER{' '}
        <span role="img" aria-label="announce">
          📣
        </span>{' '}
      </p>
    </div>
  );
};

export default Announcement;
