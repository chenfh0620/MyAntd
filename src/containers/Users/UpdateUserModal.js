import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  message,
  Modal,
  Form,
  Input
} from 'antd';
import {
  authError,
  fetchUsers
} from '../../actions/index';
import userService from '../../services/userService';

const FormItem = Form.Item;

@connect(
  (state) => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token
  }),
  (dispatch) => ({
    authError: (errorMessage) => dispatch(authError(errorMessage)),
    fetchUsers: (adminId, token) => dispatch(fetchUsers(adminId, token))
  })
)
@Form.create()
class UpdateUserModal extends React.Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;

      this.updateUser(values);
    })
  }

  updateUser = async (user) => {
    const {
      adminId,
      token,
      fetchUsers,
      handleSubmit,
      authError
    } = this.props;

    try {
      const res = await userService.update(
        adminId,
        token,
        user
      );
      message.success('修改成功');
      fetchUsers(adminId, token);
      handleSubmit();
    } catch(err) {
      if (err.message === undefined) {
        const errMessage = '服务器连接失败';
        authError(errMessage);
      }
      if (!err.response) {
        authError(err);
      }
      if (err.response.status) {}
    }
  }
}
