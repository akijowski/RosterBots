import React, { Component } from 'react';
import axios from 'axios';
import {Container, Segment, Loader} from 'semantic-ui-react';

import NavBar from './NavBar';
import CurrentTeams from './CurrentTeams';
import NewTeam from './NewTeam';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      loading: true,
      newTeamInput: '',
      inputErrors: {
        hasError: false,
        reason: ''
      },
      inputLoading: false
    };
    this.getAllTeams = this.getAllTeams.bind(this);
    this.postNewTeam = this.postNewTeam.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.handleNewTeamButtonClick = this.handleNewTeamButtonClick.bind(this);
    this.handleNewTeamTextChange = this.handleNewTeamTextChange.bind(this);
    this.handleDeleteTeamButtonClick = this.handleDeleteTeamButtonClick.bind(this);
  }

  componentDidMount() {
    this.getAllTeams();
  }

  getAllTeams() {
    axios.get('/api/teams')
      .then(response => {
        console.log(response);
        this.setState({
          teams: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          loading: false
        });
      });
  }

  postNewTeam(teamName) {
    axios.post('/api/generate', {
      name: teamName
    })
      .then(response => {
        console.log(response);
        this.setState({
          inputLoading: false,
          newTeamInput: ''
        });
        this.getAllTeams();
      })
      .catch(error => {
        console.error(error.response);
        this.setState({
          inputLoading: false,
          inputErrors: {
            hasError: true,
            reason: error.response.data.message
          }
        });
      });
  }

  deleteTeam(teamName) {
    axios.delete(`/api/teams/${teamName}`)
      .then(response => {
        this.setState({
          loading: true
        });
        this.getAllTeams();
      })
      .catch(error => {
        console.error(error.response);
      });
  }

  handleNewTeamButtonClick(event) {
    let {newTeamInput} = this.state;
    if (!newTeamInput.length) {
      this.setState({
        inputErrors: {
          hasError: true,
          reason: 'Please enter a name!'
        }
      });
      return;
    }
    console.log(newTeamInput);
    this.postNewTeam(newTeamInput);
  }

  handleNewTeamTextChange(event) {
    this.setState({
      newTeamInput: event.target.value,
      inputErrors: {
        hasError: false,
        reason: ''
      },
      inputLoading: false
    });
  }

  handleDeleteTeamButtonClick(event) {
    let {team} = event.target.dataset;
    console.log(team);
    this.deleteTeam(team);
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <Segment.Group>
            <Segment>
              {
                this.state.loading
                ? <Loader active content='Loading...' />
                : <CurrentTeams teams={this.state.teams} handleDeleteClick={this.handleDeleteTeamButtonClick} />
              }
            </Segment>
            <Segment>
              <NewTeam
               inputErrors={this.state.inputErrors}
               inputLoading={this.state.inputLoading}
               handleTextChange={this.handleNewTeamTextChange}
               handleButtonClick={this.handleNewTeamButtonClick}
              />
            </Segment>
          </Segment.Group>
        </Container>
        <div></div>
      </React.Fragment>
    );
  }
}

export default App;
