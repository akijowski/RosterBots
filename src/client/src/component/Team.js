import React from 'react';
import {Accordion} from 'semantic-ui-react';
import Roster from './Roster.js';


const Team = (props) => {
  let {starters, substitutes} = props;
  const panels = [
    {
      key: 'starter-0',
      title: 'Starters',
      content: {
        content: <Roster roster={starters} />
      }
    },
    {
      key: 'substitute-0',
      title: 'Substitutes',
      content: {
        content: <Roster roster={substitutes} />
      }
    }
  ]

  return (
      <Accordion panels={panels} styled fluid/>
  )
}

export default Team;
