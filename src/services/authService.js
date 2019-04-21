import {
  postData
} from '../utils/request';
import {
  ADMIN_API
} from '../constants';

const url = `${ADMIN_API}/signin`;
const post = async (username, password) => {
  console.log(url);
  return await postData(url, {
    userName: username,
    password: password
  });
}

export default {
  post
};
