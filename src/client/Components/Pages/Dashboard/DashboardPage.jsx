// @flow

import React from 'react';
import Grid from '@material-ui/core/Grid';

import NavBar from 'client/Components/Util/NavBar';
import ComponentTable from 'client/Components/Pages/Dashboard/ComponentTable';

export default function (props: PageProps) {
  return (
    <div>
      <Grid container spacing={3}>
        <NavBar isAuthenticated={props.isAuthenticated} username={props.username} />
        <Grid container item xs={12} spacing={1} justify="center">
          <h1>Component Dashboard</h1>
        </Grid>
        <Grid container item xs={12} spacing={1} justify="center">
          <ComponentTable />
        </Grid>
      </Grid>
    </div>
  );
}
