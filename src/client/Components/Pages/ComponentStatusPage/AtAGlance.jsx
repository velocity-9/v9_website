// @flow

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import Typography from '@material-ui/core/Typography';

type AtAGlanceProps = {
  stats: Array<ComponentStatEntry>
};

export default function AtAGlance(props: AtAGlanceProps) {
  const graphData = props.stats.reverse();



  return (
    <Grid container item xs={6} justify="center">
      <Paper>
        <Typography align="center" variant="h5">Hits in the last Hour</Typography>
        <LineChart width={600} height={300} data={graphData}>
          <Line type="monotone" dataKey="hits" stroke="#8884d8" />
          <Tooltip />
          <XAxis dataKey="received_time" />
          <YAxis />
        </LineChart>
      </Paper>
      <br/>
      <Paper>
        <Typography align="center" variant="h5">Avg. Ms Latency in the last Hour</Typography>
        <LineChart width={600} height={300} data={graphData}>
          <Line type="monotone" dataKey="avg_ms_latency" stroke="#8884d8" />
          <Tooltip />
          <XAxis dataKey="received_time" />
          <YAxis />
        </LineChart>
      </Paper>
    </Grid>
  );
}
