// @flow

import React from 'react';

import type { Match } from 'react-router-dom';

import LogTable from '../Util/LogTable';
import NavBar from '../Util/NavBar';
import StatTable from '../Util/StatTable';

type ComponentStatusProps = {
  match: Match
};

type ComponentStatusState = {
  componentName: string
};

class ComponentStatus extends React.Component<ComponentStatusProps, ComponentStatusState> {
  constructor(props: ComponentStatusProps) {
    super(props);

    if (this.props.match.params.component == null) {
      throw new Error('Passed in user component name is null!');
    }

    // The github repo is passed in as a prop via the route in the parent component (App.jsx)
    this.state = {
      componentName: this.props.match.params.component
    };
  }

  render() {
    return (
      <div>
        <NavBar isAuthenticated />
        <h1>
          { this.state.componentName}
          {' '}
          Status:
        </h1>
        <LogTable github_repo={this.state.componentName} />
        <br />
        <StatTable github_repo={this.state.componentName} />
        <br />
      </div>
    );
  }
}

export default ComponentStatus;
