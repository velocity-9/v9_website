// @flow

import Button from '@material-ui/core/Button';
import React from 'react';

type ActionButtonProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  componentName: string,
  status: string
};

type ActionButtonState = {
  status: string,
  isActive: boolean
};

export default class ActionButton extends React.Component<ActionButtonProps, ActionButtonState> {
  constructor(props: ActionButtonProps) {
    super(props);
    this.state = {
      status: this.props.status,
      isActive: true
    };

    (this: any).changeButtonState = this.changeButtonState.bind(this);
  }

  async changeButtonState() {
    if (this.state.status === 'active') {
      await new Promise((resolve) => this.setState({ status: 'paused', isActive: false }, resolve));
    } else {
      await new Promise((resolve) => this.setState({ status: 'active', isActive: false }, resolve));
    }

    const apiUrl = '/api/db/sendDeploymentIntention';
    const body = {
      componentName: this.props.componentName,
      deploymentIntention: this.state.status
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.log('Failed to make secure POST call');
      throw new Error('Error making POST call!');
    }
  }

  render() {
    return (
      <Button variant="contained" onClick={this.changeButtonState} disabled={!this.state.isActive}>
        {this.state.status === 'active' ? 'Pause' : 'Activate'}
      </Button>
    );
  }
}
