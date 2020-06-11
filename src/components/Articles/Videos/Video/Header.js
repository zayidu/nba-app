import React from 'react';
import TeamInfo from '../../Elements/TeamInfo';

import styles from '../../articles.css';

const Header = ({ teamData }) => {
  return teamData ? (
    <div>
      <TeamInfo team={teamData} />
    </div>
  ) : null;
};

export default Header;
