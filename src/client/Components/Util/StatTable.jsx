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

  async getComponentStats() {
    try {
      const result = await fetch(`http://v9_website.ngrok.io/api/db/getComponentStatus?component=${this.state.github_repo}`);
      if (!result.ok) {
        throw new Error(result.statusText);
      }

      const json = await result.json();
      this.setState({ isLoaded: true, componentStats: json.reverse() });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return (<p>Loading...</p>);
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
          {this.state.componentStats.slice(0, numEntries)
            .map(entry => (
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
