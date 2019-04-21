import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route,
  Redirect
} from 'react-router-dom';

@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
)
class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  handleRender = () => {
    const {
      component: ComposedComponent
    } = this.props;
    if (this.props.isAuthenticated) {
      return (
        <ComposedComponent { ...this.props } />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: '/signin',
            state: {
              from: this.props.location,
              message: '请您先登陆，谢谢！'
            }
          }}
        />
      );
    }
  }

  render() {
    const {
      component,
      ...rest
    } = this.props;

    return (
      <Route { ...rest } render={this.handleRender} />
    );
  }
}
export default PrivateRoute;
