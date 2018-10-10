import React from 'react';
import {Accordion} from 'semantic-ui-react';
import Player from './Player';

let rosterPanels = (roster) => {
  return roster.map((bot, index) => {
    return {
        key: `bot-${index}`,
        title: `${bot.name} | Score: ${bot.totalAttributeScore}`,
        content: {
          content: <Player player={bot} />
        }
    }
  });
}

const Roster = (props) => {
  let {roster} = props;
  let panels = rosterPanels(roster);
  return (
      <Accordion.Accordion panels={panels} />
  )
}

export default Roster;
