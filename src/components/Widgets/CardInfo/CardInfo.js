import React from 'react';
import FontAwesome from 'react-fontawesome';
import styles from './cardinfo.css';

const CardInfo = (props) => {
  // console.log(props.teams, props.team, props.date, props.currentTeam);
  const teamName = (teams, teamId) => {
    let data = teams.find((item) => item.id === teamId);
    return data && data.name;
  };

  let {
    // currentTeam: { name, date: currDate },
    teams,
    teamId,
    date,
  } = props;
  return (
    <div className={styles.cardNfo}>
      <span className={styles.teamName}>{teamName(teams, teamId)}</span>
      <span className={styles.date}>
        <FontAwesome name="clock-o" />
        {date}
      </span>
    </div>
  );
};

export default CardInfo;
