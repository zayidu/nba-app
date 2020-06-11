import React from 'react';
import VideoListTemplate from '../VideosListTemplate';
import styles from '../videosList.css';

const VideosRelated = ({ data, teams }) => {
  return (
    <div className={styles.relatedWrapper}>
      <VideoListTemplate data={data} teams={teams} />
    </div>
  );
};

export default VideosRelated;
