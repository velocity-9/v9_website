// @flow

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';

import NavBar from 'client/Components/Util/NavBar';

export default function HomePage(props: PageProps) {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3} justify="space-between">
          <NavBar isAuthenticated={props.isAuthenticated} username={props.username} />
        </Grid>
        <Grid container item xs={12} spacing={3} justify="center">
          <Grid item xs={6}>
            <Paper>Engaging blurb about V9!</Paper>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={6} justify="center">
          <Grid item xs={6}>
            <Paper>
              Ready to get started? Check out our
              <a href="https://github.com/apps/velocity-9">Github app</a>
              . Looking for inspiration?
              Check out our
              {' '}
              <a href="https://github.com/velocity-9/v9_test_app" target="_window">
                template code
              </a>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
