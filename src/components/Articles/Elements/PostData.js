import React from 'react';
import styles from '../articles.css';
import Moment from 'moment';

const PostData = ({ data: { date, author } }) => {
  return (
    <div className={styles.articlePostData}>
      <div>
        Date:
        <span>{Moment(date).format('MM-DD-YYYY')}</span>
      </div>
      <div>
        Auhor:
        <span>{author}</span>
      </div>
    </div>
  );
};

export default PostData;
