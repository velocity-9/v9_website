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

  changeButtonState() {
    if (this.state.status === 'active') {
      this.setState({ status: 'paused', isActive: false });
    } else {
      this.setState({ status: 'active', isActive: false });
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
