import React from 'react';
import {Header} from 'semantic-ui-react';

const style = {
  h1: {
    margin: '1em 0em'
  }
}

const NavBar = (props) => {

  return (
    <div>
      <Header
       as='h1'
       style={style.h1}
       content='Roster Bots'
       subheader='Choose your team'
       textAlign='center'
      />
    </div>
  )
}

export default NavBar;
