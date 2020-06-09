import React from 'react';
import TeamInfo from '../../Elements/TeamInfo';
import PostData from '../../Elements/PostData';

const Header = ({ date, author, team }) => {
  const teamInfo = (team) => {
    return team ? <TeamInfo team={team} /> : null;
  };
  // const postedDetails = (date, author) => {
  //   <PostData data={{ data, author }} />;
  // };

  return (
    <div>
      {teamInfo(team)}
      {/* {postedDetails(date, author)} */}
      <PostData data={{ date, author }} />;
    </div>
  );
};

export default Header;
