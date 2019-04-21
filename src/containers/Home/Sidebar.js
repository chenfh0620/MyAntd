import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Layout,
  Icon,
  Badge,
  Menu
} from 'antd';
import SidebarLogo from '../../components/SidebarLogo';

const {
  Sider
} = Layout;
const {
  Item,
  SubMenu
} = Menu;
@connect(
  (state) => ({
    adminId: state.auth.admin.adminId
  })
)
class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: '0'
    };
  }

  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    permission: PropTypes.bool.isRequired
  }

  handleClick = (e) => {
    const key = e.key;
    this.setState({
      current: key
    })
  }

  render() {
    const {
      adminId,
      collapsed
    } = this.props;

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <SidebarLogo />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          onClick={this.handleClick}
        >
          <Item key="0">
            <Link to="/dashboard">
              <Icon type="dashboard" />
              <span>dashboard</span>
            </Link>
          </Item>
          <Item key="1">
            <Link to="/users">
              <Icon type="user" />
              <span>用户信息管理</span>
            </Link>
          </Item>
          <SubMenu title={<span><Icon type="tags-o" /><span>商品分类管理</span></span>}>
            <Item key="3">
              <Link to="/category/first">
                <span>一级分类</span>
              </Link>
            </Item>
            <Item key="4">
              <Link to="/category/second">
                <span>二级分类</span>
              </Link>
            </Item>
          </SubMenu>
          <SubMenu title={<span><Icon type="profile" /><span>订单信息管理</span></span>}>
            <Item key="5">
              <Link to="/orders">
                <span>订单查询</span>
              </Link>
            </Item>
            <Item key="6">
              <Badge count={2}>
                <Link to="/order/dispatch">
                <span>订单配送&nbsp;&nbsp;</span>
                </Link>
              </Badge>
            </Item>
            <Item key="7">
              <Badge count={3}>
                <Link to="/order/refund">
                <span>退款处理&nbsp;&nbsp;</span>
                </Link>
              </Badge>
            </Item>
          </SubMenu>
          <Item key="8">
            <Link to="/advertisments">
            <Icon type="switcher" />
            <span>滑动广告管理</span>
            </Link>
          </Item>
          {
            adminId === 100 ? (
              <Item key="9">
                <Link to="/admins" >
                  <Icon type="solution" />
                  <span>管理员信息管理</span>
                </Link>
              </Item>
            ) : null
          }
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
