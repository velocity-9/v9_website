import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import LoginButton from './LoginButton';
import validateAuth from '../../util/Util';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      username: ''
    };
  }

  componentDidMount() {
    validateAuth().then(result => this.setState(result));
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
