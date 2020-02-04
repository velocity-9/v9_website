import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import LoginButton from './LoginButton';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      username: ''
    };
  }

  componentDidMount() {
    this.validateAuth();
  }

  validateAuth() {
    fetch('http://v9_website.ngrok.io/api/auth/validateAuth', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error('Failed to authenticate user');
      })
      .then((responseJson) => {
        console.log('Authenticated!');
        this.setState({
          isAuthenticated: true,
          username: responseJson.user.username
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Grid item xs={1}>
          <Paper>V9 Logo</Paper>
        </Grid>
        {this.state.isAuthenticated ? (
          <Grid item xs={1}>
            <Button variant="contained" component={RouterLink} to="/dashboard">Dashboard</Button>
          </Grid>
        ) : (
          <Grid item xs={1} />
        )}
        <Grid item xs={1}>
          {this.state.isAuthenticated ? (
            <p>
              Hello,
              {this.state.username}
            </p>
          ) : (
            <p />
          )}
          <LoginButton isAuthenticated={this.state.isAuthenticated} />
        </Grid>
      </React.Fragment>
    );
  }
}
