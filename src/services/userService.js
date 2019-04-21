import {
  ADMIN_API,
  USER_API
} from '../constants';
import {
  getData,
  postData
} from '../utils/request';

const DEFAULT = {
  userId: 1,
  userName: '',
  nickName: ''
};

const admin_url = `${ADMIN_API}/user`;
const user_url = `${USER_API}/user`;

const all = async (adminId, token) => {
  return await getData(admin_url, {
    adminId,
    token
  });
}

const get = async (adminId, token, userId) => {
  return await getData(`${admin_url}/${userId}`, {
    adminId,
    token
  });
}

const update = async (adminId, token, user) => {
  const updateDate = {};
  updateDate.userId = user.userId;
  if (user.nickName) {
    updateDate.nickName = user.nickName;
  }
  if (user.userName) {
    updateDate.password = user.password;
  }
  return await postData(`${user_url}/${user.userId}`, updateDate);
}

export default {
  update,
  all,
  get
}
