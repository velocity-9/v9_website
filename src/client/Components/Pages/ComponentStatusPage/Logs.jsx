// @flow

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import _ from 'underscore';

type LogsProps = {
  logs: Array<ComponentLogEntry>
};

export default function Logs(props: LogsProps) {
  const tableEntries = props.logs.map((entry) => {
    if (entry.log_text != null) {
      return {
        execution_num: entry.execution_num,
        log_lines: entry.log_text.split('\n'),
        log_error: entry.log_error
      };
    }
    return { execution_num: entry.execution_num, log_lines: [], log_error: entry.log_error };
  }).filter((entry) => entry.execution_num !== 0);

  const nonEmptyLogs = _.filter(tableEntries, (item) => item.log_lines.length > 0);

  return (
    <Grid item xs={8} justify="center">
      {nonEmptyLogs.map((logEntry) => (
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Logs</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {logEntry.log_lines.map((line) => (
              <Typography paragraph>{line}</Typography>
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Grid>
  );
}
