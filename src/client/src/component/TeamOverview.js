import React from 'react';
import {Item, Button} from 'semantic-ui-react';
import Team from './Team';

const TeamOverview = (props) => {

  let {team, handleDeleteClick} = props;
  let {starters, substitutes} = team.team;
  return (
      <Item>
        <Item.Content>
          <Item.Header>
            {team.teamName}
            {'  '}
            <Button
              size='mini'
              content='Delete'
              icon='trash alternate outline'
              labelPosition='left'
              data-team={team.teamName}
              onClick={handleDeleteClick}/>
          </Item.Header>
          <Item.Meta>{'Total Attribute Score: ' + team.teamAttributeScore}</Item.Meta>
          <Item.Description>
            <Team starters={starters} substitutes={substitutes} />
          </Item.Description>
        </Item.Content>
      </Item>
  )
}

export default TeamOverview;
