// @flow

import React from 'react';
import { Link } from 'react-router-dom';

import ActionButton from 'client/Components/Pages/Dashboard/ActionButton';
import { makeGetRequest } from 'client/util';

type ComponentStatusRowProps = {
  githubUsername: string,
  githubRepo: string
};

type ComponentStatusRowState = {
  componentStatus?: string
};

class ComponentStatusRow extends React.Component<ComponentStatusRowProps, ComponentStatusRowState> {
  componentDidMount(): void {
    const url = `/api/db/getComponentDashboardInfo?component=${this.props.githubRepo}`;
    makeGetRequest(url).then((result) => {
      this.setState({
        componentStatus: result.isDeploying ? 'Deploying' : result.deploymentIntention
      });
    });
  }

  render() {
    if (this.state.componentStatus === null || this.state.componentStatus === undefined) {
      return (
        <tr>
          <td>Loading</td>
          <td>Loading</td>
          <td>Loading</td>
        </tr>
      );
    }

    return (
      <tr>
        <td><Link to={`/component/${this.props.githubUsername}/${this.props.githubRepo}`}>{ this.props.githubRepo }</Link></td>
        <td>{ this.state.componentStatus }</td>
        <td>
          <ActionButton
            componentName={this.props.githubRepo}
            status={this.state.componentStatus}
          />
        </td>
      </tr>
    );
  }
}

export default ComponentStatusRow;
