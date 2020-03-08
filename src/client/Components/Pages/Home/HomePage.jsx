// @flow

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import 'typeface-roboto';

import NavBar from 'client/Components/Util/NavBar';

export default function HomePage(props: PageProps) {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3} justify="space-between">
          <NavBar username={props.username} />
        </Grid>
        <Grid container item xs={12} spacing={3} justify="center">
          <Typography variant="h1" color="textPrimary">Welcome to Velocity 9!</Typography>
        </Grid>
        <Grid container item xs={12} spacing={6} justify="center">
          <Grid item xs={8} justify="center">
            <Typography variant="h5" align="center">
              Ready to get started? Check out our
              <a href="https://github.com/apps/velocity-9">Github app</a>
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={6} justify="center">
          <Grid item xs={8} justify="center">
            <Typography variant="h6" align="center">
              Take a look at our
              <a href="https://github.com/velocity-9/v9_test_app" target="_window"> template code!</a>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
