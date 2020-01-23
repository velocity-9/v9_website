import React from 'react';

export default class StatTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      github_repo: this.props.github_repo,
      isLoaded: false
    };
  }

  componentDidMount() {
    this.getComponentStats();
  }

  getComponentStats() {
    fetch(`http://v9_website.ngrok.io/api/db/getComponentStatus?component=${this.state.github_repo}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({ isLoaded: true, componentStats: result.reverse() });
      }
    );
  }

  render() {
    if (!this.state.isLoaded) {
      return (<p />);
    }

    const numEntries = 5;

    return (
      <div>
        <table border="1">
          <tr>
            <th>Received Time</th>
            <th>Status</th>
            <th>Stat Window</th>
            <th>Hits</th>
            <th>Avg Response Bytes</th>
            <th>Avg ms. Latency</th>
            <th>Deployed On</th>
          </tr>
          {this.state.componentStats.slice(0, numEntries).map(entry => (
            <tr>
              <td>{entry.received_time}</td>
              <td>{entry.color}</td>
              <td>{entry.stat_window_seconds}</td>
              <td>{entry.hits}</td>
              <td>{entry.avg_response_bytes}</td>
              <td>{entry.avg_ms_latency}</td>
              <td>{entry.worker_name}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
