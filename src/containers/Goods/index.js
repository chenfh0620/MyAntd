import React from 'react';

export default class Goods extends React.Component {
  state = {
    name: 'Goods'
  }
  render() {
    return (
      <div>{this.state.name}</div>
    );
  }
}
