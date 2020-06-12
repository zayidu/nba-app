import React from 'react';
import NewsSlider from '../../../Widgets/NewsSlider/NewsSlider';
import NewsList from '../../../Widgets/NewsList/NewsList';

const NewsMain = () => {
  return (
    <div>
      <NewsSlider
        type="featured"
        start={0}
        end={3}
        settings={{
          dots: false,
        }}
      />

      <NewsList type="cardMain" loadMore={true} start={3} end={10} />
    </div>
  );
};

export default NewsMain;
