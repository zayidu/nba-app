import React from 'react';
import NewsSlider from '../Widgets/NewsSlider/NewsSlider';

const Home = (props) => {
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
    </div>
  );
};

export default Home;
