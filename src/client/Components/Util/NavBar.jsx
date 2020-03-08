// @flow

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import LoginButton from './LoginButton';

import AccountButtonGroup from 'client/Components/Util/AccountButtonGroup';
import logo from 'client/res/v9_logo.png';

type NavBarProps = {
  username: ?string
};

export default function (props: NavBarProps) {
  return (
    <Grid container item xs={12} spacing={3} justify="space-between">
      <Grid container item xs={6} justify="flex-start">
        <Grid item xs={1}>
          <img src={logo} width="90%" alt="V9 Logo" />
        </Grid>
        <Grid item xs={3} justify="flex-start">
          <ButtonGroup size="large" color="primary">
            <Button>Learn</Button>
            <Button>About</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid container item xs={6} justify="flex-end">
        <Grid item xs={3} justify="flex-end">
          {props.username !== null && props.username !== undefined ? (
            <AccountButtonGroup username={props.username} />
          ) : (
            <LoginButton />
          )}
        </Grid>

      </Grid>
    </Grid>
  );
}
