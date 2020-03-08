// @flow

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import 'typeface-roboto';
import _ from 'underscore';

import ComponentTable from 'client/Components/Pages/Dashboard/ComponentTable';
import EnableComponentTable from 'client/Components/Pages/Dashboard/EnableComponentTable';
import NavBar from 'client/Components/Util/NavBar';
import { makeGetRequest } from 'client/util';

type DashboardPageState = {
  userComponents: Array<ComponentDashboardEntry>,
  timer: any
};

export default class DashboardPage extends React.Component<PageProps, DashboardPageState> {
  constructor(props: PageProps) {
    super(props);

    this.state = {
      userComponents: [],
      timer: null
    };
  }

  componentDidMount() {
    this.update();
  }

  componentWillUnmount(): void {
    clearTimeout(this.state.timer);
  }

  update() {
    const url = '/api/db/getUserComponents';

    makeGetRequest(url).then((result) => {
      this.setState({ userComponents: result });
    });

    const timer = setTimeout(this.update.bind(this), 1000);
    this.setState({ timer });
  }

  render() {
    const sortedComponents = _.sortBy(this.state.userComponents, 'componentName');
    const deployedComponents = _.filter(sortedComponents, (item) => item.deploymentIntention !== 'not_a_component');
    const notDeployedComponents = _.filter(sortedComponents, (item) => item.deploymentIntention === 'not_a_component');

    return (
      <div>
        <Grid container spacing={3}>
          <NavBar username={this.props.username} />
          <Grid container item xs={12} spacing={2}>
            <Grid container item xs={3} spacing={1} justify="center">
              <Typography variant="h4" align="center">Enable Components</Typography>
              <EnableComponentTable components={notDeployedComponents} />
            </Grid>
            <Grid container item xs={9} spacing={1} justify="center">
              <Typography variant="h2" align="center">Component Dashboard</Typography>
              <ComponentTable components={deployedComponents} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
