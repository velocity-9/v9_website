// @flow

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import type { Match } from 'react-router-dom';

import TabBar from 'client/Components/Pages/ComponentStatusPage/TabBar';
import NavBar from 'client/Components/Util/NavBar';

type ComponentStatusPageProps = PageProps & {
  match: Match
};

export default function ComponentStatusPage(props: ComponentStatusPageProps) {
  const githubRepo = props.match.params.component;
  if (githubRepo == null) {
    throw new Error('Passed in user component name is null!');
  }

  return (
    <div>
      <Grid container spacing={3}>
        <NavBar username={props.username} />
        <Grid container item xs={12} justify="center" spacing={3}>
          <Typography variant="h2" align="center">
            {githubRepo}
            {' '}
            Status:
          </Typography>
          <TabBar componentName={githubRepo} />
        </Grid>
      </Grid>
    </div>
  );
}
