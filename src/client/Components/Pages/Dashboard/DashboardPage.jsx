// @flow

import Grid from '@material-ui/core/Grid';
import React from 'react';

import ComponentTable from 'client/Components/Pages/Dashboard/ComponentTable';
import NavBar from 'client/Components/Util/NavBar';

export default function (props: PageProps) {
  return (
    <div>
      <Grid container spacing={3}>
        <NavBar username={props.username} />
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
