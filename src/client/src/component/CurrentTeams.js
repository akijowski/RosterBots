import React from 'react';
import {Header, Item} from 'semantic-ui-react';
import TeamOverview from './TeamOverview';

const CurrentTeams = (props) => {

  let {teams, handleDeleteClick} = props;

  return (
    <div>
      <Header as='h2' content='Current Teams' />
      <Item.Group divided>
      {
        teams.map((team, index) => {
          return (
            <TeamOverview key={index} team={team} handleDeleteClick={handleDeleteClick} />
          )
        })
      }
      </Item.Group>
    </div>
  )
};

export default CurrentTeams;
