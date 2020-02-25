// @flow

import React from 'react';

import type { Match } from 'react-router-dom';

import LogTable from 'client/Components/Util/LogTable';
import NavBar from 'client/Components/Util/NavBar';
import StatTable from 'client/Components/Util/StatTable';

type ComponentStatusPageProps = PageProps & {
  match: Match
};

export default function ComponentStatusPage(props: ComponentStatusPageProps) {
  const githubRepo = props.match.params.component;
  if (githubRepo == null) {
    throw new Error('Passed in user component name is null!');
  }

  return (
    <div>
      <NavBar isAuthenticated={props.isAuthenticated} username={props.username} />
      <h1>
        { githubRepo}
        {' '}
        Status:
      </h1>
      <LogTable github_repo={githubRepo} />
      <br />
      <StatTable github_repo={githubRepo} />
      <br />
    </div>
  );
}
