// @flow

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import LoginButton from './LoginButton';
import validateAuth from '../../util/Util';

type Props = {
  isAuthenticated: boolean
}

type State = {
  isAuthenticated: boolean,
  username: string,

}

export default class NavBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      username: ''
    };
  }

  componentDidMount() {
    validateAuth().then((result) => this.setState(result));
  }

  render() {
    return (
      <>
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
      </>
    );
  }
}
