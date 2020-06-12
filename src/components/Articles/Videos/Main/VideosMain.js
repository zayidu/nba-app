import React from 'react';
import VideosList from '../../../Widgets/VideosList/VideosList';

const VideosMain = () => {
  return (
    <div>
      <VideosList
        type="card"
        title={false}
        loadMore={true}
        start={0}
        end={10}
      />
    </div>
  );
};

export default VideosMain;
