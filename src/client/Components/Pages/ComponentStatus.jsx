// @flow

import React from 'react';

import type { Match } from 'react-router-dom';

import LogTable from '../Util/LogTable';
import NavBar from '../Util/NavBar';
import StatTable from '../Util/StatTable';

type Props = {
  match: Match
};

type State = {
  componentName: ?string
}

export default class ComponentStatus extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

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
