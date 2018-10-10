import React from 'react';
import { Input, Button } from 'semantic-ui-react';

const NewTeam = (props) => {

  let {handleTextChange, handleButtonClick, inputErrors, inputLoading} = props;

  let style = {
    error: {
      color: 'red'
    }
  };

  return (
    <div>
      <h2>New Team</h2>
      <Input error={inputErrors.hasError} loading={inputLoading} placeholder='Team name...' onChange={handleTextChange}/>
      <Button content='Submit' onClick={handleButtonClick} primary />
      <div>
        <span style={style.error}>{inputErrors.hasError ? inputErrors.reason : ''}</span>
      </div>
    </div>
  )
}

export default NewTeam;
