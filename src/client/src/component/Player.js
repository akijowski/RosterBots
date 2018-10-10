import React from 'react';

const Player = (props) => {
  let {player} = props;

  return (
    <ul>
      <li>Speed: {player.speed}</li>
      <li>Strength: {player.strength}</li>
      <li>Agility: {player.agility}</li>
    </ul>
  )
}

export default Player;
