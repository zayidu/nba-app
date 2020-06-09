import React from 'react';
import styles from '../articles.css';

const PostData = ({ data: { date, author } }) => {
  return (
    <div className={styles.articlePostData}>
      <div>
        Date:
        <span>{date}</span>
      </div>
      <div>
        Auhor:
        <span>{author}</span>
      </div>
    </div>
  );
};

export default PostData;
