// @flow

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';

type AtAGlanceProps = {
  stats: Array<ComponentStatEntry>
};

export default function AtAGlance(props: AtAGlanceProps) {
  console.log(props.stats);

  return (
    <Grid container item xs={8} justify="center">
      <Grid item xs={4}>
        <Paper>Hits: </Paper>
        <Paper>Avg. ms Latency: </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>Avg. Response Bytes: </Paper>
        <Paper>Memory</Paper>
      </Grid>
    </Grid>

  );
}
