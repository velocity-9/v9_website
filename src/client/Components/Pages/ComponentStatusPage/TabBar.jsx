// @flow

import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';

import TabDisplay from 'client/Components/Pages/ComponentStatusPage/TabDisplay';
import { makeGetRequest } from 'client/util';

type TabTableProps = {
  componentName: string
};

type TabTableState = {
  componentLogs: Array<ComponentLogEntry>,
  componentStats: Array<ComponentStatEntry>,
  currentTab: number,
  timer: any
};

class TabBar extends React.Component<TabTableProps, TabTableState> {
  constructor(props: TabTableProps) {
    super(props);

    this.state = {
      componentLogs: [],
      componentStats: [],
      currentTab: 0,
      timer: null
    };

    (this: any).handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount(): void {
    this.update();
  }

  componentWillUnmount(): void {
    clearInterval(this.state.timer);
  }

  update() {
    const logUrl = `/api/db/getComponentLogs?component=${this.props.componentName}`;
    const statUrl = `/api/db/getComponentStats?component=${this.props.componentName}`;

    makeGetRequest(logUrl).then((result) => {
      this.setState({ componentLogs: result });
    });

    makeGetRequest(statUrl).then((result) => {
      console.log(result);
      this.setState({ componentStats: result });
    });

    const timer = setTimeout(this.update.bind(this), 10000);
    this.setState({ timer });
  }

  handleTabChange(event: Event, newValue: number) {
    console.log(newValue);
    this.setState({ currentTab: newValue });
  }

  render() {
    return (
      <Grid container item xs={10} spacing={3}>
        <Grid item xs={2} spacing={3}>
          <Tabs orientation="vertical" value={this.state.currentTab} onChange={this.handleTabChange}>
            <Tab label="At a Glance" />
            <Tab label="Logs" />
          </Tabs>
        </Grid>
        <Grid container item xs={8} spacing={3} justify="center">
          <TabDisplay
            logs={this.state.componentLogs}
            stats={this.state.componentStats}
            currentTab={this.state.currentTab}
          />
        </Grid>
      </Grid>
    );
  }
}

export default TabBar;
