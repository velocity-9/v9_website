// @flow

import React from 'react';

import AtAGlance from 'client/Components/Pages/ComponentStatusPage/AtAGlance';
import Logs from 'client/Components/Pages/ComponentStatusPage/Logs';

type TabDisplayProps = {
  currentTab: number,
  logs: Array<ComponentLogEntry>,
  stats: Array<ComponentStatEntry>
};

export default function TabDisplay(props: TabDisplayProps) {
  if (props.currentTab === 0) {
    return (
      <AtAGlance stats={props.stats} />
    );
  }

  if (props.currentTab === 1) {
    return (
      <Logs logs={props.logs} />
    );
  }
}
