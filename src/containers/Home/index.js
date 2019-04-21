import React from 'react';
import { connect } from 'react-redux';
import {
  Route
} from 'react-router-dom';
import {
  Layout
} from 'antd';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Users from '../Users/index';
import Goods from '../Goods/index';
import {
  signout
} from '../../actions';

@connect(
  (state) => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token
  }),
  (dispatch) => ({
    signout: () => dispatch(signout())
  })
)
class Home extends React.Component {
  state = {
    collapsed: false,
    superLevel: true
  }

  handleLogout = () => {
    this.props.signout();
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const superLevel = this.state.superLevel;

    return (
      <div className="page page-home">
        <Layout>
          <Sidebar
            collapsed={this.state.collapsed}
            permission={superLevel}
          />
          <Layout>
            <Navbar
              collapsed={this.state.collapsed}
              handleClick={this.toggleCollapse}
              signout={this.handleLogout}
            />
            <Route path="/users" component={Users} />
            <Route path="/goods" component={Goods} />
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default Home;
