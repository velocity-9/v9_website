// @flow

import React from 'react';

import ComponentStatusRow from 'client/Components/Pages/Dashboard/ComponentStatusRow';
import { makeGetRequest } from 'client/util';

type ComponentTableProps = {};

type ComponentTableState = {
  isLoaded: boolean,
  userComponents: Array<ComponentId>
};

class ComponentTable extends React.Component<ComponentTableProps, ComponentTableState> {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      userComponents: []
    };
  }

  componentDidMount(): void {
    const url = '/api/db/getUserComponents';
    makeGetRequest(url).then((result) => {
      this.setState({ isLoaded: true, userComponents: result });
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <table>
        <tbody>
          {this.state.userComponents.map((item: ComponentId) => (
            <ComponentStatusRow
              githubUsername={item.github_username}
              githubRepo={item.github_repo}
            />
          ))}
        </tbody>

      </table>
    );
  }
}

export default ComponentTable;
