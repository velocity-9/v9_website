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
  componentStatus: ?string,
  timer: any
};

class ComponentStatusRow extends React.Component<ComponentStatusRowProps, ComponentStatusRowState> {
  constructor(props: ComponentStatusRowProps) {
    super(props);
    this.state = {
      componentStatus: null,
      timer: null
    };
  }

  componentDidMount(): void {
    this.update();
  }

  componentWillUnmount(): void {
    clearTimeout(this.state.timer);
  }

  update() {
    const url = `/api/db/getComponentDashboardInfo?component=${this.props.githubRepo}`;
    makeGetRequest(url).then((result) => {
      this.setState({
        componentStatus: result.isDeploying ? 'Deploying' : result.deploymentIntention
      });
    });

    const timer = setTimeout(this.update.bind(this), 5000);
    this.setState({ timer });
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
