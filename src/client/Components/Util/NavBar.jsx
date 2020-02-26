// @flow

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import LoginButton from './LoginButton';

type NavBarProps = {
  username: ?string
};

export default function (props: NavBarProps) {
  return (
    <Grid container item={12} spacing={3} justify="space-between">
      <Grid item xs={1}>
        <Paper>V9 Logo</Paper>
      </Grid>
      {props.username !== null ? (
        <Grid item xs={1}>
          <Button variant="contained" component={RouterLink} to="/dashboard">Dashboard</Button>
        </Grid>
      ) : (
        <Grid item xs={1} />
      )}
      <Grid item xs={1}>
        {props.username !== null ? (
          <p>
            Hello,
            {props.username}
          </p>
        ) : (
          <p />
        )}
        <LoginButton isAuthenticated={props.username !== null} />
      </Grid>
    </Grid>
  );
}
