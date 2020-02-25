// @flow

import React from 'react';

import { makeGetRequest } from 'client/util';
import ActionButton from 'client/Components/Pages/Dashboard/ActionButton';
import { Link } from 'react-router-dom';

type ComponentStatusRowProps = {
  githubUsername: string,
  githubRepo: string
};

type ComponentStatusRowState = {
  isLoaded: boolean,
  componentStatus: string
};

class ComponentStatusRow extends React.Component<ComponentStatusRowProps, ComponentStatusRowState> {
  constructor(props: ComponentStatusRowProps) {
    super(props);
    this.state = {
      isLoaded: false,
      componentStatus: ''
    };
  }

  componentDidMount(): void {
    const url = `http://v9_website.ngrok.io/api/db/getComponentDashboardInfo?component=${this.props.githubRepo}`;
    makeGetRequest(url).then((result) => {
      let deploymentString = result.isDeploying ? 'Deploying' : '';
      if (deploymentString === '') {
        console.log('setting dep string');
        deploymentString = result.deploymentIntention;
      }

      this.setState({ isLoaded: true, componentStatus: deploymentString });
    });
  }

  render() {
    if (!this.state.isLoaded) {
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
